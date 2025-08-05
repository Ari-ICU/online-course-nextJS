// src/components/MyLearningPage.tsx (partial update)
'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/course-list/CourseCard';
import { Course } from '@/types';
import { coursesMeta } from '@/data/course';
import { courseCurriculums } from '@/data/coursesContent';
import { useEnrollmentStore } from '@/store/enrollment';

const MyLearningPage: React.FC = () => {
  const { enrolledCourses, user } = useEnrollmentStore();

  const enrolledCoursesData: Course[] = coursesMeta
    .filter((course) => enrolledCourses.includes(course.slug))
    .map((course) => ({
      ...course,
      curriculum: courseCurriculums[course.slug] ?? [],
      reviews: [],
      relatedCourses: [],
      lastUpdated: course.lastUpdated ?? undefined,
    }));

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        .course-card-wrapper {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
        }
        .course-card-wrapper:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .container {
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        }
        .no-courses {
          background: #ffffff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .title {
          background: linear-gradient(to right, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      <Header />
      <main
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[80vh]"
        aria-label="My Learning courses"
      >
        <h1 className="title text-4xl sm:text-5xl font-extrabold mb-10 text-center tracking-tight">
          {user ? `${user.name}'s Learning Journey` : 'My Learning Journey'}
        </h1>

        {enrolledCoursesData.length === 0 ? (
          <div
            className="no-courses mx-auto max-w-md text-center fade-in-up"
            role="alert"
            style={{ animationDelay: '100ms' }}
          >
            <p className="text-lg text-gray-600 font-medium">
              You haven&apos;t enrolled in any courses yet.
            </p>
            <a
              href="/courses"
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              aria-label="Browse available courses"
            >
              Explore Courses
            </a>
          </div>
        ) : (
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            aria-live="polite"
          >
            {enrolledCoursesData.map((course, index) => (
              <div
                key={course.id}
                className="fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="course-card-wrapper rounded-xl overflow-hidden">
                  <CourseCard course={course} isEnrolled={true} />
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MyLearningPage;