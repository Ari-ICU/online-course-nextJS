'use client';

import { Star, Users, BookOpen, User } from 'lucide-react';
import { Course } from '@/types';

interface InstructorProps {
  course: Course;
}

export default function Instructor({ course }: InstructorProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Meet your instructor</h3>

      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 space-y-4 sm:space-y-0">
        {/* Avatar */}
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
          <User className="w-12 h-12 text-blue-600" />
        </div>

        {/* Instructor Details */}
        <div className="flex-1 text-center sm:text-left">
          <h4 className="text-xl font-bold text-gray-900">{course.instructor.name}</h4>
          <p className="text-gray-600 mb-4">{course.instructor.jobTitle}</p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span>{course.rating} instructor rating</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>1 course</span> {/* Change if instructor.courses is added */}
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-700">{course.instructor.bio}</p>
        </div>
      </div>
    </div>
  );
}
