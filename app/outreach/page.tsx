"use client";

import React from 'react';
import '../globals.css';
import { ChatbotUI } from '../components/ui/chatbot';
import CompanyInfo from '../components/ui/company-info'; // Import the new CompanyInfo component
import Navbar from '../navbar'; // Adjust the path as needed

export default function App() {
  return (
    <div className="app-container">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
        <Navbar user={undefined} />
      </div>
      <main className="content-area mt-16 p-4 md:p-10 mx-auto max-w-7xl">
        <h1>Good Morning, Sami <br /></h1>
        <br />
        <div className="flex flex-col md:flex-row">
        <div className="chatbot-ui md:w-1/3 md:flex-grow md:mr-4">
            <CompanyInfo />
          </div>
          <div className="chatbot-ui md:w-2/3 md:flex-grow md:mr-4">
            <ChatbotUI />
          </div>
        </div>
      </main>
    </div>
  );
}
