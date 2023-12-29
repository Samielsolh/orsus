import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  // Add other props like onClick, disabled, etc., as needed
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      // Add additional styling or functionality as needed
    >
      {children}
    </button>
  );
};

export { Button };
