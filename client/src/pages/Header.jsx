import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48">
            <rect width="39" height="31.2" x="4.5" y="8.4" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" rx="2"/>
            <rect width="31" height="23.2" x="8.5" y="12.4" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" rx="1"/>
            <path fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M29.68 33.41h6.62v2.19h-6.62zM25.84 19a2.6 2.6 0 0 0-3.68 0h0a2.61 2.61 0 1 0 4.46 1.86a2.54 2.54 0 0 0-.8-1.86ZM22 25.53h4a3 3 0 0 1 3 3v1.21h0h-10h0v-1.21a3 3 0 0 1 3-3m-4.58-4.06a2 2 0 0 0-2.84 0h0A2 2 0 1 0 18 22.91a2 2 0 0 0-.6-1.43Z"/>
            <path fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M19.34 27.14a2 2 0 0 0-1.47-.65h-3.74a2 2 0 0 0-2 2v1.25H19m14.42-8.27a2 2 0 0 0-2.84 0h0A2 2 0 1 0 34 22.91a2 2 0 0 0-.6-1.43ZM29 29.74h6.86v-1.25a2 2 0 0 0-2-2h-3.73a2 2 0 0 0-1.47.65"/>
          </svg>
          <h1 className="text-2xl font-bold">Classroom</h1>
        </div>
        <div className="ml-auto">
          <Link
            to="/"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Log Out
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
