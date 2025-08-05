Online Course Platform

This is a Next.js project bootstrapped with create-next-app, designed to provide an online course platform featuring a variety of courses in web development, data science, design, cybersecurity, and more.

Features

- Browse a catalog of courses with details like title, instructor, price, duration, and skill level.
- View course metadata including descriptions, ratings, and skills covered.
- Responsive design optimized for desktop and mobile devices.
- Built with TypeScript for type-safe development.
- Uses Geist, a modern font family optimized by Vercel.

Getting Started

To run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open http://localhost:3000 in your browser to see the result.

You can start editing the main page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a modern font family for Vercel.

Project Structure

- src/data/course.ts: Contains metadata for available courses, including details like course title, instructor, price, duration, level, and skills.
- src/types/index.ts: Defines TypeScript interfaces for course data, such as Course and CourseLevel.
- app/: Contains the main Next.js application code, including pages and components.
- public/: Static assets like images used in the course catalog.

Available Courses

The platform includes courses in various categories, such as:
- Web Development: Complete React Developer Course, Full Stack Web Development Bootcamp
- Data Science: Python for Data Science and Machine Learning
- Design: UI/UX Design Mastery with Figma & Adobe XD
- Backend Development: Node.js API Development Masterclass
- Cybersecurity: Cybersecurity Fundamentals
- Mobile Development: Mobile App Development with Flutter
- DevOps: Docker & Kubernetes: The Practical Guide
- Artificial Intelligence: Artificial Intelligence Fundamentals
- Database Management: SQL Database Design and Optimization

Explore the full course catalog in src/data/course.ts.

Learn More

To learn more about Next.js, check out the following resources:
- Next.js Documentation[](https://nextjs.org/docs) - Learn about Next.js features and APIs.
- Learn Next.js[](https://nextjs.org/learn) - An interactive Next.js tutorial.
- Next.js GitHub Repository[](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!

Deploy on Vercel

The easiest way to deploy this Next.js app is to use the Vercel Platform[](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the Next.js deployment documentation[](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes and commit (git commit -m "Add your feature").
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.

Please ensure your code follows the project's TypeScript and Next.js conventions.

License

This project is licensed under the MIT License. See the LICENSE file for details.