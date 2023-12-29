"use client"

import Link from "next/link";
import React, { useState } from 'react';
import Popup from "./components/ui/learn-popup";
import './globals.css';


// Hero component
const Hero: React.FC = () => {
  // State for controlling the popup visibility
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // Function to toggle the popup state
  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <section 
      className="w-full h-screen animate-gradient-x"
      // Dynamic styling for the animated gradient background
      style={{ 
        background: 'linear-gradient(270deg, #007cf0, #00dfd8, #00A550, #007cf0, #00dfd8, #00A550)',
        backgroundSize: '400% 400%', 
        animation: 'gradient 15s ease infinite' 
      }}
    >
      <div className="container mx-auto px-4 md:px-6 py-12 h-full flex items-center justify-center">
        <div className="text-center space-y-6">
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            ai-powered startup deal tracker
          </h1>

          {/* Subtitle/Description */}
          <p className="text-lg md:text-xl font-extrabold text-white mb-6">
            <em>track, interact, and save venture capital and private equity deals</em>
          </p>

          {/* Navigation Buttons */}
          <div className="flex space-x-4 justify-center">
            {/* Accept Invite Button */}
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              href="/rounds"
            >
              Accept Invite
            </Link>

            {/* Learn More Button */}
            <button
              className="inline-flex h-10 items-center justify-center rounded-md border border-white px-8 text-sm font-medium text-white shadow transition-colors hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={togglePopup}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Popup Component */}
      <Popup 
        isOpen={showPopup} 
        closePopup={togglePopup} 
        content={
          <p className="text-lg md:text-xl font-bold text-gray-500 mb-6">
            S.E.S built this application as a side project to consolidate multiple newsletters and then apply a ML classifier along with an Open AI integration to track, filter, and interact with all deals in an efficient manner.
          </p>
        }
      />
    </section>
  );
};

export default Hero;
