'use client';

import { Check } from 'lucide-react';
import { Course } from '@/types';

interface OverviewProps {
  course: Course;
}

export default function Overview({ course }: OverviewProps) {
  const descriptionParagraphs = course.description?.split('\n\n').filter(p => p.trim()) || [];
  const learningObjectives = Array.isArray(course.learningObjectives)
    ? course.learningObjectives.filter(Boolean)
    : [];

  const skills = [course.category, ...learningObjectives.slice(0, 3)].filter(
    (skill): skill is string => Boolean(skill && typeof skill === 'string')
  );

  const requirements = course.requirements || [
    'Basic knowledge of HTML, CSS, and JavaScript',
    'Understanding of ES6+ JavaScript features',
    'A computer with internet connection',
    'Text editor (VS Code recommended)',
  ];

  if (!course) return null;

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* About This Course */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-5 sm:mb-6">About this course</h3>
        {descriptionParagraphs.length > 0 ? (
          <div className="text-gray-600 leading-relaxed space-y-4">
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No description available.</p>
        )}
      </section>

      {/* What You'll Learn */}
      {learningObjectives.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-5 sm:mb-6">What you'll learn</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {learningObjectives.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-700 leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills You'll Gain */}
      {skills.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Skills you'll gain</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium capitalize"
              >
                {skill.toLowerCase()}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Requirements */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Requirements</h3>
        {requirements.length > 0 ? (
          <ul className="space-y-3">
            {requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-3">
                <div
                  className="w-2.5 h-2.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"
                  aria-hidden="true"
                ></div>
                <span className="text-gray-700">{requirement}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No specific requirements listed.</p>
        )}
      </section>
    </div>
  );
}