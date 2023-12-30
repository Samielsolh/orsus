// components/ClientHero.tsx

import React, { useState } from 'react';
import Popup from "./components/ui/popup"; // Adjust the import path accordingly
import AuthForm from "./components/ui/auth-form"; // Adjust the import path accordingly

const ClientHero: React.FC = () => {
  const [showLearnMorePopup, setShowLearnMorePopup] = useState<boolean>(false);

  const learnMoreContent = (
    <p className="text-lg md:text-xl font-bold text-gray-500 mb-6">
      S.E.S built this application as a side project to consolidate multiple newsletters using a ML classifier.
      <br /><br />
      Investors can use the integrated Open AI chatbot to track, filter, and interact with all deals in an efficient manner.
    </p>
  );

  return (
    <div>
      <div className="flex space-x-4 justify-center">
        {/* Button to open the Learn More popup */}
        <button
          className="inline-flex h-10 items-center justify-center rounded-md border border-white px-8 text-sm font-medium text-white shadow transition-colors hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          onClick={() => setShowLearnMorePopup(true)}
        >
          Learn More
        </button>
      </div>

      {/* Popup Component for Learn More */}
      {showLearnMorePopup && (
        <Popup 
          isOpen={showLearnMorePopup} 
          closePopup={() => setShowLearnMorePopup(false)} 
          content={learnMoreContent}
        />
      )}
    </div>
  );
};

export default ClientHero;
