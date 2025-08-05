import { Module } from "@/types";

export const courseCurriculums: Record<string, Module[]> = {
  "complete-react-developer-course": [
    {
      id: "module-1",
      title: "Introduction",
      description: "Get started with the basics of React and JSX.",
      duration: "25 min",
      lessons: [
        {
          id: "lesson-1",
          title: "Introduction to React",
          duration: "10 min",
          type: "video",
          content: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
          freePreview: true,
        },
        {
          id: "lesson-2",
          title: "JSX and Components",
          duration: "15 min",
          type: "reading",
          content: "JSX is a syntax extension for JavaScript. It looks like HTML but it's actually JavaScript.",
        },
      ],
    },
    {
      id: "module-2",
      title: "Advanced Concepts",
      description: "Explore advanced React concepts including state, props, and hooks.",
      duration: "1h 50m",
      lessons: [
        {
          id: "lesson-3",
          title: "State and Props",
          duration: "40 min",
          type: "video",
          content: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        },
        {
          id: "lesson-4",
          title: "Lifecycle Methods",
          duration: "30 min",
          type: "reading",
          content: "Lifecycle methods let you hook into different phases of a component's existence.",
        },
        {
          id: "lesson-5",
          title: "Hooks Overview",
          duration: "40 min",
          type: "video",
          content: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        },
      ],
    },
  ],
  "python-for-data-science-and-machine-learning": [
    {
      id: "module-1",
      title: "Getting Started with Python for Data Science",
      description: "Setup and basic Python for data analysis.",
      duration: "3h",
      lessons: [
        { id: "lesson-1", title: "Installing Python & Jupyter", duration: "30m", type: "video", content: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
        { id: "lesson-2", title: "Intro to Pandas & NumPy", duration: "1h 30m", type: "video", content: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
        { id: "lesson-3", title: "Working with DataFrames", duration: "1h", type: "reading", content: "DataFrames are a core part of data analysis in Python using Pandas." },
      ],
    },
    {
      id: "module-2",
      title: "Machine Learning Basics",
      description: "Learn core ML algorithms and workflows.",
      duration: "4h",
      lessons: [
        { id: "lesson-4", title: "Intro to Scikit-learn", duration: "1h", type: "video", content: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
        { id: "lesson-5", title: "Supervised Learning", duration: "2h", type: "video", content: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
        { id: "lesson-6", title: "Unsupervised Learning", duration: "1h", type: "reading", content: "Explore clustering, dimensionality reduction, and other unsupervised ML techniques." },
      ],
    },
  ],
  "ui-ux-design-mastery-figma-adobe-xd": [
    {
      id: "module-1",
      title: "UI/UX Foundations",
      description: "Understand design principles and user experience basics.",
      duration: "2h",
      lessons: [
        { id: "lesson-1", title: "What is UX Design?", duration: "30m", type: "video", content: "https://..." },
        { id: "lesson-2", title: "Design Thinking Process", duration: "1h 30m", type: "reading", content: "Design thinking is a problem-solving approach focused on user needs." },
      ],
    },
    {
      id: "module-2",
      title: "Figma & Adobe XD",
      description: "Hands-on with Figma and Adobe XD.",
      duration: "4h",
      lessons: [
        { id: "lesson-3", title: "Figma Essentials", duration: "2h", type: "video", content: "https://..." },
        { id: "lesson-4", title: "Prototyping with Adobe XD", duration: "2h", type: "video", content: "https://..." },
      ],
    },
  ],
  "nodejs-api-development-masterclass": [
    {
      id: "module-1",
      title: "Setting up Node.js",
      description: "Environment setup and basic concepts.",
      duration: "1h",
      lessons: [
        { id: "lesson-1", title: "Node.js Basics", duration: "30m", type: "video", content: "https://..." },
        { id: "lesson-2", title: "Installing Express.js", duration: "30m", type: "reading", content: "Express is a lightweight framework for building APIs in Node.js." },
      ],
    },
    {
      id: "module-2",
      title: "Building APIs",
      description: "RESTful and GraphQL API development.",
      duration: "3h",
      lessons: [
        { id: "lesson-3", title: "REST API Basics", duration: "1h", type: "video", content: "https://..." },
        { id: "lesson-4", title: "GraphQL API", duration: "2h", type: "video", content: "https://..." },
      ],
    },
  ],
  "full-stack-web-development-bootcamp": [
    {
      id: "module-1",
      title: "Frontend Basics",
      description: "HTML, CSS, and JavaScript for building websites.",
      duration: "5h",
      lessons: [
        { id: "lesson-1", title: "HTML Fundamentals", duration: "1h 30m", type: "video", content: "https://..." },
        { id: "lesson-2", title: "CSS Styling", duration: "2h", type: "video", content: "https://..." },
        { id: "lesson-3", title: "Intro to JavaScript", duration: "1h 30m", type: "video", content: "https://..." },
      ],
    },
    {
      id: "module-2",
      title: "Backend & Database",
      description: "Build server-side apps with Node.js and PostgreSQL.",
      duration: "6h",
      lessons: [
        { id: "lesson-4", title: "Node.js Basics", duration: "2h", type: "video", content: "https://..." },
        { id: "lesson-5", title: "PostgreSQL Integration", duration: "4h", type: "video", content: "https://..." },
      ],
    },
  ],
  "advanced-css-and-sass": [
    {
      id: "module-1",
      title: "Advanced CSS",
      description: "Learn Flexbox, Grid, and advanced selectors.",
      duration: "4h",
      lessons: [
        { id: "lesson-1", title: "Mastering Flexbox", duration: "2h", type: "video", content: "https://..." },
        { id: "lesson-2", title: "CSS Grid Layouts", duration: "2h", type: "video", content: "https://..." },
      ],
    },
    {
      id: "module-2",
      title: "Sass Essentials",
      description: "Use Sass for scalable styling.",
      duration: "2h",
      lessons: [
        { id: "lesson-3", title: "Variables & Mixins", duration: "1h", type: "reading", content: "Sass variables and mixins help organize your styles efficiently." },
        { id: "lesson-4", title: "Nesting & Partials", duration: "1h", type: "video", content: "https://..." },
      ],
    },
  ],
  "java-programming-complete-guide": [
    {
      id: "module-1",
      title: "Java Basics",
      description: "Learn Java syntax and core concepts.",
      duration: "3h",
      lessons: [
        { id: "lesson-1", title: "Setting up Java", duration: "1h", type: "video", content: "https://..." },
        { id: "lesson-2", title: "Variables & Data Types", duration: "2h", type: "video", content: "https://..." },
      ],
    },
    {
      id: "module-2",
      title: "OOP in Java",
      description: "Master object-oriented programming concepts.",
      duration: "5h",
      lessons: [
        { id: "lesson-3", title: "Classes & Objects", duration: "2h", type: "video", content: "https://..." },
        { id: "lesson-4", title: "Inheritance & Polymorphism", duration: "3h", type: "video", content: "https://..." },
      ],
    },
  ],
  "cybersecurity-fundamentals": [
    {
      id: "module-1",
      title: "Security Basics",
      description: "Understand security principles and practices.",
      duration: "2h",
      lessons: [
        { id: "lesson-1", title: "Cybersecurity Terminology", duration: "1h", type: "video", content: "https://..." },
        { id: "lesson-2", title: "Types of Threats", duration: "1h", type: "video", content: "https://..." },
      ],
    },
    {
      id: "module-2",
      title: "Network Security",
      description: "Protect networks and systems.",
      duration: "4h",
      lessons: [
        { id: "lesson-3", title: "Firewalls & VPNs", duration: "2h", type: "video", content: "https://..." },
        { id: "lesson-4", title: "Intrusion Detection", duration: "2h", type: "video", content: "https://..." },
      ],
    },
  ],
  "mobile-app-development-with-flutter": [
    {
      id: "module-1",
      title: "Flutter Setup",
      description: "Get started with Flutter and Dart.",
      duration: "3h",
      lessons: [
        { id: "lesson-1", title: "Installing Flutter SDK", duration: "1h", type: "video", content: "https://..." },
        { id: "lesson-2", title: "Intro to Dart", duration: "2h", type: "video", content: "https://..." },
      ],
    },
    {
      id: "module-2",
      title: "Building Apps",
      description: "Develop cross-platform apps.",
      duration: "5h",
      lessons: [
        { id: "lesson-3", title: "State Management with Provider", duration: "2h", type: "video", content: "https://..." },
        { id: "lesson-4", title: "API Integration", duration: "3h", type: "video", content: "https://..." },
      ],
    },
  ],
  "docker-and-kubernetes-deployment": [
    {
      id: "module-1",
      title: "Docker Essentials",
      description: "Learn Docker for containerization.",
      duration: "3h",
      lessons: [
        { id: "lesson-1", title: "Docker Basics", duration: "1h 30m", type: "video", content: "https://..." },
        { id: "lesson-2", title: "Docker Compose", duration: "1h 30m", type: "video", content: "https://..." },
      ],
    },
    {
      id: "module-2",
      title: "Kubernetes for Orchestration",
      description: "Deploy and manage containers at scale.",
      duration: "5h",
      lessons: [
        { id: "lesson-3", title: "Kubernetes Basics", duration: "2h", type: "video", content: "https://..." },
        { id: "lesson-4", title: "Helm & Advanced Deployments", duration: "3h", type: "video", content: "https://..." },
      ],
    },
  ],
  "artificial-intelligence-fundamentals": [
    {
      id: "module-1",
      title: "AI Basics",
      description: "Understand AI concepts and applications.",
      duration: "3h",
      lessons: [
        { id: "lesson-1", title: "What is AI?", duration: "1h", type: "video", content: "https://..." },
        { id: "lesson-2", title: "AI vs Machine Learning", duration: "2h", type: "reading", content: "AI and ML are closely related fields with different scopes." },
      ],
    },
    {
      id: "module-2",
      title: "Neural Networks",
      description: "Learn the basics of neural networks.",
      duration: "4h",
      lessons: [
        { id: "lesson-3", title: "Building Neural Networks", duration: "2h", type: "video", content: "https://..." },
        { id: "lesson-4", title: "Backpropagation & Optimization", duration: "2h", type: "video", content: "https://..." },
      ],
    },
  ],
  "sql-database-design-and-optimization": [
    {
      id: "module-1",
      title: "SQL Basics",
      description: "Learn SQL queries and syntax.",
      duration: "3h",
      lessons: [
        { id: "lesson-1", title: "SELECT Statements", duration: "1h 30m", type: "video", content: "https://..." },
        { id: "lesson-2", title: "Filtering & Sorting", duration: "1h 30m", type: "video", content: "https://..." },
      ],
    },
    {
      id: "module-2",
      title: "Database Design & Optimization",
      description: "Create efficient database schemas and optimize queries.",
      duration: "4h",
      lessons: [
        { id: "lesson-3", title: "Normalization & Indexing", duration: "2h", type: "video", content: "https://..." },
        { id: "lesson-4", title: "Query Optimization", duration: "2h", type: "video", content: "https://..." },
      ],
    },
  ],
};
