"use client";
import Image from "next/image";
import Agenda from '../components/Agenda';
import FinancialOverview from '../components/FinancialOverview';
import { useSession, signIn, signOut } from "next-auth/react";
import Sidebar from '../components/Sidebar';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col sm:flex-row h-screen bg-background">
        <Sidebar />
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Agenda App</h1>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()} className="bg-red-500 text-white p-2 rounded">Sign out</button>
          <Agenda />
          <div className="mt-4">
            <FinancialOverview />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col sm:flex-row h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Agenda App</h1>
        <p>Not signed in <br/></p>
        <button onClick={() => signIn("google")} className="bg-blue-500 text-white p-2 rounded">Sign in with Google</button>
      </div>
    </div>
  );
}
