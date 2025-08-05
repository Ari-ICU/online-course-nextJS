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

      <div className="flex items-start space-x-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
          <User className="w-12 h-12 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900">{course.instructor.name}</h4>
          <p className="text-gray-600 mb-4">{course.instructor.jobTitle}</p>

          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
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
              <span>1 course</span> {/* Adjust if instructor.courses is added */}
            </div>
          </div>

          <p className="text-gray-700">{course.instructor.bio}</p>
        </div>
      </div>
    </div>
  );
}