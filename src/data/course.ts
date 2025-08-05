import { Course } from "@/types";

export const coursesMeta: Omit<Course, "curriculum">[] = [
  {
    id: "1",
    slug: "complete-react-developer-course",
    title: "Complete React Developer Course",
    instructor: {
      id: "1",
      name: "Sarah Johnson",
      bio: "Sarah Johnson is a seasoned React expert.",
      avatar: "/api/placeholder/100/100",
      company: "Code Academy",
      jobTitle: "Senior React Developer",
      socialLinks: { twitter: "sarahj" }
    },
    description:
      "Master React from basics to advanced concepts including hooks, context, and testing. Build real-world apps with Redux and React Router.",
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 2847,
    students: 15420,
    duration: "42 hours",
    level: "Intermediate",
    category: "Web Development",
    image: "/images/react-course.jpg",
    featured: true,
    skills: ["React", "JavaScript", "Redux", "Testing", "Frontend"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
  {
    id: "2",
    slug: "python-for-data-science-and-machine-learning",
    title: "Python for Data Science and Machine Learning",
    instructor: {
      id: "2",
      name: "Dr. Michael Chen",
      bio: "Dr. Michael Chen is a data scientist and educator.",
      avatar: "/api/placeholder/100/100",
      company: "Data Innovations",
      jobTitle: "Lead Data Scientist",
      socialLinks: { twitter: "michaelc" }
    },
    description:
      "Learn Python, Pandas, NumPy, Scikit-learn, and TensorFlow. Apply machine learning to real datasets and build predictive models.",
    price: 94.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviewCount: 3120,
    students: 18900,
    duration: "50 hours",
    level: "Intermediate",
    category: "Data Science",
    image: "/images/python-ml-course.jpg",
    featured: true,
    skills: ["Python", "Pandas", "Machine Learning", "TensorFlow", "Data Analysis"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
  {
    id: "3",
    slug: "ui-ux-design-mastery-figma-adobe-xd",
    title: "UI/UX Design Mastery: Figma & Adobe XD",
    instructor: {
      id: "3",
      name: "Lena Patel",
      bio: "Lena Patel is an expert UI/UX designer.",
      avatar: "/api/placeholder/100/100",
      company: "Design Studio",
      jobTitle: "Lead Designer",
      socialLinks: { twitter: "lenap" }
      
    },
    description:
      "Design beautiful, user-centered interfaces. Learn wireframing, prototyping, user research, and design systems using industry tools.",
    price: 74.99,
    originalPrice: 169.99,
    rating: 4.7,
    reviewCount: 1950,
    students: 9800,
    duration: "30 hours",
    level: "Beginner",
    category: "Design",
    image: "/images/figma-course.jpg",
    featured: false,
    skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
  {
    id: "4",
    slug: "nodejs-api-development-masterclass",
    title: "Node.js API Development Masterclass",
    instructor: {
      id: "4",
      name: "James Anderson",
      bio: "James Anderson specializes in backend development.",
      avatar: "/api/placeholder/100/100",
      company: "Backend Solutions",
      jobTitle: "Senior Backend Developer",
      socialLinks: { twitter: "jamesa" }
    },
    description:
      "Build RESTful and GraphQL APIs using Node.js, Express, and MongoDB. Learn authentication, testing, and deployment techniques.",
    price: 84.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 2250,
    students: 12000,
    duration: "38 hours",
    level: "Intermediate",
    category: "Backend Development",
    image: "/images/nodejs-api-course.jpg",
    featured: true,
    skills: ["Node.js", "Express", "MongoDB", "GraphQL", "API Development"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
  {
    id: "5",
    slug: "full-stack-web-development-bootcamp",
    title: "Full Stack Web Development Bootcamp",
    instructor: {
      id: "5",
      name: "Emma Davis",
      bio: "Emma Davis is a full-stack development educator.",
      avatar: "/api/placeholder/100/100",
      company: "Dev Masters",
      jobTitle: "Full Stack Lead",
      socialLinks: { twitter: "emmad" }
    },
    description:
      "Become a full-stack developer by learning HTML, CSS, JavaScript, React, Node.js, and PostgreSQL. Build end-to-end applications.",
    price: 99.99,
    originalPrice: 299.99,
    rating: 4.9,
    reviewCount: 5000,
    students: 25000,
    duration: "60 hours",
    level: "Beginner",
    category: "Web Development",
    image: "/images/fullstack-bootcamp.jpg",
    featured: true,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "PostgreSQL"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
  {
    id: "6",
    slug: "advanced-css-and-sass",
    title: "Advanced CSS and Sass: Flexbox, Grid, and Animations",
    instructor: {
      id: "6",
      name: "Sophia Martinez",
      bio: "Sophia Martinez is a frontend styling expert.",
      avatar: "/api/placeholder/100/100",
      company: "Style Innovators",
      jobTitle: "Frontend Architect",
      socialLinks: { twitter: "sophiam" }
    },
    description:
      "Master advanced CSS techniques, including Flexbox, CSS Grid, animations, and responsive design for modern web applications.",
    price: 59.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviewCount: 1800,
    students: 9500,
    duration: "25 hours",
    level: "Intermediate",
    category: "Web Design",
    image: "/images/css-sass-course.jpg",
    featured: false,
    skills: ["CSS", "Sass", "Flexbox", "Grid", "Animations", "Responsive Design"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
  {
    id: "7",
    slug: "java-programming-complete-guide",
    title: "Java Programming: The Complete Guide",
    instructor: {
      id: "7",
      name: "David Thompson",
      bio: "David Thompson is a veteran Java developer.",
      avatar: "/api/placeholder/100/100",
      company: "Enterprise Solutions",
      jobTitle: "Lead Java Developer",
      socialLinks: { twitter: "davidt" }
    },
    description:
      "Learn Java from scratch. Master OOP concepts, data structures, multithreading, and build real-world projects.",
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 2100,
    students: 11000,
    duration: "48 hours",
    level: "Beginner",
    category: "Programming",
    image: "/images/java-course.jpg",
    featured: false,
    skills: ["Java", "OOP", "Data Structures", "Multithreading", "Backend"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
  {
    id: "8",
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    instructor: {
      id: "8",
      name: "Olivia Brown",
      bio: "Olivia Brown is a cybersecurity specialist.",
      avatar: "/api/placeholder/100/100",
      company: "SecureNet",
      jobTitle: "Cybersecurity Analyst",
      socialLinks: { twitter: "oliviab" }
    },
    description:
      "Understand cybersecurity principles, threat detection, and mitigation strategies. Includes hands-on labs and simulations.",
    price: 79.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviewCount: 1600,
    students: 8700,
    duration: "35 hours",
    level: "Intermediate",
    category: "Cybersecurity",
    image: "/images/cybersecurity-course.jpg",
    featured: true,
    skills: ["Cybersecurity", "Networking", "Threat Detection", "Risk Management"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
  {
    id: "9",
    slug: "mobile-app-development-with-flutter",
    title: "Mobile App Development with Flutter",
    instructor: {
      id: "9",
      name: "Daniel Lee",
      bio: "Daniel Lee is a mobile app developer.",
      avatar: "/api/placeholder/100/100",
      company: "Mobile Labs",
      jobTitle: "Senior Mobile Engineer",
      socialLinks: { twitter: "daniell" }
    },
    description:
      "Build cross-platform mobile applications with Flutter and Dart. Learn state management, animations, and API integration.",
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewCount: 2700,
    students: 14500,
    duration: "40 hours",
    level: "Intermediate",
    category: "Mobile Development",
    image: "/images/flutter-course.jpg",
    featured: true,
    skills: ["Flutter", "Dart", "State Management", "Animations", "Mobile Apps"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
  {
    id: "10",
    slug: "docker-and-kubernetes-deployment",
    title: "Docker & Kubernetes: The Practical Guide",
    instructor: {
      id: "10",
      name: "Ethan White",
      bio: "Ethan White is a DevOps professional.",
      avatar: "/api/placeholder/100/100",
      company: "Cloud Solutions",
      jobTitle: "DevOps Engineer",
      socialLinks: { twitter: "ethanw" }
    },
    description:
      "Learn containerization and orchestration with Docker and Kubernetes. Deploy scalable applications with CI/CD pipelines.",
    price: 94.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 2900,
    students: 15000,
    duration: "45 hours",
    level: "Advanced",
    category: "DevOps",
    image: "/images/docker-kubernetes-course.jpg",
    featured: true,
    skills: ["Docker", "Kubernetes", "CI/CD", "Cloud Deployment", "DevOps"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
  {
    id: "11",
    slug: "artificial-intelligence-fundamentals",
    title: "Artificial Intelligence Fundamentals",
    instructor: {
      id: "11",
      name: "Sophia Nguyen",
      bio: "Sophia Nguyen is an AI researcher and educator.",
      avatar: "/api/placeholder/100/100",
      company: "AI Innovations",
      jobTitle: "AI Researcher",
      socialLinks: { twitter: "sophian" }
    },
    description:
      "Get started with AI concepts including neural networks, natural language processing, and reinforcement learning.",
    price: 99.99,
    originalPrice: 259.99,
    rating: 4.9,
    reviewCount: 3200,
    students: 20000,
    duration: "55 hours",
    level: "Advanced",
    category: "Artificial Intelligence",
    image: "/images/ai-course.jpg",
    featured: true,
    skills: ["AI", "Neural Networks", "NLP", "Reinforcement Learning"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
  {
    id: "12",
    slug: "sql-database-design-and-optimization",
    title: "SQL Database Design and Optimization",
    instructor: {
      id: "12",
      name: "William Green",
      bio: "William Green is a database administrator.",
      avatar: "/api/placeholder/100/100",
      company: "Data Management Inc.",
      jobTitle: "Database Administrator",
      socialLinks: { twitter: "williamg" }
    },
    description:
      "Learn SQL from basics to advanced database design. Optimize queries, create complex joins, and ensure database performance.",
    price: 69.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviewCount: 1500,
    students: 9200,
    duration: "28 hours",
    level: "Intermediate",
    category: "Database Management",
    image: "/images/sql-course.jpg",
    featured: false,
    skills: ["SQL", "Database Design", "Query Optimization", "Joins", "Indexes"],
    reviews: [], // Add this property
    relatedCourses: [], // Add this property
  },
];