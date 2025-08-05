'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import { Briefcase, Users, Heart } from 'lucide-react';
import Link from 'next/link';

const CareersPage: React.FC = () => {
  // Explicitly type variants as Variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' } as Transition,
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' } as Transition,
    }),
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6">
            Join the <span className="text-blue-600">CourseHub</span> Team
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Be part of a mission to make education accessible to everyone. Work with passionate
            professionals to empower learners worldwide.
          </p>
        </motion.section>

        {/* Why Work With Us */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Work With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Briefcase, title: 'Meaningful Impact', description: 'Contribute to transforming lives through accessible education.' },
              { icon: Users, title: 'Collaborative Culture', description: 'Join a diverse team of innovators and lifelong learners.' },
              { icon: Heart, title: 'Growth Opportunities', description: 'Develop your skills with continuous learning and support.' },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.02] border-t-4 border-blue-500"
              >
                <div className="bg-blue-100 p-3 w-16 h-16 flex items-center justify-center rounded-full mb-5 mx-auto">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Open Positions */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {[
              { title: 'Frontend Developer', department: 'Engineering', location: 'Remote', href: '/careers/frontend-developer' },
              { title: 'Content Creator', department: 'Education', location: 'Remote', href: '/careers/content-creator' },
              { title: 'Marketing Specialist', department: 'Marketing', location: 'New York, NY', href: '/careers/marketing-specialist' },
            ].map((job, index) => (
              <motion.div
                key={job.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.01] flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600">{job.department} • {job.location}</p>
                </div>
                <Link
                  href={job.href}
                  className="mt-4 sm:mt-0 inline-block text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium transition-colors"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-4xl font-bold mb-5">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join CourseHub and help shape the future of online learning.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Our HR Team
          </motion.a>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;