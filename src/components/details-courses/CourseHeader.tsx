import { Course } from "@/types";
import Link from "next/link";
import { ArrowLeft, Star, Users, Clock, BookOpen } from "lucide-react";
import CoursePreviewCard from "./CoursePreviewCard";

interface CourseHeaderProps {
  course: Course;
  totalLessons: number;
  isEnrolled: boolean; // Added to align with CourseDetailPage
}

export default function CourseHeader({ course, totalLessons, isEnrolled }: CourseHeaderProps) {
  return (
    <header
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 text-white"
      aria-labelledby="course-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-gray-200 text-sm mb-8">
          <Link
            href="/courses"
            className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Back to all courses"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Courses
          </Link>
        </nav>

        {/* Course Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left section */}
          <div className="lg:col-span-2">
            {course.category && (
              <div className="mb-4">
                <span
                  className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase shadow-md"
                  aria-label={`Category: ${course.category}`}
                >
                  {course.category}
                </span>
              </div>
            )}
            <h1
              id="course-title"
              className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight leading-tight"
            >
              {course.title}
            </h1>
            {course.description && (
              <p className="text-lg sm:text-xl text-gray-200 mb-6 max-w-2xl">
                {course.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base">
              <div className="flex items-center gap-2" aria-label="Course rating">
                <Star className="w-5 h-5 text-yellow-400 fill-current" aria-hidden="true" />
                <span className="font-semibold">{course.rating ?? "No rating"}</span>
                <span className="text-gray-300">
                  ({course.reviews.length ? course.reviews.length.toLocaleString() : "No"} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2" aria-label="Enrolled students">
                <Users className="w-5 h-5" aria-hidden="true" />
                <span>
                  {course.students ? `${course.students.toLocaleString()} students` : "No students yet"}
                </span>
              </div>
              <div className="flex items-center gap-2" aria-label="Course duration">
                <Clock className="w-5 h-5" aria-hidden="true" />
                <span>{course.duration || "Duration not specified"}</span>
              </div>
              <div className="flex items-center gap-2" aria-label="Total lessons">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
                <span>{totalLessons} lesson{totalLessons !== 1 ? "s" : ""}</span>
              </div>
            </div>

            <div className="mt-6 text-sm sm:text-base">
              <p className="text-gray-200">
                Created by{" "}
                <span className="text-white font-semibold">
                  {course.instructor?.name ?? "Unknown Instructor"}
                </span>
              </p>
              <p className="text-gray-400">
                Last updated {course.lastUpdated ?? "Unknown"}
              </p>
            </div>

            {isEnrolled && (
              <div className="mt-4 text-sm sm:text-base">
                <p className="text-green-300 font-semibold">
                  You are enrolled in this course!
                </p>
              </div>
            )}
          </div>

          {/* Right section - Preview card */}
          <div className="lg:col-span-1">
            <CoursePreviewCard course={course} />
          </div>
        </div>
      </div>
    </header>
  );
}