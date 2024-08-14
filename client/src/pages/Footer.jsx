import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 border border-gray-600 ">
      <div className="container mx-auto text-center flex flex-col gap-3">
        <p className="mb-2">&copy; {new Date().getFullYear()} Classroom Management System.</p>
        <div> All rights reserved(@Jaswanth Reddy Theeyagura)</div>
        <div className="flex justify-center mt-2 space-x-4 gap-3">
          <a href="#" className="no-underline hover:text-gray-500">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
