import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseHeader from '@/components/details-courses/CourseHeader';
import CourseContent from '@/components/details-courses/CourseContent';
import CourseSidebar from '@/components/details-courses/CourseSidebar';
import { coursesMeta } from '@/data/course';
import { courseCurriculums } from '@/data/coursesContent';
import { enrolledCourseIds } from '@/data/enrolledCourses';
import type { Course } from '@/types';

interface Props {
  params: { slug: string };
}

const fetchCourseData = (slug: string): Course | null => {
  const curriculum = courseCurriculums?.[slug] ?? [];
  const courseMeta = coursesMeta.find(c => c.slug.toLowerCase() === slug.toLowerCase());
  if (!courseMeta) return null;

  const instructorName = typeof courseMeta.instructor === 'string' ? courseMeta.instructor : 'Unknown Instructor';

  return {
    ...courseMeta,
    slug,
    curriculum,
    instructor: {
      id: '1',
      name: instructorName,
      bio: `${instructorName} is a seasoned professional.`,
      avatar: courseMeta.image || '/api/placeholder/100/100',
      company: 'Tech Corp',
      jobTitle: `Senior ${courseMeta.category || 'Expert'}`,
      socialLinks: {
        twitter: instructorName ? `https://twitter.com/${instructorName.replace(/\s+/g, '')}` : undefined,
      },
    },
    reviews: [],
    relatedCourses: coursesMeta.filter(c => c.category === courseMeta.category && c.slug !== slug).slice(0, 3),
  };
};

export default function CourseDetailPage({ params }: Props) {
  const slug = params.slug;

  if (!slug || slug.trim() === '') {
    notFound();
  }

  const course = fetchCourseData(slug);

  if (!course) {
    notFound();
  }

  const isEnrolled = enrolledCourseIds.includes(slug);

  const totalLessons = course.curriculum.reduce((total, module) => total + module.lessons.length, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <CourseHeader course={course} totalLessons={totalLessons} isEnrolled={isEnrolled} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <CourseContent course={course} />
          </div>
          <div className="lg:col-span-1 order-1 lg:order-2 lg:sticky lg:top-20 lg:self-start lg:max-h-screen lg:overflow-y-auto lg:scrollbar-hide">
            <CourseSidebar course={course} isEnrolled={isEnrolled} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
