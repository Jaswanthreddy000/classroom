import React from 'react';
import Header from './Header';
import Footer from './Footer';

function TeacherLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer className="mt-auto" />
    </div>
  );
}

export default TeacherLayout;
