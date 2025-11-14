'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { trackCTAClick, trackNavigation } from '@/lib/analytics';

// TypewriterText Component
function TypewriterText() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = [
    'automation needs',
    'creative needs',
    'marketing needs',
    'content needs',
    'design needs',
    'sales needs',
    'growth needs'
  ];

  useEffect(() => {
    const handleType = () => {
      const currentWordIndex = loopNum % words.length;
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(currentWord.substring(0, text.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <span className="inline-block min-w-[280px] text-left">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function CoachesPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-100" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-300/20 via-amber-200/20 to-yellow-200/20 rounded-full blur-3xl -mr-[300px] -mt-[150px]" />

        <div className="relative max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={!shouldReduceMotion ? { opacity: 0, y: 10 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block bg-orange-500/10 text-orange-900 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6"
            >
              For Coaches & Consultants
            </motion.div>

            <h1
              className="text-[clamp(48px,6vw,80px)] leading-[1.05] font-bold text-gray-900 mb-6"
              style={{
                fontFamily: 'Raveo, Arial, sans-serif',
                letterSpacing: '-0.03em'
              }}
            >
              Automate Your Client Pipeline.{' '}
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-transparent bg-clip-text">
                Scale Without More Ad Spend.
              </span>
            </h1>

            <p className="text-xl text-gray-700 mb-10 max-w-3xl leading-relaxed">
              BuildMyDigital creates AI-driven funnels, automation, and closing systems that consistently book, qualify, and convert high-ticket clients.
            </p>

            <motion.div
              initial={!shouldReduceMotion ? { opacity: 0, y: 10 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#EF8354] text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-[#d97446] transition-all hover:scale-105 hover:shadow-xl"
              >
                Book Your Free Revenue Audit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
            whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-rose-200 via-pink-100 to-purple-100 rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24" />

              <div className="relative">
                <h2 className="text-[clamp(40px,5vw,64px)] font-bold text-gray-900 mb-8 text-center">
                  The Real Problem
                </h2>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
                  <p className="text-2xl text-gray-900 font-semibold mb-6 leading-relaxed">
                    You're spending hours chasing leads, handling no-shows, and guessing why calls don't close.
                  </p>

                  <p className="text-xl text-gray-700 leading-relaxed">
                    The truth: <span className="font-bold text-gray-900">your funnel leaks more than it converts</span> — and manual follow-ups can't scale.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section style={{ paddingTop: '120px', paddingBottom: '120px' }} className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
            whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-[clamp(40px,5vw,64px)] font-bold text-gray-900 mb-6">
                The AI Revenue Infrastructure
              </h2>
              <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
                For Coaches & Consultants
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
              {[
                {
                  title: 'Automated Booking & Reminders',
                  description: 'Eliminates no-shows with intelligent scheduling and multi-channel reminders',
                  gradient: 'from-blue-200 via-cyan-100 to-teal-100',
                },
                {
                  title: 'Lead Scoring System',
                  description: 'AI prioritises qualified buyers so you focus on calls that close',
                  gradient: 'from-purple-200 via-fuchsia-100 to-pink-100',
                },
                {
                  title: 'Commission-Only Closers',
                  description: 'Expert closers turn qualified calls into cash with zero upfront cost',
                  gradient: 'from-orange-200 via-amber-100 to-yellow-100',
                },
                {
                  title: 'Real-Time Dashboard',
                  description: 'Track every conversion, attribution, and revenue metric in one place',
                  gradient: 'from-rose-200 via-pink-100 to-purple-100',
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
                  whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`bg-gradient-to-br ${feature.gradient} rounded-3xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform`}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                    <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-700">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Results Banner */}
            <motion.div
              initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
              whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900 rounded-3xl p-12 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#EF8354]/20 rounded-full blur-3xl -mr-32 -mt-32" />

              <div className="relative">
                <p className="text-white/80 text-lg mb-6 font-semibold uppercase tracking-wider">
                  Proven Results
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">+47%</div>
                    <div className="text-white/70 text-lg">Booking Rate</div>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">35%</div>
                    <div className="text-white/70 text-lg">Close Rate</div>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">0</div>
                    <div className="text-white/70 text-lg">Manual Follow-Up</div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-[#EF8354] text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-[#d97446] transition-all hover:scale-105"
                >
                  Book Your Free Audit
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER CTA WITH TYPEWRITER ===== */}
      <section className="px-6 bg-black text-white" style={{paddingTop: '100px', paddingBottom: '50px'}}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-20">
            {/* Heading */}
            <div className="lg:col-span-2">
              <h2 className="text-[clamp(32px,4vw,48px)] font-medium leading-[1.15] mb-2">
                All-in-one agency<span className="font-normal">, one partner</span>
              </h2>
              <p className="text-[clamp(32px,4vw,48px)] font-normal leading-[1.15]">
                for all your <TypewriterText />
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 lg:col-span-1 lg:justify-self-end w-full lg:w-auto lg:min-w-[385px]">
              <motion.a
                whileHover={!shouldReduceMotion ? { scale: 1.02 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                href="#contact"
                onClick={() => trackCTAClick('Get started for free', 'Footer', '#contact')}
                className="w-full px-8 py-4 rounded-full bg-white border border-black text-black text-[22px] font-normal text-center hover:bg-gray-100 transition-all"
              >
                Get started for free
              </motion.a>
              <motion.a
                whileHover={!shouldReduceMotion ? { scale: 1.02 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                href="/contact"
                onClick={() => trackCTAClick('Contact us', 'Footer', '/contact')}
                className="w-full px-8 py-4 rounded-full bg-black border border-white text-white text-[22px] font-normal text-center hover:bg-gray-900 transition-all"
              >
                Contact us
              </motion.a>
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="border-t border-white/10 pt-12 pb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {/* Logo Column */}
              <div className="col-span-2 md:col-span-1">
                <div className="mb-6">
                  <div className="bg-white/10 rounded-xl p-2 inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="white" className="h-[40px] w-[40px]">
                      <rect x="10" y="60" width="30" height="30"/>
                      <rect x="35" y="35" width="30" height="30"/>
                      <rect x="60" y="10" width="30" height="30"/>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://linkedin.com"
                    onClick={() => trackNavigation('LinkedIn', 'https://linkedin.com', 'footer')}
                    className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com"
                    onClick={() => trackNavigation('Twitter', 'https://twitter.com', 'footer')}
                    className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Services</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/#infrastructure"
                      onClick={() => trackNavigation('Revenue Infrastructure', '/#infrastructure', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Revenue Infrastructure
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#pricing"
                      onClick={() => trackNavigation('Pricing', '/#pricing', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Solutions</h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/coaches"
                      onClick={() => trackNavigation('For Coaches', '/coaches', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      For Coaches
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/#"
                      onClick={() => trackNavigation('For SaaS', '/#', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      For SaaS
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#"
                      onClick={() => trackNavigation('For Agencies', '/#', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      For Agencies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#"
                      onClick={() => trackNavigation('For E-commerce', '/#', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      For E-commerce
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/#about"
                      onClick={() => trackNavigation('Blog', '/#about', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#testimonials"
                      onClick={() => trackNavigation('Case Studies', '/#testimonials', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#about"
                      onClick={() => trackNavigation('Tutorials', '/#about', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      onClick={() => trackNavigation('Support', '/contact', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Company</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/#about"
                      onClick={() => trackNavigation('About Us', '/#about', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      onClick={() => trackNavigation('Contact', '/contact', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#pricing"
                      onClick={() => trackNavigation('Pricing', '/#pricing', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/#"
                      onClick={() => trackNavigation('Privacy Policy', '/#', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#"
                      onClick={() => trackNavigation('Terms of Use', '/#', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#"
                      onClick={() => trackNavigation('Cookie Policy', '/#', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/60 text-sm text-center">
              © 2025 BUILDMYDIGITAL. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
