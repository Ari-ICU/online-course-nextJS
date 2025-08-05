// types/index.ts
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export enum SortOption {
  Featured = 'featured',
  Rating = 'rating',
  Students = 'students',
  PriceLow = 'price-low',
  PriceHigh = 'price-high',
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  content?: string;
  duration?: string;
  freePreview?: boolean;
  lastAccessed?: string | null;
  timestamps?: { time: string; label: string }[];
  aiGeneratedTimestamps?: { time: string; label: string; confidence: number }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  duration: string;
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  company: string;
  jobTitle: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Review {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface RelatedCourse {
  id: string;
  slug: string; 
  title: string;
  price: number;
  rating: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  image?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount?: number;
  students?: number;
  duration: string;
  level?: CourseLevel;
  featured?: boolean;
  skills?: string[];
  instructor: Instructor;
  curriculum: Module[];
  reviews: Review[];
  relatedCourses: RelatedCourse[];
  learningObjectives?: string[]; // Add learningObjectives
  requirements?: string[];
  lastUpdated?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: string[]; // Array of course slugs (matches useEnrollmentStore)
  createdAt?: string;
  updatedAt?: string;
  role?: 'student' | 'instructor' | 'admin'; // Optional role for user types
  preferences?: {
    notifications?: boolean;
    theme?: 'light' | 'dark';
  };
}

export interface CourseListProps {
  courses?: Course[];
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
}

export interface CourseDetailPageProps {
  courseId?: string;
  slug?: string;
  course?: Course;
}

export interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
}

export interface CoursePreviewCardProps {
  course: Course;
  isEnrolled: boolean;
}