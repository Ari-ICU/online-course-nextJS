'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, Variants } from 'framer-motion'; // Import Variants
import { Newspaper } from 'lucide-react';
import Link from 'next/link';

const PressPage: React.FC = () => {
  // Explicitly type sectionVariants as Variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }, // Added 'as const'
  };

  const itemVariants: Variants = { // Explicitly type itemVariants as Variants
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: i * 0.2, ease: 'easeOut' as const }, // Added 'as const'
    }),
  };

  const pressReleases = [
    {
      title: 'CourseHub Launches New AI-Powered Learning Platform',
      date: 'June 15, 2025',
      source: 'TechCrunch',
      href: '/press/ai-platform-launch',
    },
    {
      title: 'CourseHub Partners with Top Universities for Certification Programs',
      date: 'May 10, 2025',
      source: 'Forbes',
      href: '/press/university-partnerships',
    },
    {
      title: 'CourseHub Named Top EdTech Startup of 2025',
      date: 'April 5, 2025',
      source: 'EdSurge',
      href: '/press/edtech-startup',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Press & Media</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the latest news and media coverage about CourseHub’s mission to revolutionize
            online education.
          </p>
        </motion.section>

        <motion.section variants={sectionVariants} initial="hidden" animate="visible">
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <Newspaper className="w-6 h-6 text-blue-600 mr-2" />
                  <p className="text-sm text-gray-500">{release.date} • {release.source}</p>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{release.title}</h3>
                <Link
                  href={release.href}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read Full Article
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            For press kits, interviews, or media inquiries, please contact our team.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default PressPage;