"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Course } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseHeader from "@/components/details-courses/CourseHeader";
import CourseContent from "@/components/details-courses/CourseContent";
import CourseSidebar from "@/components/details-courses/CourseSidebar";
import { coursesMeta } from "@/data/course";
import { courseCurriculums } from "@/data/coursesContent";
import { enrolledCourseIds } from "@/data/enrolledCourses";

const fetchCourseData = async (slug: string): Promise<Course | null> => {
  if (!slug) return null;

  const curriculum = courseCurriculums?.[slug] ?? [];

  const courseMeta = coursesMeta.find(
    (course) => course.slug.toLowerCase() === slug.toLowerCase()
  );
  if (!courseMeta) return null;

  // Make sure courseMeta.instructor is a string before using .replace()
  const instructorName = typeof courseMeta.instructor === "string" 
    ? courseMeta.instructor 
    : "Unknown Instructor";

  return {
    ...courseMeta,
    slug,
    curriculum,
    instructor: {
      id: "1",
      name: instructorName,
      bio: `${instructorName} is a seasoned professional.`,
      avatar: courseMeta.image || "/api/placeholder/100/100",
      company: "Tech Corp",
      jobTitle: `Senior ${courseMeta.category || "Expert"}`,
      socialLinks: {
        twitter: instructorName
          ? `https://twitter.com/${instructorName.replace(/\s+/g, "")}`
          : undefined,
      },
    },
    reviews: [],
    relatedCourses: coursesMeta
      .filter((c) => c.category === courseMeta.category && c.slug !== slug)
      .slice(0, 3),
  };
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || null;

  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Invalid course slug");
      setLoading(false);
      return;
    }

    const loadCourse = async () => {
      setLoading(true);
      setError(null);
      try {
        const courseData = await fetchCourseData(slug);
        if (!courseData) {
          setError("Course not found");
          setCourse(null);
        } else {
          setCourse(courseData);
          setIsEnrolled(enrolledCourseIds.includes(slug));
        }
      } catch (err) {
        console.error("Error loading course data:", err);
        setError("Failed to load course data");
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [slug]);

  const totalLessons = useMemo(() => {
    return course?.curriculum.reduce(
      (total, module) => total + module.lessons.length,
      0
    ) ?? 0;
  }, [course]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main
          className="flex-grow flex items-center justify-center p-6"
          role="status"
          aria-live="polite"
        >
          <p className="text-gray-600 text-lg animate-pulse">Loading course...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main
          className="flex-grow flex items-center justify-center p-6"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-sm text-center">
            <p className="text-red-500 text-lg font-medium">
              ⚠️ {error || "Course not found"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <CourseHeader course={course} totalLessons={totalLessons} isEnrolled={isEnrolled} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <CourseContent course={course} />
          </div>
          <div className="lg:col-span-1 order-1 lg:order-2 lg:sticky lg:top-20 lg:self-start lg:max-h-screen lg:overflow-y-auto lg:scrollbar-hide">
            <CourseSidebar course={course} isEnrolled={isEnrolled} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
