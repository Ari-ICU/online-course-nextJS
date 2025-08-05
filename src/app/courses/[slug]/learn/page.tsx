'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Curriculum from '@/components/details-courses/Curriculum';
import { coursesMeta } from '@/data/course';
import { courseCurriculums } from '@/data/coursesContent';
import { enrolledCourseIds } from '@/data/enrolledCourses';
import { Module, Lesson } from '@/types';
import { Star, Clock, Bot } from 'lucide-react';

// Define the type for AI-generated timestamps
interface AITimestamp {
  time: string;
  label: string;
  confidence: number;
}

// Define the type guard function
const isAITimestamp = (ts: any): ts is AITimestamp => {
  return typeof ts === 'object' && ts !== null && 'confidence' in ts && typeof ts.confidence === 'number';
};

const CourseLearnPage = () => {
  const router = useRouter();
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [lessonTimestamps, setLessonTimestamps] = useState<Record<string, string>>({});
  const [showAITimestamps, setShowAITimestamps] = useState(false);
  const [dynamicTimestamps, setDynamicTimestamps] = useState<{
    manual: { time: string; label: string }[];
    aiGenerated: { time: string; label: string; confidence: number }[];
  } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate dynamic fetching of timestamps
  const fetchTimestamps = useCallback(async (lessonId: string, videoUrl: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Mock API delay
    return {
      manual: [
        { time: '0:00', label: `Introduction to ${lessonId}` },
        { time: '1:36', label: 'Key Concepts' },
        { time: '5:08', label: 'Core Topic Overview' },
        { time: '9:19', label: 'Industry Insights' },
        { time: '12:55', label: 'Practical Applications' },
        { time: '23:06', label: 'Career Opportunities' },
        { time: '36:35', label: 'Advanced Topics' },
      ],
      aiGenerated: [
        { time: '0:00', label: `AI: Intro to ${lessonId}`, confidence: 0.95 },
        { time: '2:15', label: 'AI: Instructor Bio', confidence: 0.88 },
        { time: '6:30', label: 'AI: Topic Deep Dive', confidence: 0.92 },
        { time: '10:45', label: 'AI: Trends Analysis', confidence: 0.90 },
        { time: '15:20', label: 'AI: Getting Started', confidence: 0.87 },
        { time: '25:00', label: 'AI: Job Prospects', confidence: 0.93 },
        { time: '40:10', label: 'AI: Certification Guide', confidence: 0.89 },
      ],
    };
  }, []);

  // Find course metadata and curriculum
  const courseMeta = useMemo(
    () => coursesMeta.find((course) => course.slug === slug),
    [slug]
  );

  const curriculum: Module[] = useMemo(
    () => (slug ? courseCurriculums[slug] ?? [] : []),
    [slug]
  );

  // Enhanced curriculum with dynamic timestamps
  const enhancedCurriculum = useMemo(
    () =>
      curriculum.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) => ({
          ...lesson,
          lastAccessed: lessonTimestamps[lesson.id] || null,
          timestamps: lesson.type === 'video' && dynamicTimestamps ? dynamicTimestamps.manual : undefined,
          aiGeneratedTimestamps: lesson.type === 'video' && dynamicTimestamps ? dynamicTimestamps.aiGenerated : undefined,
        })),
      })),
    [curriculum, lessonTimestamps, dynamicTimestamps]
  );

  // Check enrollment, set initial lesson, and fetch timestamps
  useEffect(() => {
    if (!slug) return;

    if (!enrolledCourseIds.includes(slug)) {
      router.push(`/courses/${slug}`);
      return;
    }

    setIsEnrolled(true);

    const firstLessonId = curriculum?.[0]?.lessons?.[0]?.id;
    if (firstLessonId && !selectedLessonId) {
      setSelectedLessonId(firstLessonId);
      setLessonTimestamps((prev) => ({
        ...prev,
        [firstLessonId]: new Date().toISOString(),
      }));
    }

    if (selectedLessonId) {
      const lesson = curriculum.flatMap((mod) => mod.lessons).find((l) => l.id === selectedLessonId);
      if (lesson?.type === 'video') {
        fetchTimestamps(selectedLessonId, lesson.content || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
          .then((data) => setDynamicTimestamps(data))
          .catch((error) => console.error('Error fetching timestamps:', error));
      }
    }

    setLoading(false);
  }, [slug, router, curriculum, selectedLessonId, fetchTimestamps]);

  const allLessons = useMemo(
    () => enhancedCurriculum.flatMap((mod) => mod.lessons),
    [enhancedCurriculum]
  );

  const selectedLesson = useMemo(
    () => allLessons.find((lesson) => lesson.id === selectedLessonId) || null,
    [allLessons, selectedLessonId]
  );

  const handleLessonSelection = useCallback((lessonId: string) => {
    setSelectedLessonId(lessonId);
    setLessonTimestamps((prev) => ({
      ...prev,
      [lessonId]: new Date().toISOString(),
    }));
    const lesson = allLessons.find((l) => l.id === lessonId);
    if (lesson?.type === 'video') {
      fetchTimestamps(lessonId, lesson.content || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
        .then((data) => setDynamicTimestamps(data))
        .catch((error) => console.error('Error fetching timestamps:', error));
    } else {
      setDynamicTimestamps(null);
    }
  }, [allLessons, fetchTimestamps]);

  const handleRating = useCallback((rating: number) => {
    setUserRating(rating);
  }, []);

  const handleTimestampClick = useCallback((time: string) => {
    if (videoRef.current) {
      const parts = time.split(':').map(Number);
      let totalSeconds = 0;
      if (parts.length === 3) {
        totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
      } else if (parts.length === 2) {
        totalSeconds = parts[0] * 60 + parts[1];
      }
      videoRef.current.currentTime = totalSeconds;
      videoRef.current.play();
    }
  }, []);

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return 'Not accessed';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
          <div className="flex flex-col lg:flex-row gap-8">
            <section className="flex-1">
              <div className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="aspect-[16/9] bg-gray-100 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <aside className="lg:w-80 flex-shrink-0">
              <div className="animate-pulse space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <div className="h-5 bg-gray-200 rounded w-4/5 mb-2"></div>
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="h-4 bg-gray-100 rounded w-full"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isEnrolled) return null;

  if (!courseMeta) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto p-6 min-h-[80vh] flex flex-col items-center justify-center text-center bg-gradient-to-b from-red-50 to-white">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The requested course does not exist or is unavailable.</p>
          <a
            href="/courses"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            aria-label="Browse available courses"
          >
            Explore Courses
          </a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="flex-1 animate-fade-up">
            <header className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                {courseMeta.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" aria-hidden="true" />
                  <p className="text-base sm:text-lg text-gray-600">
                    Total Duration: <span className="font-medium">{courseMeta.duration}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2" aria-label="Rate this course">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 cursor-pointer transition-transform duration-200 hover:scale-110 ${
                        (hoverRating ?? userRating ?? 0) >= star
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    />
                  ))}
                  {userRating && (
                    <span className="text-sm text-gray-600 ml-2">
                      Your rating: {userRating}/5
                    </span>
                  )}
                </div>
              </div>
            </header>

            {selectedLesson ? (
              <article
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 animate-fade-up"
                aria-labelledby={`lesson-title-${selectedLesson.id}`}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                    <h2
                      id={`lesson-title-${selectedLesson.id}`}
                      className="text-xl sm:text-2xl font-semibold text-gray-800"
                    >
                      {selectedLesson.title}
                    </h2>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {selectedLesson.duration}
                      </span>
                      {selectedLesson.lastAccessed && (
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          Last accessed: {formatTimestamp(selectedLesson.lastAccessed)}
                        </span>
                      )}
                    </div>
                  </div>

                  {selectedLesson.type === 'video' && (selectedLesson.content || dynamicTimestamps) ? (
                    <>
                      <div className="aspect-[16/9] bg-black rounded-lg overflow-hidden mb-6">
                        <video
                          ref={videoRef}
                          controls
                          preload="metadata"
                          className="w-full h-full object-cover"
                          src={selectedLesson.content || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                          aria-label={`Video: ${selectedLesson.title}`}
                        />
                      </div>
                      {(selectedLesson.timestamps || selectedLesson.aiGeneratedTimestamps) && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {showAITimestamps ? 'AI-Generated Chapters' : 'Video Chapters'}
                            </h3>
                            {(selectedLesson.timestamps && selectedLesson.aiGeneratedTimestamps) && (
                              <button
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-200 flex items-center gap-2"
                                onClick={() => setShowAITimestamps(!showAITimestamps)}
                                aria-label={`Switch to ${showAITimestamps ? 'manual' : 'AI-generated'} timestamps`}
                              >
                                <Bot className="w-4 h-4" aria-hidden="true" />
                                {showAITimestamps ? 'Show Manual Chapters' : 'Show AI Chapters'}
                              </button>
                            )}
                          </div>
                          <ul className="space-y-2" aria-label="Video timestamps">
                            {(showAITimestamps ? selectedLesson.aiGeneratedTimestamps : selectedLesson.timestamps)?.map((ts, index) => (
                              <li
                                key={index}
                                className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 cursor-pointer hover:bg-slate-100 hover:translate-x-1 ${
                                  showAITimestamps ? 'bg-sky-50 border border-sky-200 hover:bg-sky-100' : ''
                                }`}
                                onClick={() => handleTimestampClick(ts.time)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    handleTimestampClick(ts.time);
                                  }
                                }}
                                aria-label={`Jump to ${ts.time} - ${ts.label}${showAITimestamps && isAITimestamp(ts) ? ` (Confidence: ${(ts.confidence * 100).toFixed(1)}%)` : ''}`}
                              >
                                <Clock className="w-4 h-4 text-gray-500" aria-hidden="true" />
                                <span className="text-sm text-gray-700">
                                  <span className="font-medium">{ts.time}</span> {ts.label}
                                  {showAITimestamps && isAITimestamp(ts) && (
                                    <span className="text-xs text-blue-600 ml-2">
                                      (Confidence: {(ts.confidence * 100).toFixed(1)}%)
                                    </span>
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : null}

                  {selectedLesson.type === 'reading' && selectedLesson.content ? (
                    <div
                      className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed"
                      aria-label="Reading content"
                    >
                      <p>{selectedLesson.content}</p>
                    </div>
                  ) : null}

                  {selectedLesson.type === 'quiz' && (
                    <div
                      className="py-8 text-center text-gray-500 bg-gray-50 rounded-lg"
                      aria-label="Quiz content placeholder"
                    >
                      <p className="italic">Quiz content is not available yet.</p>
                    </div>
                  )}
                </div>
              </article>
            ) : (
              <div
                className="text-center py-16 text-gray-500 animate-fade-up"
                aria-label="No lesson selected"
              >
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-xl font-medium">Select a lesson to begin learning.</p>
              </div>
            )}
          </section>

          <aside
            className="lg:w-80 flex-shrink-0 lg:sticky lg:top-24 lg:self-start animate-fade-up"
            style={{ maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}
          >
            <Curriculum
              course={{ ...courseMeta, curriculum: enhancedCurriculum }}
              selectedLessonId={selectedLessonId}
              onSelectLesson={handleLessonSelection}
            />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CourseLearnPage;