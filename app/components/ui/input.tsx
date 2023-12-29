import React from 'react';

interface InputProps {
  placeholder?: string;
  type: 'text' | 'number' | 'password' | 'email'; // Add more types as needed
  // Add other props like value, onChange, etc., as needed
}

const Input: React.FC<InputProps> = ({ placeholder, type }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
      // Add additional styling or functionality as needed
    />
  );
};

export { Input };
