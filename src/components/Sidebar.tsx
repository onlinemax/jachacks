import React, { useState } from 'react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`w-64 bg-background h-screen p-4 ${isOpen ? 'block' : 'hidden'} sm:block`}>
      <button
        className="sm:hidden absolute top-4 right-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-menu"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul>
        <li className="mb-2"><Button variant="ghost">Agenda</Button></li>
        <li className="mb-2"><Button variant="ghost">Financial Overview</Button></li>
        <li className="mb-2"><Button variant="ghost">Settings</Button></li>
      </ul>
      <ThemeToggle />
    </div>
  );
};

export default Sidebar;