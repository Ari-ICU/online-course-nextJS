'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import { Users, BookOpen, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  // Animation variants with explicit typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' } as Transition,
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.4, ease: 'backOut' } as Transition,
    }),
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            About{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              CourseHub
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Empowering learners worldwide with accessible, high-quality education. Whether you're
            advancing your career or exploring new passions, CourseHub is your trusted learning partner.
          </motion.p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that education should be a right, not a privilege. Our mission is to
                break down barriers to learning by offering flexible, affordable, and expert-led
                courses. We're committed to fostering curiosity, inclusivity, and lifelong growth.
              </p>
              <p className="text-gray-600 italic">
                "Education is the most powerful weapon which you can use to change the world." – Nelson Mandela
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl shadow-xl transform transition-transform hover:scale-[1.02] duration-300"
            >
              <img
                src="/images/learning.jpg"
                alt="Students learning online"
                className="w-full h-64 sm:h-80 object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12"
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Excellence in Education',
                description: 'Courses developed by industry leaders and vetted for real-world relevance.',
              },
              {
                icon: Globe,
                title: 'Global Accessibility',
                description: 'Learn anytime, anywhere — on any device, with subtitles and flexible pacing.',
              },
              {
                icon: Users,
                title: 'Community & Support',
                description: 'Connect with mentors and peers in forums, live Q&As, and group projects.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                custom={index}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <value.icon className="w-12 h-12 text-blue-600 mb-5" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Jane Doe',
                role: 'Founder & CEO',
                image: '/images/team/jane.jpg',
              },
              {
                name: 'John Smith',
                role: 'Lead Instructor',
                image: '/images/team/john.jpg',
              },
              {
                name: 'Emily Chen',
                role: 'Community Manager',
                image: '/images/team/emily.jpg',
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                custom={index}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-300"
              >
                <div className="relative inline-block mb-5">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-16 px-6 rounded-3xl overflow-hidden text-center shadow-2xl"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Ready to Transform Your Future?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg mb-8 opacity-90"
            >
              Join over 100,000 learners who’ve unlocked new careers, skills, and confidence through CourseHub.
            </motion.p>
            <motion.a
              href="/courses"
              className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore All Courses
            </motion.a>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;