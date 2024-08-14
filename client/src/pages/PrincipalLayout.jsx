import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-grow">
                <aside className="w-40 bg-gray-800 text-white flex-shrink-0">
                    <nav className="flex flex-col space-y-4 p-4">
                        <Link to="/principal" className="text-white hover:text-gray-400">Create New User Login Details</Link>
                        <Link to="/createclassroom" className="text-white hover:text-gray-400">Create New Classroom</Link>
                        <Link to="/principaladd" className="text-white hover:text-gray-400">Available Classrooms</Link>
                        {/* Add more links as needed */}
                    </nav>
                </aside>
                <main className="flex-grow p-4 bg-gray-100">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}
