'use client';

import React, { useEffect, useState } from 'react';
import '../globals.css';
import { ChatbotUI } from '../components/ui/chatbot';
import CompanyInfo from '../components/ui/company-info'; // Import the new CompanyInfo component
import Navbar from '../navbar'; // Adjust the path as needed
import { useAuth } from '@/contexts/AuthContext';
import { Chip } from '@nextui-org/react';

interface Company {
  startup_name: any;
  _id: any;
}

const hashString = (str: any) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export default function App() {
  const { selectedRaise, companies } = useAuth();
  const c = companies.filter((item: any) => item._id === selectedRaise)[0];
  const getChipStyles = (category: any) => {
    const hue = Math.abs(hashString(category) % 360); // Generate a hue value for the shade of blue
    const baseStyle = `bg-blue-${hue} text-white`; // Adjust the text color as needed
    const contentStyle = 'drop-shadow shadow-black';
    ('drop-shadow shadow-black text-white');
    return {
      base: 'bg-blue border-small border-blue/50 shadow-blue-500/30',
      content: contentStyle,
    };
  };
  return (
    <div className="app-container">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
        <Navbar user={undefined} />
      </div>
      <main className="content-area mt-16 p-4 md:p-10 mx-auto max-w-7xl">
        <h1>
          Good Morning, Sami <br />
        </h1>
        <br />
        <div className="flex flex-col md:flex-row">
          <div className="chatbot-ui md:w-1/3 md:flex-grow md:mr-4">
            <CompanyInfo />
            {selectedRaise && (
              <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
                <div>
                  <p>
                    <span className="text-slate-400 mr-2">startup_name:</span>
                    {c.startup_name}
                  </p>
                  <p>
                    <span className="text-slate-400 mr-2">
                      company_description:
                    </span>
                    {c.company_description}
                  </p>
                  <p>
                    <span className="text-slate-400 mr-2">raise:</span>
                    <Chip
                      classNames={{
                        base: 'bg-green border-small border-green/50 shadow-green-500/30',
                        content: 'drop-shadow shadow-black',
                      }}
                      size="sm"
                      variant="shadow"
                    >
                      {c.company_description}
                    </Chip>
                  </p>
                  <p>
                    <span className="text-slate-400 mr-2">region:</span>
                    {c.region}
                  </p>
                  <p>
                    <span className="text-slate-400 mr-2">raised_digits:</span>
                    {c.raised_digits}
                  </p>
                  <p>
                    <span className="text-slate-400 mr-2">raise_date:</span>
                    {c.raise_date}
                  </p>
                  <p>
                    <span className="text-slate-400 mr-2">
                      Predicted_Categories:
                    </span>
                    {c.Predicted_Categories.map((category: any) => (
                      <Chip
                        key={category}
                        classNames={getChipStyles(category)}
                        size="sm"
                        variant="shadow"
                      >
                        {category}
                      </Chip>
                    ))}
                  </p>
                  <p>
                    <span className="text-slate-400 mr-2">date:</span>
                    {c.date}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="chatbot-ui md:w-2/3 md:flex-grow md:mr-4">
            <ChatbotUI />
          </div>
        </div>
      </main>
    </div>
  );
}
