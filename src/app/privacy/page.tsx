'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useAnimation, useInView } from 'framer-motion';

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

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-25 to-white">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-medium">Last updated:</span> August 4, 2025
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
          </div>
        </AnimatedSection>

        {/* Content Sections */}
        <div className="space-y-12">
          <AnimatedSection delay={0.1}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  1
                </span>
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At <span className="font-semibold text-gray-800">CourseHub</span>, we value your privacy
                and are committed to protecting your personal information. This Privacy Policy explains
                how we collect, use, and safeguard your data when you use our platform. Your trust is
                important to us, and we are dedicated to transparency and security in every interaction.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  2
                </span>
                Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect two types of information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                <li>
                  <strong>Provided Information:</strong> Name, email address, payment details, profile
                  preferences.
                </li>
                <li>
                  <strong>Usage Data:</strong> Course progress, quiz results, login activity, device
                  information, and browsing behavior.
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-4 italic">
                We never collect sensitive data (e.g., biometrics, health info) unless explicitly
                required and consented.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  3
                </span>
                How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your data helps us:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                <li>Deliver and personalize your learning experience.</li>
                <li>Process enrollments and payments securely.</li>
                <li>Improve course content and platform performance.</li>
                <li>Send updates, recommendations, and support communications.</li>
                <li>Analyze usage trends with anonymized data.</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  4
                </span>
                Data Sharing & Security
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We <strong>do not sell or rent</strong> your personal information. We may share data with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                <li>
                  <strong>Service Providers:</strong> Payment processors (e.g., Stripe), analytics tools
                  (e.g., Google Analytics), and email platforms under strict data protection agreements.
                </li>
                <li>
                  <strong>Legal Compliance:</strong> When required by law or to protect our rights and
                  users.
                </li>
              </ul>
              <p className="text-gray-600 mt-4">
                All data is encrypted in transit and at rest. We follow industry-standard security
                practices to protect your information.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  5
                </span>
                Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2 mt-3">
                <li>Access the personal data we hold about you.</li>
                <li>Correct inaccurate or incomplete information.</li>
                <li>Request deletion of your data (subject to legal obligations).</li>
                <li>Opt out of marketing communications.</li>
                <li>Request a copy of your data in a portable format.</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at{' '}
                <a
                  href="mailto:support@coursehub.com"
                  className="text-blue-600 hover:text-blue-700 font-medium underline transition-colors"
                >
                  support@coursehub.com
                </a>.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  6
                </span>
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions or concerns about this Privacy Policy, or wish to report a
                privacy issue, please reach out to our Data Protection Officer at{' '}
                <a
                  href="mailto:support@coursehub.com"
                  className="text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  support@coursehub.com
                </a>.
                We aim to respond within 48 hours.
              </p>
              <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-blue-200">
                <p className="text-sm text-gray-500">
                  <strong>Note:</strong> This policy may be updated periodically. We will notify users
                  of significant changes via email or in-app notification.
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

export default PrivacyPolicyPage;