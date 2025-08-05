'use client';

import React from 'react';
import { GraduationCap, Laptop, Users } from 'lucide-react';

const features = [
  {
    title: 'Expert Instructors',
    description: 'Learn from industry-leading professionals with real-world experience.',
    icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
  },
  {
    title: 'Flexible Learning',
    description: 'Access courses anytime, anywhere, on desktop or mobile devices.',
    icon: <Laptop className="w-8 h-8 text-green-600" />,
  },
  {
    title: 'Community Support',
    description: 'Join a global community of learners and get help from peers and mentors.',
    icon: <Users className="w-8 h-8 text-purple-600" />,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-14">
          Why Learn With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
