'use client';

import { Course, RelatedCourse } from '@/types';
import { Clock, Download, Smartphone, Globe, Award } from 'lucide-react';
import Related from './Related';

interface CourseFeature {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  key: keyof Course | string;
  value?: (course: Course) => string | null | undefined;
}

const courseFeatures: CourseFeature[] = [
  {
    icon: Clock,
    label: 'Duration',
    key: 'duration',
    value: (course) =>
      course.duration ? `${course.duration} of on-demand video` : null,
  },
  {
    icon: Download,
    label: 'Downloadable Resources',
    key: 'downloadableResources',
    value: () => 'Downloadable resources included',
  },
  {
    icon: Smartphone,
    label: 'Mobile Access',
    key: 'mobileAccess',
    value: () => 'Learn on mobile and TV',
  },
  {
    icon: Globe,
    label: 'Lifetime Access',
    key: 'lifetimeAccess',
    value: () => 'Full lifetime access',
  },
  {
    icon: Award,
    label: 'Certificate',
    key: 'certificate',
    value: () => 'Certificate of completion',
  },
];

interface CourseSidebarProps {
  course: Course;
  isEnrolled: boolean;
}

export default function CourseSidebar({ course, isEnrolled }: CourseSidebarProps) {
  return (
    <aside
      className="space-y-6 lg:space-y-8"
      aria-label="Course sidebar with features and related courses"
    >
      {/* Course Features */}
      <section
        className="bg-white rounded-2xl shadow-lg p-5 sm:p-6"
        aria-labelledby="course-features-heading"
      >
        <h2
          id="course-features-heading"
          className="text-lg font-semibold text-gray-900 mb-4 sm:mb-5"
        >
          This course includes:
        </h2>
        <ul className="space-y-3 sm:space-y-4 text-sm text-gray-700" role="list">
          {courseFeatures.map(({ icon: Icon, label, key, value }) => {
            // Try to get custom value
            let featureText = value ? value(course) : null;

            // Fallback to course[key] if not provided
            if (!featureText) {
              const rawVal = (course as any)[key];
              if (rawVal === true) {
                featureText = label; // e.g., "Certificate" → "Certificate of completion"
              } else if (typeof rawVal === 'string' || typeof rawVal === 'number') {
                featureText = String(rawVal);
              } else {
                featureText = label; // Final fallback
              }
            }

            return (
              <li key={key as string} className="flex items-start gap-3">
                <Icon
                  className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="leading-tight">{featureText}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Related Courses */}
      {course.relatedCourses && course.relatedCourses.length > 0 ? (
        <Related relatedCourses={course.relatedCourses} />
      ) : (
        <section
          className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-500 text-sm"
          aria-label="No related courses available"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Related Courses</h2>
          <p>No related courses available at this time.</p>
        </section>
      )}
    </aside>
  );
}