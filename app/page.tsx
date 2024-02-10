'use client';

import React, { useState } from 'react';
import Popup from './components/ui/popup';
import AuthForm from './components/ui/auth-form'; // Make sure this path is correct
import './globals.css';
import HomeNavbar from './home-navbar';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const Hero: React.FC = () => {
  const { currentUser } = useAuth();
  const [showAuthPopup, setShowAuthPopup] = useState<boolean>(false);
  const [showLearnMorePopup, setShowLearnMorePopup] = useState<boolean>(false);

  const learnMoreContent = (
    <p className="text-lg md:text-xl font-bold text-gray-500 mb-6">
      S.E.S built this application as a side project to consolidate multiple
      newsletters using a ML classifier.
      <br />
      <br />
      Investors can use the integrated Open AI chatbot to track, filter, and
      interact with all deals in an efficient manner.
    </p>
  );

  return (
    <section
      className="w-full h-screen animate-gradient-x"
      style={{
        background:
          'linear-gradient(270deg, #007cf0, #00dfd8, #00A550, #007cf0, #00dfd8, #00A550)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    >
      <div>
        <HomeNavbar setShowAuthPopup={setShowAuthPopup} />
      </div>
      <div className="container mx-auto px-4 md:px-6 py-12 h-full flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 float-in">
            ai-powered investor platform
          </h1>

          <p className="text-lg md:text-xl font-extrabold text-white mb-6 float-in-delayed">
            <em>
              track, interact, and explore venture capital and private equity
              deals
            </em>
          </p>

          <div className="flex space-x-4 justify-center">
            {/* Button to open the AuthForm popup */}
            {!currentUser && (
              <Link
                href={'/login'}
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 float-in-delayed"
                // onClick={() => setShowAuthPopup(true)}
              >
                Accept Invite
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Popup Component for AuthForm */}
      {showAuthPopup && (
        <Popup
          isOpen={showAuthPopup}
          closePopup={() => setShowAuthPopup(false)}
          content={<AuthForm />}
        />
      )}

      {/* Popup Component for Learn More */}
      {showLearnMorePopup && (
        <Popup
          isOpen={showLearnMorePopup}
          closePopup={() => setShowLearnMorePopup(false)}
          content={learnMoreContent}
        />
      )}
    </section>
  );
};

export default Hero;
