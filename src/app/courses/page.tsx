'use client';

import React from 'react';
import CourseList from '@/components/CourseList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CoursePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <CourseList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CoursePage;
