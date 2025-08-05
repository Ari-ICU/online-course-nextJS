// src/store/enrollment.ts
import { create } from 'zustand';
import { User } from '@/types';

interface EnrollmentState {
  user: User | null;
  enrolledCourses: string[]; // Kept for backward compatibility
  enrollCourse: (courseSlug: string) => void;
  unenrollCourse: (courseSlug: string) => void;
  setUser: (user: User | null) => void;
}

export const useEnrollmentStore = create<EnrollmentState>((set) => ({
  user: null,
  enrolledCourses: [], // Initialize empty or fetch from user data
  enrollCourse: (courseSlug: string) =>
    set((state) => ({
      enrolledCourses: [...new Set([...state.enrolledCourses, courseSlug])],
      user: state.user
        ? { ...state.user, enrolledCourses: [...new Set([...state.user.enrolledCourses, courseSlug])] }
        : state.user,
    })),
  unenrollCourse: (courseSlug: string) =>
    set((state) => ({
      enrolledCourses: state.enrolledCourses.filter((slug) => slug !== courseSlug),
      user: state.user
        ? { ...state.user, enrolledCourses: state.user.enrolledCourses.filter((slug) => slug !== courseSlug) }
        : state.user,
    })),
  setUser: (user: User | null) => set({ user, enrolledCourses: user?.enrolledCourses || [] }),
}));