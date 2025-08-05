'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Play, BookOpen, FileText } from 'lucide-react';
import { Course } from '@/types';

interface CurriculumProps {
  course: Course;
  selectedLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
}

export default function Curriculum({ course, selectedLessonId, onSelectLesson }: CurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([course.curriculum[0]?.id || '']);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const totalLessons = course.curriculum.reduce((total, module) => total + module.lessons.length, 0);

  return (
    <aside
      className="lg:sticky lg:top-24 bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6 lg:mb-0"
      aria-label="Course curriculum"
    >
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Course Curriculum</h3>
        <p className="text-sm text-gray-600 mt-1">
          {course.curriculum.length} section{course.curriculum.length !== 1 ? 's' : ''} •{' '}
          {totalLessons} lesson{totalLessons !== 1 ? 's' : ''} • {course.duration} total length
        </p>
      </div>

      {/* Curriculum List */}
      <div className="space-y-1">
        {course.curriculum.length === 0 ? (
          <p className="text-gray-500 text-sm py-2">No modules available at this time.</p>
        ) : (
          course.curriculum.map((module, index) => {
            const isExpanded = expandedModules.includes(module.id);
            return (
              <div key={module.id} className="rounded-lg overflow-hidden border border-gray-200">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-blue-100"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-700" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-700" aria-hidden="true" />
                    )}
                    <div className="ml-2 text-left">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                        Section {index + 1}: {module.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''} •{' '}
                        {module.duration}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Module Lessons (Collapsible) */}
                {isExpanded && (
                  <div className="bg-white border-t border-gray-100 animate-fadeIn">
                    {module.lessons.map((lesson) => {
                      const isSelected = selectedLessonId === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson.id)}
                          className={`relative w-full text-left px-10 py-3 flex items-center justify-between hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:bg-blue-100 ${
                            isSelected
                              ? 'bg-blue-50 border-r-4 border-r-blue-500 shadow-sm'
                              : 'border-r-4 border-r-transparent'
                          }`}
                          aria-current={isSelected ? 'step' : undefined}
                        >
                          {/* Icon & Title */}
                          <div className="flex items-center min-w-0 flex-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                                isSelected ? 'bg-blue-100' : 'bg-gray-100'
                              }`}
                            >
                              {lesson.type === 'video' ? (
                                <Play
                                  className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}
                                  aria-hidden="true"
                                />
                              ) : lesson.type === 'reading' ? (
                                <BookOpen
                                  className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}
                                  aria-hidden="true"
                                />
                              ) : (
                                <FileText
                                  className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}
                                  aria-hidden="true"
                                />
                              )}
                            </div>

                            <div className="text-left min-w-0 flex-1">
                              <p
                                className={`font-medium truncate ${
                                  isSelected ? 'text-blue-900' : 'text-gray-900'
                                }`}
                                title={lesson.title}
                              >
                                {lesson.title}
                              </p>
                              <p
                                className={`text-xs sm:text-sm capitalize truncate ${
                                  isSelected ? 'text-blue-700' : 'text-gray-500'
                                }`}
                              >
                                {lesson.type === 'video'
                                  ? 'Video'
                                  : lesson.type === 'reading'
                                  ? 'Reading'
                                  : 'Assignment'}
                              </p>
                            </div>
                          </div>

                          {/* Duration & Free Preview */}
                          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                            {lesson.freePreview && (
                              <span
                                className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full"
                                aria-label="Free preview"
                              >
                                Free
                              </span>
                            )}
                            <span
                              className={`text-xs sm:text-sm ${
                                isSelected ? 'text-blue-700' : 'text-gray-500'
                              }`}
                            >
                              {lesson.duration}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Fade-in Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            max-height: 0;
            overflow: hidden;
          }
          to {
            opacity: 1;
            max-height: 500px;
            overflow: visible;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
          overflow: hidden;
        }
      `}</style>
    </aside>
  );
}