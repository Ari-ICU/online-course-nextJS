"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleLinkClick = () => setIsMenuOpen(false);

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -15 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, duration: 0.25, ease: "easeOut" as const },
    }),
  };

  const desktopNavItems = [
    "Home",
    "Courses",
    "About",
    "Contact",
    "My Learning",
  ];
  const mobileNavItems = [...desktopNavItems, "Log in", "Sign up"];

  const getHref = (item: string) =>
    item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <>
      <style jsx>{`
        header {
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .logo:hover {
          background: linear-gradient(to right, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .nav-link:hover {
          color: #2563eb;
          transform: translateY(-1px);
        }
        .active-nav {
          position: relative;
        }
        .active-nav::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #2563eb, #7c3aed);
        }
        .auth-button {
          transition: all 0.2s ease;
        }
        .auth-button:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .mobile-menu {
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
      `}</style>
      <header className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="logo text-2xl sm:text-3xl font-extrabold tracking-tight transition-all duration-300"
                onClick={handleLinkClick}
              >
                Course<span className="text-blue-600">Hub</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {desktopNavItems.map((item) => {
                const href = getHref(item);
                const isActive = pathname === href;
                return (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={href}
                      className={`nav-link text-base font-medium transition-all duration-200 ${
                        isActive ? "active-nav text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {item}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/login"
                  className="auth-button text-gray-700 text-base font-medium px-4 py-2 rounded-lg hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Log in
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/register"
                  className="auth-button bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-medium px-5 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign up
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-menu"
                className="mobile-menu md:hidden border-t border-gray-100"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="px-4 pt-4 pb-6 space-y-2">
                  {mobileNavItems.map((item, index) => {
                    const href = getHref(item);
                    const isActive = pathname === href;
                    return (
                      <motion.div
                        key={item}
                        custom={index}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <Link
                          href={href}
                          onClick={handleLinkClick}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                            item === "Sign up"
                              ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-center"
                              : isActive
                              ? "text-blue-600 bg-gray-50"
                              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                          }`}
                        >
                          {item}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};

export default Header;
