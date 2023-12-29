import React, { ReactNode } from 'react';

type PopupProps = {
    isOpen: boolean;
    closePopup: () => void;
    content: ReactNode;
};

const Popup: React.FC<PopupProps> = ({ isOpen, closePopup, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full md:w-1/3 mx-auto">
                <div className="text-center p-4">{content}</div>
                {/* Removed the top margin for the button */}
                <div className="flex justify-center"> 
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={closePopup}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
