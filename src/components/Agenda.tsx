import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getGoingOutRecommendation } from '../utils/aiAssistant';
import { useSession } from 'next-auth/react';
const localizer = momentLocalizer(moment);

interface Session {
  accessToken?: string;
  user?: {
    email?: string;
    image?: string;
    name?: string;
  };
  expires: string;
}

const Agenda = () => {
  const { data: session , status } = useSession();
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>('month');

  console.log(status)
  useEffect(() => {
    console.log(session)
    const fetchEvents = async () => { 
      if ((session as Session)?.accessToken) {
        try {

          console.log("Starting the fetch")
          const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${moment(currentDate).startOf('month').toISOString()}&timeMax=${moment(currentDate).endOf('month').toISOString()}`,
            {
              headers: {
                Authorization: `Bearer ${(session as Session).accessToken}`,
              },
            }
          );

          const data = await response.json();
          if (!data.items) {
            console.error("there was no item")
            return;
          }

          console.log(data.items)
          const calendarEvents = data.items.map((event: any) => ({
            start: moment(event.start.dateTime || event.start.date).toDate(),
            end: moment(event.end.dateTime || event.end.date).toDate(),
            title: event.summary,
          }));

          setEvents(calendarEvents);
          console.log(calendarEvents);
          
        } catch (error) {
          console.log(error)
          console.error("Error fetching calendar events:", error);
        }
      }
    };

    fetchEvents()
    .then(() => console.log("It was called"))
  }, [session, currentDate]);

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const expenses = [10, 20, 30]; // Example expenses
  const income = 100; // Example income
  const ticketCost = 15;
  const foodExpenses = 20;

  const recommendation = getGoingOutRecommendation(dayOfWeek, expenses, income, ticketCost, foodExpenses);

  return (
    <div className="h-[500px]">
      <h2 className="text-2xl font-bold mb-4">Agenda</h2>
      <p className="mb-2">{recommendation}</p>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="m-2 agenda-calendar"
        onNavigate={handleNavigate}
        date={currentDate}
        view={currentView}
        onView={handleViewChange}
      />
    </div>
  );
};

export default Agenda;