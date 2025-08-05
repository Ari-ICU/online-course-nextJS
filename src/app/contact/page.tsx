"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFormErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormStatus("submitting");

    try {
      const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!;
      const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!;

      const message = `
        *New Contact Form Submission*:
          - *Name*: ${formData.name}
          - *Email*: ${formData.email}
          - *Message*: ${formData.message}
      `;

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      if (!response.ok) throw new Error("Telegram API failed");

      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (error) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  // Animation variants with explicit typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 } as Transition,
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" } as Transition,
    },
  };

  const statusVariants: Variants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3 } as Transition,
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 } as Transition,
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4"
          >
            Get in Touch with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              CourseHub
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Have questions about our courses or need support? We're here to
            help! Reach out via the form or contact us directly.
          </motion.p>
        </motion.section>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={itemVariants}
            className="space-y-6 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Send Us a Message
            </h2>

            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-800"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  formErrors.name
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter your full name"
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? "name-error" : undefined}
              />
              {formErrors.name && (
                <p id="name-error" className="text-sm text-red-500 mt-1">
                  {formErrors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  formErrors.email
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="you@example.com"
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
              {formErrors.email && (
                <p id="email-error" className="text-sm text-red-500 mt-1">
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-800"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${
                  formErrors.message
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Ask about courses, pricing, or anything else..."
                aria-invalid={!!formErrors.message}
                aria-describedby={
                  formErrors.message ? "message-error" : undefined
                }
              />
              {formErrors.message && (
                <p id="message-error" className="text-sm text-red-500 mt-1">
                  {formErrors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={formStatus === "submitting"}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                formStatus === "submitting"
                  ? "bg-blue-400 cursor-not-allowed opacity-80"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg"
              }`}
            >
              <Send className="w-5 h-5 mr-2" />
              {formStatus === "submitting" ? "Sending..." : "Send Message"}
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {formStatus === "success" && (
                <motion.div
                  variants={statusVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-4 p-4 bg-green-100 border border-green-200 text-green-800 rounded-xl flex items-center shadow-sm"
                >
                  <svg
                    className="w-5 h-5 mr-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Message sent successfully! We’ll get back to you soon.
                </motion.div>
              )}
              {formStatus === "error" && (
                <motion.div
                  variants={statusVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-4 p-4 bg-red-100 border border-red-200 text-red-800 rounded-xl flex items-center shadow-sm"
                >
                  <svg
                    className="w-5 h-5 mr-2 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Failed to send message. Please try again later.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Contact Info</h2>
            <div className="space-y-8">
              {/* Email */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start p-5 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <Mail className="w-7 h-7 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <a
                    href="mailto:support@coursehub.com"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    support@coursehub.com
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start p-5 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <Phone className="w-7 h-7 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start p-5 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <MapPin className="w-7 h-7 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    123 Learning Lane, Education City, EC 12345
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-5">
                {[
                  {
                    name: "Twitter",
                    href: "https://twitter.com/coursehub",
                    icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                  },
                  {
                    name: "LinkedIn",
                    href: "https://linkedin.com/company/coursehub",
                    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 5a2 2 0 110 4 2 2 0 010-4z",
                  },
                  {
                    name: "Instagram",
                    href: "https://instagram.com/coursehub",
                    icon: "M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5zM8.5 15.5v-6l6 3-6 3z",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-gray-500 hover:text-blue-600 transition-colors duration-200 transform hover:scale-110"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;