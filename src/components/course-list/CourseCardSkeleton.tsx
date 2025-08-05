import React from 'react';

const CourseCardSkeleton: React.FC = () => (
  <div className="animate-pulse rounded-2xl shadow-lg overflow-hidden">
    <div className="w-full h-48 bg-gray-200" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="flex space-x-4">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="h-8 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
);

export default CourseCardSkeleton;