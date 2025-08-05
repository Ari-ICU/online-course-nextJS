'use client';

import { Star } from 'lucide-react';
import { Course } from '@/types';

interface ReviewsProps {
  course: Course;
}

export default function Reviews({ course }: ReviewsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Student reviews</h3>
        <div className="flex items-center space-x-4 mb-6">
          <div className="text-4xl font-bold text-gray-900">{course.rating}</div>
          <div>
            <div className="flex items-center mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(course.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">{course.reviews.length.toLocaleString()} reviews</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {course.reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {review.studentName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{review.studentName}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}