// src/components/course-list/CourseCard.tsx

'use client';

import { memo, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Users,
  Clock,
  BookOpen,
  Code,
  PenTool,
  Brain,
  LineChart,
  Megaphone,
  CheckCircle,
} from 'lucide-react';
import { Course } from '@/types';
import { useEnrollmentStore } from '@/store/enrollment';

// Define category icons
const categoryIcons: Record<string, React.ElementType> = {
  'Web Development': Code,
  Programming: Code,
  Design: PenTool,
  'Data Science': LineChart,
  'Machine Learning': Brain,
  Marketing: Megaphone,
  default: BookOpen,
};

// Props interface
interface CourseCardProps {
  course: Course;
  isEnrolled: boolean; // Add isEnrolled to the interface
}

// Memoized CourseCard component
const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled }) => {
  const [imgError, setImgError] = useState(false);
  const { enrolledCourses } = useEnrollmentStore();
  const isEnrolledFromStore = useMemo(() => enrolledCourses.includes(course.slug), [enrolledCourses, course.slug]);
  const Icon = useMemo(() => categoryIcons[course.category ?? 'default'] || categoryIcons.default, [course.category]);
  const slug = course.slug?.trim() || '';

  // Memoize computed values
  const discountPercentage = useMemo(() => {
    if (course.originalPrice && typeof course.price === 'number' && course.price < course.originalPrice) {
      return Math.round((1 - course.price / course.originalPrice) * 100);
    }
    return null;
  }, [course.price, course.originalPrice]);

  // Memoize formatted price
  const formattedPrice = useMemo(() => {
    return typeof course.price === 'number' ? course.price.toFixed(2) : '0.00';
  }, [course.price]);

  // Memoize formatted original price
  const formattedOriginalPrice = useMemo(() => {
    return course.originalPrice && course.originalPrice > (course.price || 0)
      ? course.originalPrice.toFixed(2)
      : null;
  }, [course.originalPrice, course.price]);

  return (
    <article
      className="rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white"
      role="article"
      aria-labelledby={`course-title-${course.id}`}
    >
      {/* Image & Badges */}
      <div className="relative aspect-video">
        {!imgError && course.image ? (
          <Image
            src={course.image}
            alt={`${course.title} – ${course.category} course cover`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <Icon className="w-16 h-16 text-gray-300" aria-hidden="true" />
          </div>
        )}

        {/* Badges */}
        {discountPercentage && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            SAVE {discountPercentage}%
          </span>
        )}

        {course.featured && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse">
            🌟 Bestseller
          </span>
        )}

        {isEnrolled && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" aria-hidden="true" />
            Enrolled
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Category & Level */}
        {(course.category || course.level) && (
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            {course.category && (
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {course.category}
              </span>
            )}
            {course.level && (
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-700">
                {course.level}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3
          id={`course-title-${course.id}`}
          className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200"
        >
          {course.title}
        </h3>

        {/* Description */}
        {course.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        )}

        {/* Instructor */}
        {course.instructor && (
          <p className="text-sm text-gray-700 font-medium mb-4">
            By {course.instructor.name}
          </p>
        )}

        {/* Stats */}
        {(course.rating || course.students || course.duration) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-4">
            {course.rating && (
              <div className="flex items-center">
                <Star
                  className="w-4 h-4 text-yellow-500 fill-current mr-1"
                  aria-hidden="true"
                />
                <span className="font-semibold text-gray-700">
                  {course.rating.toFixed(1)}
                </span>
                <span className="ml-1">
                  ({(course.reviewCount ?? 0).toLocaleString()} reviews)
                </span>
              </div>
            )}
            {course.students && (
              <div className="flex items-center">
                <Users
                  className="w-4 h-4 mr-1 text-gray-400"
                  aria-hidden="true"
                />
                <span>{course.students.toLocaleString()} students</span>
              </div>
            )}
            {course.duration && (
              <div className="flex items-center">
                <Clock
                  className="w-4 h-4 mr-1 text-gray-400"
                  aria-hidden="true"
                />
                <span>{course.duration}</span>
              </div>
            )}
          </div>
        )}

        {/* Skills */}
        {course.skills && course.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {course.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full border border-indigo-100"
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="text-xs text-gray-500">
                +{course.skills.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-gray-900">
              ${formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${formattedOriginalPrice}
              </span>
            )}
          </div>

          <Link
            href={isEnrolled ? `/courses/${slug}/learn` : `/courses/${slug}`}
            prefetch={false}
            className={`px-5 py-2.5 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 text-center text-sm ${
              isEnrolled
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500'
            }`}
            aria-label={isEnrolled ? `Continue learning ${course.title}` : `Enroll in ${course.title}`}
          >
            {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
          </Link>
        </div>
      </div>
    </article>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(CourseCard, (prevProps, nextProps) => {
  return (
    prevProps.course.id === nextProps.course.id &&
    prevProps.course.slug === nextProps.course.slug &&
    prevProps.course.price === nextProps.course.price &&
    prevProps.course.originalPrice === nextProps.course.originalPrice &&
    prevProps.course.featured === nextProps.course.featured &&
    prevProps.isEnrolled === nextProps.isEnrolled // Add isEnrolled to memo comparison
  );
});