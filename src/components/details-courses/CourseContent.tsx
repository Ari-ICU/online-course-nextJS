// components/details-courses/CourseContent.tsx
'use client'

import { useState } from 'react';
import { Course } from '@/types';
import Overview from './Overview';
import Curriculum from './Curriculum';
import Instructor from './Instructor';
import Reviews from './Reviews';

interface CourseContentProps {
  course: Course;
}

export default function CourseContent({ course }: CourseContentProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'reviews'>('overview');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const tabs = ['overview', 'curriculum', 'instructor', 'reviews'] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview course={course} />;
      case 'curriculum':
        return (
          <Curriculum
            course={course}
            selectedLessonId={selectedLessonId}
            onSelectLesson={setSelectedLessonId}
          />
        );
      case 'instructor':
        return <Instructor course={course} />;
      case 'reviews':
        return <Reviews course={course} />;
      default:
        return <Overview course={course} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <nav className="flex flex-wrap sm:flex-nowrap px-6" aria-label="Course tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              role="tab"
              aria-selected={activeTab === tab}
              tabIndex={activeTab === tab ? 0 : -1}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8">{renderContent()}</div>
    </div>
  );
}