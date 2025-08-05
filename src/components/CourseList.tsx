// src/components/course-list/CourseList.tsx

"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import CourseCard from "@/components/course-list/CourseCard";
import Filters from "@/components/course-list/Filters";
import CourseCardSkeleton from "@/components/course-list/CourseCardSkeleton";
import { CourseListProps, SortOption, Course, Instructor } from "@/types";
import { coursesMeta } from "@/data/course";
import { enrolledCourseIds } from "@/data/enrolledCourses";

const CourseList: React.FC<CourseListProps> = ({
  showFilters = true,
  title = "Explore Our Courses",
  subtitle = "Discover thousands of courses from expert instructors",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.Featured);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Memoized categories
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(coursesMeta.map((c) => c.category))).filter(
        (cat): cat is string => typeof cat === "string"
      ),
    ],
    []
  );

  // Memoized levels
  const levels = useMemo(() => ["All", "Beginner", "Intermediate", "Advanced"], []);

  // Memoized filtered and sorted courses
  const filteredCourses = useMemo(() => {
    return coursesMeta
      .filter((course) => {
        const matchesSearch =
          (course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
          (course.instructor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
          (course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
        const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
        return matchesSearch && matchesCategory && matchesLevel;
      })
      .map((course): Course => ({
        ...course,
        id: course.id || "",
        slug: course.slug || "",
        title: course.title || "",
        description: course.description || undefined,
        category: course.category || undefined,
        image: course.image || undefined,
        price: course.price || 0,
        originalPrice: course.originalPrice || undefined,
        rating: course.rating || 0,
        reviewCount: course.reviewCount || undefined,
        students: course.students || undefined,
        duration: course.duration || "",
        level: course.level || undefined,
        featured: course.featured || false,
        skills: course.skills || undefined,
        instructor: course.instructor || {
          id: "",
          name: "",
          bio: "",
          avatar: "",
          company: "",
          jobTitle: "",
          socialLinks: {},
        },
        curriculum: [], // Provide default directly, do not reference course.curriculum
        reviews: [], // Provide default directly, do not reference course.reviews
        relatedCourses: [], // Provide default directly, do not reference course.relatedCourses
      }))
      .sort((a, b) => {
        switch (sortBy) {
          case SortOption.PriceLow:
            return (a.price ?? 0) - (b.price ?? 0);
          case SortOption.PriceHigh:
            return (b.price ?? 0) - (a.price ?? 0);
          case SortOption.Rating:
            return (b.rating ?? 0) - (a.rating ?? 0);
          case SortOption.Students:
            return (b.students ?? 0) - (a.students ?? 0);
          default:
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        }
      });
  }, [searchTerm, selectedCategory, selectedLevel, sortBy]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Memoized paginated courses
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    return filteredCourses.slice(startIndex, startIndex + coursesPerPage);
  }, [filteredCourses, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLevel, sortBy]);

  // Simulate loading for filter/pagination changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, selectedLevel, sortBy, currentPage]);

  // Animation variants for course cards
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: i * 0.1,
        ease: "easeOut" as const,
      },
    }),
  };

  // Memoized reset filters function
  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSortBy(SortOption.Featured);
    setCurrentPage(1);
  }, []);

  // Handle empty course data
  if (coursesMeta.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Available</h3>
          <p className="text-gray-600 mb-6">It looks like there are no courses to display at the moment.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        {showFilters && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Filters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              sortBy={sortBy}
              setSortBy={(sort: string) => setSortBy(SortOption[sort as keyof typeof SortOption])}
              categories={categories}
              levels={levels}
            />
          </motion.div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: coursesPerPage }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : paginatedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {paginatedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <CourseCard course={course} isEnrolled={enrolledCourseIds.includes(course.id)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={resetFilters}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {totalPages > 1 && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center items-center mt-12 space-x-2"
            aria-label="Pagination"
          >
            <motion.button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              aria-label="Previous page"
              whileHover={{ scale: currentPage === 1 ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === 1 ? 1 : 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentPage === page ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  aria-current={currentPage === page ? "page" : undefined}
                  aria-label={`Page ${page}`}
                  whileHover={{ scale: currentPage === page ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === page ? 1 : 0.95 }}
                >
                  {page}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              aria-label="Next page"
              whileHover={{ scale: currentPage === totalPages ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === totalPages ? 1 : 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </motion.nav>
        )}
      </div>
    </div>
  );
};

export default CourseList;