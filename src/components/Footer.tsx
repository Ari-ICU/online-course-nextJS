"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      color: "#60a5fa",
      transition: { duration: 0.2, ease: "easeInOut" as const },
    },
  };

  const socialVariants = {
    hover: {
      y: -2,
      scale: 1.1,
      transition: { type: "spring" as const, stiffness: 300 }, // Added 'as const' here
    },
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 text-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-10 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-3xl font-extrabold tracking-tight">
              Course<span className="text-blue-400">Hub</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Empowering learners worldwide with expert-led courses in tech,
              design, and business.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  href: "https://twitter.com/coursehub",
                  icon: Twitter,
                  label: "Twitter",
                },
                {
                  href: "https://facebook.com/coursehub",
                  icon: Facebook,
                  label: "Facebook",
                },
                {
                  href: "https://instagram.com/coursehub",
                  icon: Instagram,
                  label: "Instagram",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300"
                  aria-label={`Follow us on ${social.label}`}
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Courses */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-5 text-gray-100">
              Popular Courses
            </h4>
            <ul className="space-y-3">
              {[
                {
                  name: "Web Development",
                  href: "/courses?category=Web+Development",
                },
                {
                  name: "Data Science",
                  href: "/courses?category=Data+Science",
                },
                {
                  name: "Mobile Apps",
                  href: "/courses?category=Mobile+Development",
                },
                { name: "UI/UX Design", href: "/courses?category=Design" },
                {
                  name: "Business Analytics",
                  href: "/courses?category=Business",
                },
              ].map((item) => (
                <li key={item.name}>
                  <motion.div variants={linkVariants} whileHover="hover">
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-blue-400 block text-sm transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-5 text-gray-100">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Blog", href: "/blog" },
                { name: "Press", href: "/press" },
                { name: "Partners", href: "/partners" },
              ].map((item) => (
                <li key={item.name}>
                  <motion.div variants={linkVariants} whileHover="hover">
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-blue-400 block text-sm transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support & Newsletter */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-5 text-gray-100">
                Support
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Help Center", href: "/help" },
                  { name: "Contact Us", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <motion.div variants={linkVariants} whileHover="hover">
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-blue-400 block text-sm transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-lg font-semibold text-gray-100 mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Get course alerts, tips, and exclusive offers.
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
                  aria-label="Email for newsletter"
                />
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center text-sm font-medium shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  {subscribed ? "Subscribed!" : "Join"}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider & Copyright */}
        <motion.div
          className="border-t border-gray-800 p-4"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-white font-medium">CourseHub</span>. All
              rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
