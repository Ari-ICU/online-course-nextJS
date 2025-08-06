'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseList from '@/components/CourseList';
import CTASection from '@/components/CTASection';
import FeaturesSection from './feature/FeaturesSection';

export default function LayoutWithDynamicMain() {
  const pathname = usePathname();

  return (
    <div className="font-sans grid grid-rows-[auto_1fr_20px] min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main content changes based on route */}
      <main className="flex flex-col items-center justify-center text-center gap-6 p-4">
       
          <>
            <CTASection courseTitle="Advanced React Development" price={89.99} />
            <CourseList />
            <FeaturesSection />
          </>
       
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white">
        <Footer />
      </footer>
    </div>
  );
}
