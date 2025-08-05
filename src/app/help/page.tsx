'use client'


import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, Variants } from 'framer-motion'; // Import Variants
import { HelpCircle, Search } from 'lucide-react';
import Link from 'next/link';

const HelpCenterPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Explicitly type sectionVariants as Variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: 'easeOut' as const // Use 'as const' here
      } 
    },
  };

  const faqVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: i * 0.2, ease: 'easeOut' as const }, // Also apply here
    }),
  };

  const faqs = [
    {
      question: 'How do I enroll in a course?',
      answer: 'To enroll, browse our course catalog, select a course, and click "Enroll Now." You’ll need to sign in or create an account to complete the process.',
    },
    {
      question: 'Can I access courses on mobile devices?',
      answer: 'Yes, CourseHub is fully responsive and available on iOS and Android apps, as well as mobile browsers.',
    },
    {
      question: 'What is the refund policy?',
      answer: 'We offer a 30-day money-back guarantee for most courses. Check the course details for specific refund terms.',
    },
    {
      question: 'How do I contact an instructor?',
      answer: 'You can message instructors directly through the course dashboard or contact support for assistance.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find answers to your questions or contact our support team for assistance.
          </p>
        </motion.section>

        <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="mb-16">
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Search FAQs"
              />
            </div>
          </div>
          <div className="space-y-6">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  custom={index}
                  variants={faqVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No FAQs found. Try a different search term.</p>
              </div>
            )}
          </div>
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            Our support team is here to assist you with any questions or issues.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.a>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenterPage;