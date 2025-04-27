"use client";
import Agenda from '../components/Agenda';
import FinancialOverview from '../components/FinancialOverview';
import { auth0 } from '@/lib/auth0';
import Sidebar from '../components/Sidebar';

export default async function Home() {
  const session = await auth0.getSession();
  if (session) {
    return (
      <div className="flex flex-col sm:flex-row h-screen">
        <div className="w-64 bg-muted"> {/* Added wrapper div for sidebar with background */}
          <Sidebar />
        </div>
        <div className="flex-1 p-4 bg-background"> {/* Added bg-background to main content */}
          <h1 className="text-2xl font-bold mb-4">Agenda App</h1>
          <p>Signed in as {session.user?.email}</p>
          <Agenda />
          <div className="mt-4">
            <FinancialOverview />
          </div>
        </div>
      </div>
    );
  }
  return (
    <main>
      <a href="/auth/login?screen_hint=signup">Sign up</a>
      <a href="/auth/login">Log in</a>
    </main>
  );
}
