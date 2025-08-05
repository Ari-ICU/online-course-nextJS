interface CTASectionProps {
  courseTitle: string;
  price: number;
}

const CTASection = ({ courseTitle, price }: CTASectionProps) => {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        /* On hover, override the animation with a still, scaled state */
        .hover\\:animate-none:hover {
          animation: none;
          transform: scale(1.05);
        }
      `}</style>

      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-36 -translate-y-36"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/3 rounded-full translate-x-48 translate-y-48"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Transform Your Career
              </span>
              <br />
              <span className="text-white text-3xl md:text-4xl lg:text-5xl">
                Start Learning Today
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join <span className="font-semibold text-white">12,000+</span> students who have 
              already transformed their careers with <span className="font-semibold text-white">{courseTitle}</span>
            </p>
          </div>

          {/* Enhanced pricing card with floating animation */}
          <div className="max-w-lg mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 animate-float hover:animate-none transition-all duration-300">
              {/* Price section */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl text-gray-500 line-through">${(price * 1.5).toFixed(2)}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Save 33%
                  </span>
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  ${price.toFixed(2)}
                </div>
                <p className="text-gray-600">One-time payment • Lifetime access</p>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mb-6">
                🚀 Start Learning Now
              </button>

              {/* Trust indicators */}
              <div className="space-y-3 text-sm text-gray-600 text-center">
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
            <div className="mt-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-blue-100 mb-3">
                  <span className="font-semibold text-white">Or get unlimited access</span>
                </p>
                <p className="text-blue-200 text-sm mb-4">
                  Access this course + 4,000+ more with our premium subscription
                </p>
                <button className="text-white border-2 border-white/30 px-6 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
                  View Subscription Plans
                </button>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-8 text-blue-100 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-yellow-300">★★★★★</span>
                <span>4.9/5 rating</span>
              </div>
              <div>12,000+ students</div>
              <div>98% completion rate</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;