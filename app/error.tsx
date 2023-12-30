"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

type ErrorProps = {
    error: Error;
};

const ErrorPage: React.FC<ErrorProps> = ({ error }) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    const handleReset = () => {
        const router = useRouter(); // Initialize useRouter within the function
        router.push('/'); // Navigate to the root page
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-500 to-orange-500 text-white">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <button
                className="bg-white text-red-500 px-6 py-2 rounded shadow hover:bg-orange-500 hover:text-white transition-colors"
                onClick={handleReset}
            >
                Back Home
            </button>
        </div>
    );
};

export default ErrorPage;
