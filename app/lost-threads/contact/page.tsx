'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ContactPage() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to an API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="pt-[120px] pb-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question, feedback, or just want to say hi? We'd love to hear
            from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={fadeInUp}>
                <label className="block font-bold uppercase tracking-wider text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 focus:outline-none focus:border-black transition-colors"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className="block font-bold uppercase tracking-wider text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 focus:outline-none focus:border-black transition-colors"
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className="block font-bold uppercase tracking-wider text-sm mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 focus:outline-none focus:border-black transition-colors bg-white"
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="shipping">Shipping & Returns</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className="block font-bold uppercase tracking-wider text-sm mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 border-2 border-gray-200 focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </motion.div>

              <motion.button
                variants={fadeInUp}
                type="submit"
                disabled={submitted}
                className="w-full bg-orange-500 text-white py-5 text-lg font-bold uppercase tracking-wider hover:bg-orange-600 transition-all duration-300 disabled:bg-green-600 disabled:cursor-not-allowed"
              >
                {submitted ? '✓ Message Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold mb-6 uppercase">
                Other Ways to Reach Us
              </h3>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-gray-50 p-8 border border-gray-200"
            >
              <h4 className="font-bold uppercase tracking-wider text-sm mb-3">
                Email
              </h4>
              <a
                href="mailto:hello@lostthreads.co.uk"
                className="text-xl font-bold hover:text-orange-500 transition-colors"
              >
                hello@lostthreads.co.uk
              </a>
              <p className="text-sm text-gray-600 mt-2">
                We typically respond within 24 hours
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-gray-50 p-8 border border-gray-200"
            >
              <h4 className="font-bold uppercase tracking-wider text-sm mb-3">
                Social Media
              </h4>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-lg font-bold hover:text-orange-500 transition-colors"
                >
                  Instagram @lostthreads
                </a>
                <a
                  href="#"
                  className="block text-lg font-bold hover:text-orange-500 transition-colors"
                >
                  Twitter @lostthreads
                </a>
                <a
                  href="#"
                  className="block text-lg font-bold hover:text-orange-500 transition-colors"
                >
                  TikTok @lostthreads
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-black text-white p-8"
            >
              <h4 className="font-bold uppercase tracking-wider text-sm mb-3">
                Customer Service Hours
              </h4>
              <div className="space-y-2 text-sm">
                <p>Monday - Friday: 9am - 6pm GMT</p>
                <p>Saturday: 10am - 4pm GMT</p>
                <p>Sunday: Closed</p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-blue-50 p-8 border border-blue-200"
            >
              <h4 className="font-bold uppercase tracking-wider text-sm mb-3 text-blue-900">
                Order Support
              </h4>
              <p className="text-sm text-blue-800">
                For order-specific inquiries, please include your order number
                in your message for faster assistance.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Link */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-24"
        >
          <h3 className="text-2xl font-bold mb-4 uppercase">
            Looking for Quick Answers?
          </h3>
          <p className="text-gray-600 mb-6">
            Check out our FAQ page for answers to common questions about
            shipping, returns, sizing, and more.
          </p>
          <a
            href="#"
            className="inline-block text-black font-bold underline hover:no-underline"
          >
            Visit FAQ →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
