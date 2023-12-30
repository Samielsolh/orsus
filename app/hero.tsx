// pages/hero.tsx

import React, { useState } from 'react';
import Popup from "./components/ui/popup";
import AuthForm from "./components/ui/auth-form"; // Make sure this path is correct
import './globals.css';

const HeroSSR: React.FC = () => {
  const learnMoreContent = (
    <p className="text-lg md:text-xl font-bold text-gray-500 mb-6">
      S.E.S built this application as a side project to consolidate multiple newsletters using a ML classifier.
      <br /><br />
      Investors can use the integrated Open AI chatbot to track, filter, and interact with all deals in an efficient manner.
    </p>
  );

  return (
    <section 
      className="w-full h-screen animate-gradient-x"
      style={{ 
        background: 'linear-gradient(270deg, #007cf0, #00dfd8, #00A550, #007cf0, #00dfd8, #00A550)',
        backgroundSize: '400% 400%', 
        animation: 'gradient 15s ease infinite' 
      }}
    >
      <div className="container mx-auto px-4 md:px-6 py-12 h-full flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            ai-powered startup deal tracker
          </h1>

          <p className="text-lg md:text-xl font-extrabold text-white mb-6">
            <em>track, interact, and save venture capital and private equity deals</em>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSSR;
