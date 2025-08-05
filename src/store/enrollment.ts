import { create } from 'zustand';
import { User } from '@/types';
import { enrolledCourseIds } from '@/data/enrolledCourses';

interface EnrollmentState {
  user: User | null;
  enrollCourse: (courseSlug: string) => void;
  unenrollCourse: (courseSlug: string) => void;
  setUser: (user: User | null) => void;
  getEnrolledCourses: () => string[];
}

export const useEnrollmentStore = create<EnrollmentState>((set, get) => ({
  // Initialize user with enrolledCourseIds if no user is provided
  user: {
    id: '',
    name: '',
    email: '',
    enrolledCourses: [...enrolledCourseIds], // Initialize with enrolledCourseIds
  },

  enrollCourse: (courseSlug: string) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            enrolledCourses: [...new Set([...state.user.enrolledCourses, courseSlug])], // Avoid duplicates
          }
        : {
            id: '',
            name: '',
            email: '',
            enrolledCourses: [...new Set([...enrolledCourseIds, courseSlug])], // Initialize with enrolledCourseIds + new slug
          },
    })),

  unenrollCourse: (courseSlug: string) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            enrolledCourses: state.user.enrolledCourses.filter((slug) => slug !== courseSlug),
          }
        : {
            id: '',
            name: '',
            email: '',
            enrolledCourses: enrolledCourseIds.filter((slug) => slug !== courseSlug), // Fallback to enrolledCourseIds
          },
    })),

  setUser: (user: User | null) =>
    set({
      user: user
        ? {
            ...user,
            enrolledCourses: [
              ...new Set([
                ...(user.enrolledCourses || []), // Merge provided enrolled courses
                ...enrolledCourseIds, // Ensure enrolledCourseIds are included
              ]),
            ],
          }
        : {
            id: '',
            name: '',
            email: '',
            enrolledCourses: [...enrolledCourseIds], // Default to enrolledCourseIds
          },
    }),

  getEnrolledCourses: () => get().user?.enrolledCourses || enrolledCourseIds, // Return user.enrolledCourses or fallback to enrolledCourseIds
}));