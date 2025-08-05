'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const BlogPage: React.FC = () => {
  // Explicitly type variants as Variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' } as Transition,
    },
  };

  const postVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: i * 0.2, ease: 'easeOut' } as Transition,
    }),
  };

  const posts = [
    {
      title: 'Top 5 Tips for Effective Online Learning',
      excerpt: 'Discover strategies to maximize your learning experience with CourseHub.',
      date: 'July 20, 2025',
      href: '/blog/tips-for-online-learning',
      image: '/images/blog/online-learning.jpg',
    },
    {
      title: 'Why Data Science is the Future',
      excerpt: 'Explore the growing demand for data science skills and how to get started.',
      date: 'July 10, 2025',
      href: '/blog/data-science-future',
      image: '/images/blog/data-science.jpg',
    },
    {
      title: 'Mastering React: A Beginner’s Guide',
      excerpt: 'Learn the basics of React with our step-by-step guide for beginners.',
      date: 'June 25, 2025',
      href: '/blog/mastering-react',
      image: '/images/blog/react-guide.jpg',
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
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">CourseHub Blog</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Stay updated with tips, trends, and insights on online learning and career growth.
          </p>
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.title}
                custom={index}
                variants={postVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                  loading="lazy"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link
                    href={post.href}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;