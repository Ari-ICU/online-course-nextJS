"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, useAnimation, useInView, Variants, Transition } from "framer-motion";
import { Cookie, Shield, Settings, Info } from "lucide-react";

// Animated Section Wrapper
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut", delay } as Transition,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-amber-25 to-blue-50">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-medium">Last updated:</span> August 4, 2025
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-4"></div>
          </div>
        </AnimatedSection>

        {/* Content Sections */}
        <div className="space-y-10">
          <AnimatedSection delay={0.1}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-amber-100">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  1
                </span>
                <Cookie className="w-6 h-6 text-amber-600 mr-2" />
                What Are Cookies?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Cookies are small text files stored on your device when you
                visit our website. They help CourseHub remember your
                preferences, enhance performance, and provide a smoother, more
                personalized experience.
              </p>
              <p className="text-sm text-gray-500 mt-4 italic">
                No personal data is stored in cookies without your consent.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  2
                </span>
                <Shield className="w-6 h-6 text-blue-600 mr-2" />
                How We Use Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                <li>
                  Enable essential site functionality (e.g., login sessions).
                </li>
                <li>
                  Analyze how users interact with our platform to improve
                  performance.
                </li>
                <li>
                  Personalize content and recommendations based on your
                  interests.
                </li>
                <li>Deliver targeted advertising through trusted partners.</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  3
                </span>
                <Info className="w-6 h-6 text-purple-600 mr-2" />
                Types of Cookies We Use
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="pl-2 border-l-4 border-l-blue-300 bg-blue-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900">
                    Essential Cookies
                  </h3>
                  <p className="text-sm mt-1">
                    Required for the website to function properly (e.g., session
                    management).
                  </p>
                </div>
                <div className="pl-2 border-l-4 border-l-green-300 bg-green-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900">
                    Analytics Cookies
                  </h3>
                  <p className="text-sm mt-1">
                    Help us understand user behavior using tools like Google
                    Analytics (anonymous data).
                  </p>
                </div>
                <div className="pl-2 border-l-4 border-l-orange-300 bg-orange-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900">
                    Marketing Cookies
                  </h3>
                  <p className="text-sm mt-1">
                    Used by partners to show relevant ads. You can opt out
                    anytime.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-10 h-10 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  4
                </span>
                <Settings className="w-6 h-6 text-gray-600 mr-2" />
                Managing Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You can control or disable cookies through your browser
                settings:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                <li>
                  Google Chrome: Settings → Privacy and Security → Cookies
                </li>
                <li>Mozilla Firefox: Options → Privacy & Security → Cookies</li>
                <li>Safari: Preferences → Privacy → Manage Website Data</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                <strong>Note:</strong> Disabling essential cookies may affect
                site functionality and your experience.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5 flex items-center">
                <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  5
                </span>
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about our Cookie Policy or how we use
                cookies, please reach out to our Data Protection Officer at{" "}
                <a
                  href="mailto:support@coursehub.com"
                  className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
                >
                  support@coursehub.com
                </a>
                .
              </p>
              <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-blue-200">
                <p className="text-sm text-gray-500">
                  <strong>Transparency:</strong> We do not sell cookie data. You
                  can update your preferences anytime via our{" "}
                  <em>Cookie Consent Banner</em>.
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

export default CookiePolicyPage;