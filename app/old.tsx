import React from 'react';
import Link from 'next/link';
import './globals.css';

const Hero: React.FC = () => {
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
          <div className="flex space-x-4 justify-center">
            <Link href="/login">
              <button
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Accept Invite
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
