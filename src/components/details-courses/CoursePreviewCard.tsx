'use client';

import { Course } from "@/types";
import { Play, Heart, Share2, Check, Smartphone, Award, Download, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEnrollmentStore } from "@/store/enrollment";

interface CoursePreviewCardProps {
  course: Course;
}

export default function CoursePreviewCard({ course }: CoursePreviewCardProps) {
  const router = useRouter();
  const { getEnrolledCourses } = useEnrollmentStore(); // Use getter
  const enrolledCourses = getEnrolledCourses();
  const isEnrolled = enrolledCourses.includes(course.id); // Check enrollment

  const handleEnrollClick = () => {
    if (!isEnrolled) {
      router.push(`/enroll/${course.slug}`);
    } else {
      router.push(`/courses/${course.slug}/learn`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-8 transition-all duration-300 hover:shadow-xl">
      {/* Video Preview */}
      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-200 via-indigo-200 to-indigo-300 flex items-center justify-center">
        <button
          className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 focus:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Play course preview"
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 ml-1" />
        </button>
        <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
          Preview
        </div>
        {isEnrolled && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" aria-hidden="true" />
            Enrolled
          </div>
        )}
      </div>

      <div className="p-5 sm:p-8">
        {/* Price Section */}
        <div className="text-center mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              ${course.price.toFixed(2)}
            </span>
            {course.originalPrice && (
              <span className="text-lg sm:text-xl text-gray-500 line-through">
                ${course.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {course.originalPrice && (
            <div className="text-red-500 font-semibold text-sm">
              {Math.round((1 - course.price / course.originalPrice) * 100)}% off
            </div>
          )}
        </div>

        {/* Enroll Button */}
        <button
          onClick={handleEnrollClick}
          className={`w-full bg-gradient-to-r ${isEnrolled ? 'from-green-600 to-green-700' : 'from-blue-600 to-indigo-600'} text-white py-3 sm:py-4 rounded-xl font-bold text-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4 ${
            isEnrolled
              ? 'hover:from-green-700 hover:to-green-800 focus:from-green-700 focus:to-green-800 hover:scale-105 focus:scale-105'
              : 'hover:from-blue-700 hover:to-indigo-700 focus:from-blue-700 focus:to-indigo-700 hover:scale-105 focus:scale-105'
          }`}
          aria-label={isEnrolled ? "Start learning the course" : "Enroll in the course"}
        >
          {isEnrolled ? "Start Learning" : "Enroll Now"}
        </button>

        {/* Wishlist + Share */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100 transition-colors flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Add course to wishlist"
          >
            <Heart className="w-4 h-4 mr-2" />
            Wishlist
          </button>
          <button
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100 transition-colors flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Share this course"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>

        {/* Guarantee */}
        <div className="text-center text-sm text-gray-600 mb-4 font-medium">
          30-Day Money-Back Guarantee
        </div>

        {/* Features List */}
        <div className="space-y-3 text-sm">
          {[
            { icon: <Check className="w-4 h-4 text-green-500 mr-3" />, text: "Lifetime access" },
            { icon: <Smartphone className="w-4 h-4 text-green-500 mr-3" />, text: "Access on mobile and TV" },
            { icon: <Award className="w-4 h-4 text-green-500 mr-3" />, text: "Award of completion" },
            { icon: <Download className="w-4 h-4 text-green-500 mr-3" />, text: "Downloadable resources" }
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              {item.icon}
              <span className="text-black">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
