'use client';

import { useMemo, useEffect } from 'react';
import Link from 'next/link';
import { enrolledCourseIds } from '@/data/enrolledCourses';

interface CTASectionProps {
  courseTitle: string;
  price: number;
  slug?: string;
  status?: 'available' | 'coming-soon';
}

// Utility function to generate slug from courseTitle
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') 
    .trim()
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-');
};

const CTASection = ({ courseTitle, price, slug, status = 'available' }: CTASectionProps) => {
  // Use provided slug or generate from courseTitle
  const effectiveSlug = useMemo(() => slug || generateSlug(courseTitle), [slug, courseTitle]);

  // Check enrollment status
  const isEnrolled = useMemo(() => {
    if (status !== 'available') return false;
    return enrolledCourseIds.includes(effectiveSlug);
  }, [effectiveSlug, status]);

  // Debug props and enrollment status
  useEffect(() => {
    console.log(`CTASection: courseTitle=${courseTitle}, slug=${slug}, effectiveSlug=${effectiveSlug}, status=${status}, isEnrolled=${isEnrolled}`);
    if (!slug) {
      console.warn(`CTASection: 'slug' is undefined for course "${courseTitle}". Generated slug: "${effectiveSlug}".`);
    }
    if (!enrolledCourseIds.includes(effectiveSlug) && status === 'available') {
      console.log(`Note: Generated slug "${effectiveSlug}" not found in enrolledCourseIds. Enrollment check may return false.`);
    }
  }, [courseTitle, slug, effectiveSlug, status, isEnrolled]);

  // Handle invalid status
  if (status !== 'available' && status !== 'coming-soon') {
    console.warn(`Invalid status "${status}" for course "${courseTitle}". Defaulting to "available".`);
    status = 'available';
  }
  
  return (
    <section className="relative py-8 sm:py-12 md:py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-white/5 rounded-full -translate-x-24 -translate-y-24 sm:-translate-x-32 sm:-translate-y-32 md:-translate-x-36 md:-translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white/3 rounded-full translate-x-32 translate-y-32 sm:translate-x-40 sm:translate-y-40 md:translate-x-48 md:translate-y-48"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/25 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {status === 'coming-soon' ? (
          <div className="text-center">
            <div className="mb-6 sm:mb-8 md:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Coming Soon!
                </span>
                <br />
                <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  {courseTitle}
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Get ready to master <span className="font-semibold text-white">{courseTitle}</span>! Sign up to be notified when this course launches.
              </p>
            </div>

            <div className="max-w-md sm:max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-white/95 to-blue-100/85 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 animate-pulse transition-all duration-300">
                <div className="text-center mb-4 sm:mb-6">
                  <p className="text-sm sm:text-base text-gray-600 font-medium">Be the first to know when {courseTitle} is available!</p>
                </div>
                <Link
                  href={`/courses/${effectiveSlug}/notify`}
                  className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                  aria-label={`Get notified when ${courseTitle} is available`}
                >
                  📬 Notify Me
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {isEnrolled ? 'Continue Your Journey' : 'Transform Your Career'}
                </span>
                <br />
                <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  {isEnrolled ? 'Keep Learning Today' : 'Start Learning Today'}
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                {isEnrolled ? (
                  <>
                    Continue mastering <span className="font-semibold text-white">{courseTitle}</span> and take your skills to the next level.
                  </>
                ) : (
                  <>
                    Join <span className="font-semibold text-white">12,000+</span> students who have already transformed their careers with{' '}
                    <span className="font-semibold text-white">{courseTitle}</span>.
                  </>
                )}
              </p>
            </div>

            <div className="max-w-md sm:max-w-lg mx-auto">
              {isEnrolled ? (
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300">
                  <div className="text-center mb-4 sm:mb-6">
                    <p className="text-sm sm:text-base text-gray-600 font-medium">You’re enrolled in {courseTitle}!</p>
                  </div>
                  <Link
                    href={`/courses/${effectiveSlug}/learn`}
                    className="block w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg hover:from-green-700 hover:to-teal-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                    aria-label={`Continue learning ${courseTitle}`}
                  >
                    🚀 Continue Learning
                  </Link>
                </div>
              ) : (
                <>
                  {/* Pricing card for non-enrolled users */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300">
                    {/* Price section */}
                    <div className="text-center mb-4 sm:mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-base sm:text-lg md:text-xl text-gray-500 line-through">
                          ${(price * 1.5).toFixed(2)}
                        </span>
                        <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          Save 33%
                        </span>
                      </div>
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                        ${price.toFixed(2)}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">One-time payment • Lifetime access</p>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/courses/${effectiveSlug}`}
                      className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                      aria-label={`Enroll in ${courseTitle}`}
                    >
                      🚀 Start Learning Now
                    </Link>

                    {/* Trust indicators */}
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 text-center mt-4 sm:mt-6">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>30-day money-back guarantee</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Instant access to all materials</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>

                  {/* Subscription offer */}
                  <div className="mt-6 sm:mt-8 text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                      <p className="text-blue-100 mb-2 sm:mb-3 text-sm sm:text-base">
                        <span className="font-semibold text-white">Or get unlimited access</span>
                      </p>
                      <p className="text-blue-200 text-xs sm:text-sm mb-3 sm:mb-4">
                        Access this course + 4,000+ more with our premium subscription
                      </p>
                      <Link
                        href="/subscriptions"
                        className="text-white border-2 border-white/30 px-4 sm:px-6 py-2 rounded-lg hover:bg-white/10 transition-colors text-xs sm:text-sm font-medium"
                        aria-label="View subscription plans"
                      >
                        View Subscription Plans
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CTASection;