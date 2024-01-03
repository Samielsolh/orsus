import React from 'react';

const ChatbotUI = () => {
    return (
      <div className="flex flex-col h-96 bg-white shadow rounded-lg overflow-hidden">
        <div className="flex-1 overflow-auto p-4">
          {/* Chat messages will be displayed here */}
        </div>
        <div className="border-t p-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full rounded-md border px-4 py-2 text-sm"
          />
        </div>
      </div>
    );
  }

  export { ChatbotUI };
  