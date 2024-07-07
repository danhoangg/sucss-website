import React from 'react';

function NotFound() {
    return (
        <div className="flex items-start justify-center min-h-screen text-center text-white bg-black pt-96">
            <div className="flex items-center">
                <h1 className="mr-6 text-3xl font-bold">404</h1>
                <div className="h-12 mr-6 border-l border-gray-500"></div>
                <p className="text-lg">This page could not be found.</p>
            </div>
        </div>
    );
}

export default NotFound;    