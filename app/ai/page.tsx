import React from 'react';
import '../globals.css';
import { Nav } from '../nav';
import { ChatbotUI } from '../components/ui/chatbot'; // Import the new chatbot UI component

export default function AI() {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
        <Nav />
      </div>
      <main className="mt-16 p-4 md:p-10 mx-auto max-w-7xl">
        <h1>Good Morning, Sami</h1> 
        <br />
        <ChatbotUI />
      </main>
    </div>
  );
}
