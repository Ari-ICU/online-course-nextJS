'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FileText, CheckCircle, Lock, User, AlertTriangle, Mail } from 'lucide-react';

// Corrected animated section wrapper
const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  // Change 'threshold' to 'amount'
  const inView = useInView(ref, { once: true, amount: 0.1 }); 

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
      }}
    >
      {children}
    </motion.section>
  );
};

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-indigo-25 to-blue-50">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-medium">Last updated:</span> August 4, 2025
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mt-4"></div>
          </div>
        </AnimatedSection>

        {/* Content Sections */}
        <div className="space-y-10">
          <AnimatedSection delay={0.1}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-indigo-100">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  1
                </span>
                <FileText className="w-6 h-6 text-indigo-600 mr-2" />
                Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using <span className="font-semibold text-gray-800">CourseHub</span>, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you must not use our platform.
              </p>
              <p className="text-sm text-gray-500 mt-3 italic">
                Continued use of our services constitutes acceptance of any updates to these terms.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  2
                </span>
                <CheckCircle className="w-6 h-6 text-blue-600 mr-2" />
                Use of Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                CourseHub is provided for personal, educational, and non-commercial use only. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                <li>Use the platform for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to accounts or systems</li>
                <li>Scrape, copy, or redistribute content without permission</li>
                <li>Engage in automated data collection (e.g., bots, crawlers)</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  3
                </span>
                <User className="w-6 h-6 text-purple-600 mr-2" />
                User Accounts
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you create an account, you are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                <li>Maintaining the confidentiality of your password and login details</li>
                <li>Providing accurate and up-to-date personal information</li>
                <li>Immediately notifying us of any unauthorized account activity</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-100">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  4
                </span>
                <Lock className="w-6 h-6 text-green-600 mr-2" />
                Content Ownership
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All course materials, videos, text, graphics, and software on CourseHub are the exclusive property of CourseHub or its content providers and are protected by copyright and intellectual property laws.
              </p>
              <p className="text-gray-600 mt-3">
                You may access and use content for personal learning only. Any reproduction, distribution, public display, or commercial use without prior written permission is strictly prohibited.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-100">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-10 h-10 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  5
                </span>
                <AlertTriangle className="w-6 h-6 text-orange-600 mr-2" />
                Termination
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to suspend or terminate your access to CourseHub at any time, without notice, if we believe you have violated these Terms of Service or engaged in behavior that harms our community, platform, or reputation.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Upon termination, your right to use the service ends immediately.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  6
                </span>
                <Mail className="w-6 h-6 text-blue-600 mr-2" />
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact our support team at{' '}
                <a
                  href="mailto:support@coursehub.com"
                  className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
                >
                  support@coursehub.com
                </a>.
              </p>
              <div className="mt-5 p-4 bg-white rounded-xl shadow-sm border border-blue-200">
                <p className="text-sm text-gray-500">
                  <strong>Note:</strong> We may update these terms periodically. Changes will be posted on this page with a new "Last updated" date.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;