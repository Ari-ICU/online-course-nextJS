import { Course } from "@/types";
import EnrollPaymentPage from "@/components/enroll/EnrollPaymentPage";
import { coursesMeta } from "@/data/course";
import { notFound } from "next/navigation";

// Fetch course data by slug
async function getCourse(slug: string): Promise<Course | null> {
  try {
    const course = coursesMeta.find((c) => c.slug === slug);
    if (!course) return null;
    // Optionally, attach curriculum if needed
    return { ...course, curriculum: [] };
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

// Define the props type explicitly
interface EnrollPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EnrollPage({ params }: EnrollPageProps) {
  const { slug } = await params; // Await the params to resolve the Promise
  const course = await getCourse(slug);

  if (!course) {
    notFound(); // Use Next.js's notFound() for better 404 handling
  }

  return <EnrollPaymentPage course={course} />;
}