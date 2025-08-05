"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
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
  const router = useRouter();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Immediately redirect to 404 if slug is missing
  useEffect(() => {
    if (!slug || slug.trim() === "") {
      router.replace("/404"); // Redirect to 404 page
    }
  }, [slug, router]);

  useEffect(() => {
    const loadCourse = async () => {
      if (!slug || slug.trim() === "") return;
      setLoading(true);
      const courseData = await fetchCourseData(slug);
      if (!courseData) {
        router.replace("/404");
        return;
      }
      setCourse(courseData);
      setIsEnrolled(enrolledCourseIds.includes(slug));
      setLoading(false);
    };

    loadCourse();
  }, [slug, router]);

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

  if (!course) return null; // Prevent rendering if no course found

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
