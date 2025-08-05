'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { RelatedCourse } from '@/types';

interface RelatedProps {
  relatedCourses: RelatedCourse[];
}

export default function Related({ relatedCourses }: RelatedProps) {
  if (!relatedCourses || relatedCourses.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Related courses</h3>
      <div className="space-y-4">
        {relatedCourses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="block border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
          >
            <h4 className="font-medium text-gray-900 mb-1">{course.title}</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm text-gray-600">
                  {course.rating !== undefined ? course.rating.toFixed(1) : 'N/A'}
                </span>
              </div>
              <span className="font-bold text-gray-900">
                ${course.price !== undefined ? course.price.toFixed(2) : '0.00'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
