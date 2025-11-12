'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { useScrollAnimation } from '@/components/useScrollAnimation';
import { useScrollDepthTracking } from '@/lib/useScrollTracking';
import { trackCTAClick, trackPricingInterest, trackFormSubmit, trackFormStart, trackNavigation } from '@/lib/analytics';
import { useIntentTracking } from '@/lib/useIntentTracking';
import { useSessionRecording } from '@/lib/useSessionRecording';
import {
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInFromBottom,
  staggerContainer,
  staggerContainerFast,
  staggerItem,
  pillarVariants,
  badgeBounce,
  headshotZoom
} from '@/components/animations/variants';

export default function Home() {
  useScrollAnimation();
  useScrollDepthTracking(); // Track scroll depth milestones
  const { trackIntent } = useIntentTracking(); // Intent scoring system
  useSessionRecording({ enabled: true }); // Session replay & heatmaps
  const shouldReduceMotion = useReducedMotion();

  // Cycling gradient text animation
  const cyclingPhrases = ['Lead Generation', 'Marketing Automation', 'Closing'];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % cyclingPhrases.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navigation />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center px-6 pt-32 pb-20 bg-gradient-to-br from-black to-gray-900 overflow-hidden">
        {/* Static Background Blob */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-200/10 via-pink-200/10 to-purple-200/10 rounded-full blur-3xl -mr-[400px] -mt-[200px]" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <div className="text-white text-center mb-20">
            {/* Headline */}
            <motion.h1
              initial={!shouldReduceMotion ? { opacity: 0, y: 30 } : {}}
              animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-[clamp(40px,5vw,72px)] font-semibold leading-[1.05] mb-6 mx-auto mt-12"
              style={{
                fontFamily: 'Raveo, Arial, sans-serif',
                letterSpacing: '-0.03em',
                maxWidth: '1000px'
              }}
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-pink-200 to-purple-200">AI Revenue Infrastructure</span> for Predictable Growth
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
              animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-white/70 mb-8 mx-auto leading-relaxed"
              style={{maxWidth: '800px'}}
            >
              We design and deploy the marketing, automation, and sales systems that attract, qualify, and close—without manual effort.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={!shouldReduceMotion ? { opacity: 0, scale: 0.9 } : {}}
              animate={!shouldReduceMotion ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center mb-4"
            >
              <motion.a
                whileHover={!shouldReduceMotion ? { scale: 1.05, y: -2 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                href="#contact"
                onClick={() => {
                  trackCTAClick('Book Your Free Revenue Audit', 'Hero Section', '#contact');
                  trackIntent('CLICKED_BOOK_AUDIT', { location: 'Hero Section' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#EF8354] hover:bg-[#d97446] text-white font-semibold rounded-full hover:shadow-xl hover:shadow-[#EF8354]/30 transition-all"
              >
                Book Your Free Revenue Audit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                href="#solution"
                onClick={() => {
                  trackCTAClick('See How It Works', 'Hero Section', '#solution');
                  trackIntent('VIEWED_SOLUTION', { location: 'Hero CTA' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all"
              >
                See How It Works
              </motion.a>
            </motion.div>
          </div>

          {/* Stats with Counter Animation */}
          <HeroStats />
        </div>
      </section>

      {/* ===== SECTION 1 — THE PROBLEM ===== */}
      <section className="px-6 bg-white" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1000px] mx-auto text-center">
          <motion.h2
            initial={!shouldReduceMotion ? "hidden" : "visible"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-[clamp(40px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em] text-gray-900 mb-8"
          >
            Manual Marketing Doesn't Scale
          </motion.h2>

          <motion.p
            initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
            whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl text-gray-700 leading-relaxed max-w-[800px] mx-auto"
          >
            Disjointed tools, slow follow-ups, and one-off campaigns waste budget and stall growth.
          </motion.p>

          <motion.p
            initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
            whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 leading-relaxed max-w-[800px] mx-auto mt-6"
          >
            We replace that chaos with a connected revenue infrastructure—marketing, automation, analytics, and sales working as one system.
          </motion.p>
        </div>
      </section>

      {/* ===== DIGITAL INFRASTRUCTURE PLATFORM SECTION ===== */}
      <section className="px-6 bg-gradient-to-br from-orange-200 via-pink-100 to-purple-100 relative overflow-hidden" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={!shouldReduceMotion ? "hidden" : "visible"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            {/* Badge */}
            <motion.div
              initial={!shouldReduceMotion ? { opacity: 0, scale: 0.9 } : {}}
              whileInView={!shouldReduceMotion ? { opacity: 1, scale: 1 } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-gray-200 mb-6"
            >
              <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Digital Infrastructure</span>
            </motion.div>

            <h2 className="text-[clamp(40px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em] text-gray-900 mb-6">
              One System. Four Pillars.
            </h2>
            <p className="text-xl text-gray-700 max-w-[700px] mx-auto leading-relaxed">
              You don't need another agency. You need infrastructure that compounds.
            </p>

            {/* Link */}
            <motion.a
              href="#infrastructure"
              onClick={(e) => {
                e.preventDefault();
                trackCTAClick('Explore the Full System', 'Infrastructure Section', '#infrastructure');
                document.getElementById('infrastructure')?.scrollIntoView({ behavior: 'smooth' });
              }}
              initial={!shouldReduceMotion ? { opacity: 0, y: 10 } : {}}
              whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 text-gray-900 font-semibold mt-6 hover:gap-3 transition-all cursor-pointer"
            >
              <span>Explore the Full System</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Radial Visualization Container */}
          <div className="relative" style={{ height: '600px' }}>
            {/* Concentric Circles - Animated Background */}
            <motion.div
              initial={!shouldReduceMotion ? { opacity: 0, scale: 0.8 } : {}}
              whileInView={!shouldReduceMotion ? { opacity: 1, scale: 1 } : {}}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative" style={{ width: '500px', height: '500px' }}>
                {/* Generate concentric circles aligned with features */}
                {[140, 280, 420].map((size, i) => (
                  <motion.div
                    key={i}
                    initial={!shouldReduceMotion ? { scale: 0, opacity: 0 } : {}}
                    whileInView={!shouldReduceMotion ? { scale: 1, opacity: 1 } : {}}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.22, 1, 0.36, 1] as const
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-300/50"
                    style={{ width: `${size}px`, height: `${size}px` }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Center Icon & Text */}
            <motion.div
              initial={!shouldReduceMotion ? { scale: 0, opacity: 0 } : {}}
              whileInView={!shouldReduceMotion ? { scale: 1, opacity: 1 } : {}}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center p-2">
                <Image
                  src="/logo.svg"
                  alt="Guest Digital Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Feature Nodes - Positioned Radially */}
            {[
              { label: 'High-Converting Websites', angle: 0, radius: 210 },
              { label: 'Lead Generation', angle: 45, radius: 210 },
              { label: 'Commission Closers', angle: 90, radius: 210 },
              { label: 'Custom Software', angle: 135, radius: 210 },
              { label: 'AI Integration', angle: 180, radius: 210 },
              { label: 'CRM & Analytics', angle: 225, radius: 210 },
              { label: 'Payment Processing', angle: 270, radius: 210 },
              { label: 'Email Automation', angle: 315, radius: 210 },
            ].map((feature, i) => {
              const x = Math.cos((feature.angle - 90) * Math.PI / 180) * feature.radius;
              const y = Math.sin((feature.angle - 90) * Math.PI / 180) * feature.radius;

              return (
                <motion.div
                  key={i}
                  initial={!shouldReduceMotion ? { opacity: 0, scale: 0.8, x: 0, y: 0 } : {}}
                  whileInView={!shouldReduceMotion ? {
                    opacity: 1,
                    scale: 1,
                    x: x,
                    y: y
                  } : {}}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + (i * 0.1),
                    ease: [0.22, 1, 0.36, 1] as const
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 mb-2 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all">
                      <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200">
                      <span className="text-xs font-semibold text-gray-900 whitespace-nowrap">{feature.label}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Section - Unified Platform */}
          <motion.div
            initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
            whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-block">
              <div className="h-px w-48 bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Unified Digital Platform</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Single source of truth for your business data, customer interactions, and revenue operations.
              </p>
            </div>
          </motion.div>

          {/* Integration Icons */}
          <motion.div
            initial={!shouldReduceMotion ? "hidden" : "visible"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-12"
          >
            {[
              { name: 'Next.js', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
              { name: 'Stripe', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
              { name: 'Mailchimp', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { name: 'Google Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            ].map((integration, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all">
                  <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={integration.icon} />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-900">{integration.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== THE COMPLETE REVENUE INFRASTRUCTURE ===== */}
      <section id="infrastructure" className="px-6 bg-black text-white" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={!shouldReduceMotion ? "hidden" : "visible"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-20 text-center"
          >
            <h2 className="text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              The Complete Revenue Infrastructure
            </h2>
            <p className="text-2xl text-white/80 max-w-[800px] leading-relaxed mx-auto">
              Foundation, Engine, Intelligence, and Execution—four pillars working as one system to drive predictable revenue growth.
            </p>
          </motion.div>

          {/* Scroll-Triggered Infrastructure */}
          <ScrollInfrastructure />

          {/* Bottom CTA */}
          <motion.div
            initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
            whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-white/70 text-xl mb-6">One system. Predictable pipeline. Scalable revenue.</p>
            <motion.a
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
              whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
              href="#pricing"
              onClick={() => trackCTAClick('See Pricing & Packages', 'Infrastructure Section', '#pricing')}
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#EF8354] hover:bg-[#d97446] text-white text-lg font-semibold rounded-full transition-all hover:shadow-2xl hover:shadow-[#EF8354]/30"
            >
              See Pricing & Packages
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>


      {/* ===== CHOOSE YOUR LEVEL ===== */}
      <section id="pricing" className="px-6 bg-white" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={!shouldReduceMotion ? "hidden" : "visible"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            onViewportEnter={() => trackIntent('VIEWED_PRICING', { section: 'Pricing' })}
            className="mb-20 text-center"
          >
            <h2 className="text-[clamp(40px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#2D3142] mb-6">
              Choose Your Level
            </h2>
            <p className="text-xl text-gray-600 max-w-[700px] leading-relaxed mx-auto">
              Start with closers only, or get the full revenue infrastructure. No long-term contracts. Cancel with 30 days' notice.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            initial={!shouldReduceMotion ? "hidden" : "visible"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerFast}
            className="grid md:grid-cols-3 gap-8"
          >
            <PricingCard tier={1} />
            <PricingCard tier={2} featured />
            <PricingCard tier={3} />
          </motion.div>

          <motion.div
            initial={!shouldReduceMotion ? { opacity: 0 } : {}}
            whileInView={!shouldReduceMotion ? { opacity: 1 } : {}}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600">
              Not sure which level is right for you?{' '}
              <a
                href="#contact"
                onClick={() => trackCTAClick('Book a free revenue audit', 'Pricing Section (Inline)', '#contact')}
                className="text-[#EF8354] font-semibold hover:underline"
              >
                Book a free revenue audit
              </a>
              {' '}and we'll recommend the best fit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== REAL CLIENT RESULTS ===== */}
      <section className="px-6 bg-gradient-to-b from-white to-gray-50" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={!shouldReduceMotion ? "hidden" : "visible"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="text-[clamp(40px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#2D3142] mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-[700px] mx-auto">
              Real businesses. Real revenue. Real ROI.
            </p>
          </motion.div>

          {/* Asymmetric Testimonial Grid */}
          <motion.div
            initial={!shouldReduceMotion ? "hidden" : "visible"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <TestimonialCards />
          </motion.div>

          <motion.div
            initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
            whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <motion.a
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
              whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
              href="#contact"
              onClick={() => trackCTAClick('Start Your Growth Story', 'Testimonials Section', '#contact')}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#EF8354] text-white text-lg font-semibold hover:bg-[#d97446] transition-all hover:shadow-2xl hover:shadow-[#EF8354]/30"
            >
              Start Your Growth Story
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
            <p className="text-sm text-gray-500 mt-4">Book a free revenue audit · See how we can help your business</p>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="px-6 bg-white" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1000px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={!shouldReduceMotion ? "hidden" : "visible"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="text-[clamp(40px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#2D3142] mb-6">
              Your Revenue Infrastructure Starts Here
            </h2>
            <p className="text-xl text-gray-600 max-w-[700px] leading-relaxed mx-auto">
              Book a free audit. We'll analyse your current setup, show you where you're losing revenue, and map out your custom infrastructure.
            </p>

            <ContactStats />
          </motion.div>

          {/* Contact Form */}
          <HomeContactForm
            shouldReduceMotion={shouldReduceMotion}
            trackFormStart={trackFormStart}
            trackIntent={trackIntent}
            trackFormSubmit={trackFormSubmit}
            trackCTAClick={trackCTAClick}
          />
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
                href="#contact"
                onClick={() => trackCTAClick('Contact us', 'Footer', '#contact')}
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
                      href="#infrastructure"
                      onClick={() => trackNavigation('Revenue Infrastructure', '#infrastructure', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Revenue Infrastructure
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      onClick={() => trackNavigation('Pricing', '#pricing', 'footer')}
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
                    <a
                      href="#"
                      onClick={() => trackNavigation('For Coaches', '#', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      For Coaches
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => trackNavigation('For SaaS', '#', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      For SaaS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => trackNavigation('For Agencies', '#', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      For Agencies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => trackNavigation('For E-commerce', '#', 'footer')}
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
                      href="#about"
                      onClick={() => trackNavigation('Blog', '#about', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      onClick={() => trackNavigation('Case Studies', '#testimonials', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      onClick={() => trackNavigation('Tutorials', '#about', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={() => trackNavigation('Support', '#contact', 'footer')}
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
                      href="#about"
                      onClick={() => trackNavigation('About Us', '#about', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={() => trackNavigation('Contact', '#contact', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      onClick={() => trackNavigation('Pricing', '#pricing', 'footer')}
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
                      href="#"
                      onClick={() => trackNavigation('Privacy Policy', '#', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => trackNavigation('Terms of Use', '#', 'footer')}
                      className="text-[#b1b1b1] text-sm hover:text-white transition-colors"
                    >
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => trackNavigation('Cookie Policy', '#', 'footer')}
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
    </>
  );
}

// ===== HELPER COMPONENTS =====

// Hero Stats - Static (no counters)
function HeroStats() {
  const shouldReduceMotion = useReducedMotion();
  const stats = [
    { value: '3+', label: 'Flexible Packages' },
    { value: '72hr', label: 'Site Deploy', sub: 'Live in 3 days' },
    { value: '25%+', label: 'Close Rate', sub: 'Trained closers' },
    { value: '2-3x', label: 'ROI Target', sub: 'In 90 days' },
  ];

  return (
    <motion.div
      initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
      animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 1 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-4xl font-semibold text-white mb-2">{stat.value}</div>
          <div className="text-sm text-white/90">{stat.label}</div>
          {stat.sub && <div className="text-xs text-white/70 mt-1">{stat.sub}</div>}
        </div>
      ))}
    </motion.div>
  );
}

// Pillar Cards - Simplified
function PillarCard({ index }: { index: number }) {
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    {
      number: 1,
      label: 'Foundation',
      title: 'High-Converting Websites',
      description: 'Pages that turn clicks into customers—optimized for speed, psychology, and conversions.',
      gradient: 'from-orange-200 via-amber-100 to-yellow-100',
      image: '/analytics_dashboard.png',
      metrics: [
        { value: '28%', label: 'Avg. Conversion' },
        { value: '<1s', label: 'Load Time' }
      ]
    },
    {
      number: 2,
      label: 'Engine',
      title: 'Marketing Automation',
      description: '24/7 lead capture, qualification, and nurturing. Zero manual work required.',
      gradient: 'from-purple-200 via-fuchsia-100 to-pink-100',
      image: '/n8n flow.webp',
      metrics: [
        { value: '24/7', label: 'Lead Response' },
        { value: '20hrs', label: 'Saved/Week' }
      ]
    },
    {
      number: 3,
      label: 'Intelligence',
      title: 'Real-Time Analytics',
      description: 'Know exactly what\'s working. Track every lead, call, and conversion in one place.',
      gradient: 'from-emerald-200 via-teal-100 to-cyan-100',
      image: '[Image: Analytics dashboard with metrics and charts]',
      metrics: [
        { value: '£42', label: 'Cost Per Lead' },
        { value: '3.2x', label: 'Avg. ROI' }
      ]
    },
    {
      number: 4,
      label: 'Execution',
      title: 'Commission-Only Closers',
      description: 'Trained sales team that only gets paid when you get paid. Zero risk, pure results.',
      gradient: 'from-blue-200 via-indigo-100 to-purple-100',
      image: '[Image: Call recordings dashboard or sales performance metrics]',
      metrics: [
        { value: '35%', label: 'Close Rate' },
        { value: '£0', label: 'Fixed Cost' }
      ]
    }
  ];

  const pillar = pillars[index];

  return (
    <motion.div
      initial={!shouldReduceMotion ? pillarVariants[index].hidden : {}}
      whileInView={!shouldReduceMotion ? pillarVariants[index].visible : {}}
      viewport={{ once: true, amount: 0.3 }}
      className={`relative bg-gradient-to-br ${pillar.gradient} rounded-3xl p-8 overflow-hidden`}
    >
      {/* Static Background Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xl">
            {pillar.number}
          </div>
          <span className="text-gray-900 font-semibold uppercase text-sm tracking-wider">{pillar.label}</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">{pillar.description}</p>

        {/* Screenshot Mockup */}
        <motion.div
          initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
          whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          transition={{ delay: pillarVariants[index].visible.transition.delay + 0.3, duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200"
        >
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="bg-gray-800 px-3 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white/50 text-sm px-8 text-center relative overflow-hidden">
              {pillar.image.startsWith('/') ? (
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className={pillar.image.includes('n8n') ? "object-cover" : "object-cover object-top"}
                  style={pillar.image.includes('n8n') ? { transform: 'scale(1.4)' } : undefined}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              ) : (
                <span>{pillar.image}</span>
              )}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {pillar.metrics.map((metric, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-xs text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Pricing Cards
function PricingCard({ tier, featured = false }: { tier: number; featured?: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  const tiers = [
    {
      level: 'Level 1',
      name: 'Closers Only',
      tagline: 'Pure performance. Zero upfront cost.',
      price: '£0',
      priceDetail: 'Setup + 10-20% commission per deal',
      features: [
        '2-4 commission-only closers',
        'Custom sales scripts',
        'Call tracking & recordings',
        'Weekly performance reports'
      ],
      cta: 'Get Started',
      note: 'Perfect if you already have traffic',
      color: '#EF8354',
      borderColor: 'border-gray-200 hover:border-[#EF8354]'
    },
    {
      level: 'Level 2',
      name: 'Infrastructure + Closers',
      tagline: 'Complete system, faster results.',
      price: '£1,500/mo',
      priceDetail: '+ 10-15% commission per deal',
      features: [
        'Everything in Level 1, plus:',
        'Conversion-optimised website',
        'Booking funnels & landing pages',
        'Email & SMS automation',
        'Lead scoring & qualification',
        'Real-time analytics dashboard'
      ],
      cta: 'Get Started',
      note: 'Best for scaling 6-figure businesses',
      color: '#EF8354',
      borderColor: 'border-[#EF8354]'
    },
    {
      level: 'Level 3',
      name: 'Full Revenue Engine',
      tagline: 'Complete system, white-glove service.',
      price: '£2,500/mo',
      priceDetail: '+ 10% commission per deal',
      features: [
        'Everything in Level 2, plus:',
        'Content production (via BBL Studios)',
        '4-6 pieces/week across platforms',
        'Strategic consulting & planning',
        'Weekly optimisation calls',
        'Priority support'
      ],
      cta: 'Apply Now',
      note: 'Limited to 8 clients per quarter',
      color: '#9333ea',
      borderColor: 'border-gray-200 hover:border-purple-600'
    }
  ];

  const tierData = tiers[tier - 1];

  if (featured) {
    return (
      <motion.div
        variants={staggerItem}
        whileHover={!shouldReduceMotion ? { y: -4, boxShadow: "0 25px 50px rgba(239,131,84,0.3)" } : {}}
        className="bg-gradient-to-br from-orange-200 via-pink-100 to-purple-100 border-2 border-orange-300 rounded-2xl p-8 relative transform scale-105 shadow-2xl"
      >
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-4 py-1 rounded-full border-2 border-gray-900">
          MOST POPULAR
        </div>
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">{tierData.level}</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{tierData.name}</h3>
          <p className="text-gray-700">{tierData.tagline}</p>
        </div>
        <div className="mb-6">
          <div className="text-4xl font-bold text-gray-900 mb-1">{tierData.price}</div>
          <div className="text-sm text-gray-600">{tierData.priceDetail}</div>
        </div>
        <ul className="space-y-3 mb-8">
          {tierData.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className={`text-gray-700 ${i === 0 ? 'font-medium' : ''}`}>{feature}</span>
            </li>
          ))}
        </ul>
        <motion.a
          whileHover={!shouldReduceMotion ? { scale: 1.03 } : {}}
          whileTap={!shouldReduceMotion ? { scale: 0.97 } : {}}
          href="#contact"
          onClick={() => trackPricingInterest(tierData.level, 'click_cta')}
          className="block w-full text-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all"
        >
          {tierData.cta}
        </motion.a>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">{tierData.note}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerItem}
      whileHover={!shouldReduceMotion ? { y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" } : {}}
      className={`bg-white border-2 ${tierData.borderColor} rounded-2xl p-8 transition-all`}
    >
      <div className="mb-6">
        <div className={`text-sm font-semibold uppercase tracking-wide mb-2`} style={{ color: tierData.color }}>{tierData.level}</div>
        <h3 className="text-2xl font-bold text-black mb-2">{tierData.name}</h3>
        <p className="text-gray-600">{tierData.tagline}</p>
      </div>
      <div className="mb-6">
        <div className="text-4xl font-bold text-black mb-1">{tierData.price}</div>
        <div className="text-sm text-gray-600">{tierData.priceDetail}</div>
      </div>
      <ul className="space-y-3 mb-8">
        {tierData.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className={`text-gray-700 ${i === 0 ? 'font-medium' : ''}`}>{feature}</span>
          </li>
        ))}
      </ul>
      <motion.a
        whileHover={!shouldReduceMotion ? { scale: 1.03 } : {}}
        whileTap={!shouldReduceMotion ? { scale: 0.97 } : {}}
        href="#contact"
        onClick={() => trackPricingInterest(tierData.level, 'click_cta')}
        className="block w-full text-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all"
      >
        {tierData.cta}
      </motion.a>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">{tierData.note}</span>
      </div>
    </motion.div>
  );
}

// Testimonial Cards
function TestimonialCards() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Large Featured Testimonial - Makeupbyabigail */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -60 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
          }
        }}
        whileHover={!shouldReduceMotion ? { scale: 1.02, transition: { duration: 0.3 } } : {}}
        className="lg:col-span-8 bg-gradient-to-br from-rose-200 via-pink-100 to-purple-100 rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15, y: -20 }}
          whileInView={{ scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Image
            src="/clients/makeupbyabigail/hero.jpg"
            alt="Makeup By Abigail - Professional Bridal Makeup"
            fill
            className="object-cover"
            style={{ objectPosition: '50% 30%' }}
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>
        <div className="relative z-10">
          <div className="flex items-start gap-6 mb-6">
            <motion.div
              variants={headshotZoom}
              className="relative flex-shrink-0"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden relative bg-white p-2">
                <Image
                  src="/clients/makeupbyabigail/logo.png"
                  alt="Makeup By Abigail"
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-xl font-bold">Abigail</h4>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                  Beauty & Wellness
                </div>
              </div>
              <p className="text-white/90 text-sm">Founder, Makeup By Abigail</p>
            </div>
          </div>

          <blockquote className="text-lg leading-relaxed mb-6 text-white">
            "BUILDMYDIGITAL transformed my bridal makeup business. The website brings in qualified leads daily, <span className="font-semibold">SEO got me ranking #1 in my area</span>, and client automation saves me hours every week."
          </blockquote>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold text-white mb-1">#1</div>
              <div className="text-xs text-white/90">Google Ranking</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-xs text-white/90">Lead Generation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold text-white mb-1">10hrs</div>
              <div className="text-xs text-white/90">Saved/Week</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Smaller Testimonials */}
      <SmallTestimonial
        name="Sarah Mitchell"
        title="CEO, CloudSync"
        badge="SaaS"
        quote="Trial-to-paid conversions jumped from 18% to 31% in the first month. The automation handles everything—we barely touch it."
        gradient="from-blue-500 to-cyan-500"
        badgeColor="blue"
        metrics={[
          { value: '+72%', label: 'Conversion Lift' },
          { value: '15hrs', label: 'Saved/Week' }
        ]}
      />
    </>
  );
}

function SmallTestimonial({ name, title, badge, quote, gradient, badgeColor = '', white = true, metrics, image }: any) {
  const shouldReduceMotion = useReducedMotion();

  if (!white) {
    return (
      <motion.div
        variants={staggerItem}
        whileHover={!shouldReduceMotion ? { y: -4, transition: { duration: 0.3 } } : {}}
        className={`lg:col-span-4 bg-gradient-to-br ${gradient} rounded-3xl p-8 text-white`}
      >
        <div className="flex items-start gap-4 mb-6">
          <motion.div variants={headshotZoom} className="relative flex-shrink-0">
            {image ? (
              <div className="w-20 h-20 rounded-xl overflow-hidden relative">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/40 text-xs text-center px-2">
                [Photo: Headshot]
              </div>
            )}
          </motion.div>
          <div>
            <h4 className="text-xl font-bold mb-1">{name}</h4>
            <p className="text-white/80 text-sm mb-2">{title}</p>
            <div className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full inline-block">
              {badge}
            </div>
          </div>
        </div>

        <blockquote className="text-white/95 leading-relaxed mb-6">{quote}</blockquote>

        {metrics.map((metric: any, i: number) => (
          metric.fullWidth ? (
            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-white/80">{metric.label}</div>
            </div>
          ) : null
        ))}
        {!metrics[0].fullWidth && (
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric: any, i: number) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-xs text-white/80">{metric.label}</div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerItem}
      whileHover={!shouldReduceMotion ? { y: -4, transition: { duration: 0.3 } } : {}}
      className={`lg:col-span-4 bg-white border-2 border-gray-200 hover:border-${badgeColor}-500 rounded-3xl p-8 transition-all`}
    >
      <div className="flex items-start gap-4 mb-6">
        <motion.div variants={headshotZoom} className="relative flex-shrink-0">
          {image ? (
            <div className="w-20 h-20 rounded-xl overflow-hidden relative">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          ) : (
            <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white/30 text-xs text-center px-2`}>
              [Photo: Headshot]
            </div>
          )}
        </motion.div>
        <div>
          <h4 className="text-xl font-bold text-black mb-1">{name}</h4>
          <p className="text-gray-600 text-sm mb-2">{title}</p>
          <div className={`px-2 py-1 bg-${badgeColor}-50 text-${badgeColor}-600 text-xs font-semibold rounded-full inline-block`}>
            {badge}
          </div>
        </div>
      </div>

      <blockquote className="text-gray-700 leading-relaxed mb-6">{quote}</blockquote>

      {metrics[0].fullWidth ? (
        <div className={`bg-${badgeColor}-50 rounded-lg p-4`}>
          <div className={`text-3xl font-bold text-${badgeColor}-600 mb-1`}>{metrics[0].value}</div>
          <div className="text-xs text-gray-600">{metrics[0].label}</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric: any, i: number) => (
            <div key={i} className={`bg-${badgeColor}-50 rounded-lg p-3`}>
              <div className={`text-2xl font-bold text-${badgeColor}-600`}>{metric.value}</div>
              <div className="text-xs text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// Contact Stats
function ContactStats() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
      whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-8 flex items-center justify-center gap-12"
    >
      <div className="text-center">
        <div className="text-3xl font-bold text-black mb-1">24hrs</div>
        <div className="text-sm text-gray-600">Response Time</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-black mb-1">100+</div>
        <div className="text-sm text-gray-600">Projects Delivered</div>
      </div>
    </motion.div>
  );
}

// Typewriter Text Component
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

// Scroll-Triggered Infrastructure Component
function ScrollInfrastructure() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const itemRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const pillars = [
    {
      number: 1,
      label: 'Foundation',
      title: 'High-Converting Websites',
      description: 'Pages that turn clicks into customers—optimized for speed, psychology, and conversions.',
      gradient: 'from-orange-200 via-amber-100 to-yellow-100',
      image: '/analytics_dashboard.png',
      metrics: [
        { value: '28%', label: 'Avg. Conversion' },
        { value: '<1s', label: 'Load Time' }
      ]
    },
    {
      number: 2,
      label: 'Engine',
      title: 'Marketing Automation',
      description: '24/7 lead capture, qualification, and nurturing. Zero manual work required.',
      gradient: 'from-purple-200 via-fuchsia-100 to-pink-100',
      image: '/n8n flow.webp',
      metrics: [
        { value: '24/7', label: 'Lead Response' },
        { value: '20hrs', label: 'Saved/Week' }
      ]
    },
    {
      number: 3,
      label: 'Intelligence',
      title: 'Real-Time Analytics',
      description: 'Know exactly what\'s working. Track every lead, call, and conversion in one place.',
      gradient: 'from-emerald-200 via-teal-100 to-cyan-100',
      image: '[Image: Analytics dashboard with metrics and charts]',
      metrics: [
        { value: '£42', label: 'Cost Per Lead' },
        { value: '3.2x', label: 'Avg. ROI' }
      ]
    },
    {
      number: 4,
      label: 'Execution',
      title: 'Commission-Only Closers',
      description: 'Trained sales team that only gets paid when you get paid. Zero risk, pure results.',
      gradient: 'from-blue-200 via-indigo-100 to-purple-100',
      image: '[Image: Call recordings dashboard or sales performance metrics]',
      metrics: [
        { value: '35%', label: 'Close Rate' },
        { value: '£0', label: 'Fixed Cost' }
      ]
    }
  ];

  useEffect(() => {
    const observers = itemRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50% 0px'
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (itemRefs[index].current) {
          observer.unobserve(itemRefs[index].current);
        }
      });
    };
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-2 gap-16">
      {/* Mobile & Desktop - List of Items */}
      <div className="space-y-6 lg:space-y-12">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            ref={itemRefs[index]}
            className={`flex flex-col justify-center ${index === 3 ? 'lg:min-h-[600px]' : 'lg:min-h-[400px]'}`}
          >
            {/* Mobile: Complete card with image inline */}
            <div className="lg:hidden">
              {/* Header & Content */}
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#EF8354] text-white font-bold text-2xl">
                    {pillar.number}
                  </div>
                  <span className="font-semibold uppercase text-sm tracking-wider text-[#EF8354]">
                    {pillar.label}
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-3 text-white">
                  {pillar.title}
                </h3>

                <p className="text-base leading-relaxed mb-4 text-white/90">
                  {pillar.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {pillar.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="rounded-lg p-3 border bg-white/10 border-white/30"
                    >
                      <div className="text-2xl font-bold mb-1 text-white">
                        {metric.value}
                      </div>
                      <div className="text-xs text-white/80">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.a
                  whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                  whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    trackCTAClick(`Learn More - ${pillar.title}`, 'Infrastructure Section', '#');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#EF8354] hover:bg-[#d97446] text-white font-semibold rounded-full transition-all text-sm"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>

              {/* Image Card */}
              <div className={`relative bg-gradient-to-br ${pillar.gradient} rounded-2xl overflow-hidden mt-4 p-4`}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24" />

                {index === 2 && (
                  /* Darker overlay for analytics card */
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-900/50 z-[1]" />
                )}

                {index === 2 ? (
                  /* Real-Time Analytics: Direct image on background */
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {pillar.image.startsWith('/') ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    ) : (
                      <span className="text-white/50 text-xs">{pillar.image}</span>
                    )}
                  </div>
                ) : (
                  /* Other cards: Browser mockup */
                  <div className="relative z-10">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                      <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="bg-gray-800 px-2 py-1.5 flex items-center gap-1.5">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                        </div>
                        <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white/50 text-xs text-center relative overflow-visible">
                          {pillar.image.startsWith('/') ? (
                            <Image
                              src={pillar.image}
                              alt={pillar.title}
                              fill
                              className="object-contain"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          ) : (
                            <span>{pillar.image}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop: Text only (image on right side) */}
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0.4,
                scale: activeIndex === index ? 1 : 0.95
              }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl transition-all duration-300 ${
                    activeIndex === index ? 'bg-[#EF8354] scale-110' : 'bg-white/20'
                  }`}
                >
                  {pillar.number}
                </div>
                <span
                  className={`font-semibold uppercase text-sm tracking-wider transition-all duration-300 ${
                    activeIndex === index ? 'text-[#EF8354]' : 'text-white/60'
                  }`}
                >
                  {pillar.label}
                </span>
              </div>

              <h3
                className={`text-4xl font-bold mb-4 transition-all duration-300 ${
                  activeIndex === index ? 'text-white' : 'text-white/60'
                }`}
              >
                {pillar.title}
              </h3>

              <p
                className={`text-lg leading-relaxed mb-6 transition-all duration-300 ${
                  activeIndex === index ? 'text-white/90' : 'text-white/50'
                }`}
              >
                {pillar.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {pillar.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-4 border transition-all duration-300 ${
                      activeIndex === index
                        ? 'bg-white/10 border-white/30'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div
                      className={`text-3xl font-bold mb-1 transition-all duration-300 ${
                        activeIndex === index ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {metric.value}
                    </div>
                    <div
                      className={`text-sm transition-all duration-300 ${
                        activeIndex === index ? 'text-white/80' : 'text-white/40'
                      }`}
                    >
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.a
                whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  trackCTAClick(`Learn More - ${pillar.title}`, 'Infrastructure Section', '#');
                }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  activeIndex === index
                    ? 'bg-[#EF8354] hover:bg-[#d97446] text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Desktop: Right Side - Sticky Image Card */}
      <div className="relative hidden lg:block">
        <div className="sticky top-32">
          <motion.div
            key={activeIndex}
            initial={!shouldReduceMotion ? { opacity: 0, scale: 0.95 } : {}}
            animate={!shouldReduceMotion ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className={`relative bg-gradient-to-br ${pillars[activeIndex].gradient} rounded-3xl p-8 overflow-hidden h-[600px]`}
          >
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />

            {activeIndex === 2 && (
              /* Darker overlay for analytics card */
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-900/50 z-[1]" />
            )}

            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xl">
                  {pillars[activeIndex].number}
                </div>
                <span className="text-gray-900 font-semibold uppercase text-sm tracking-wider">
                  {pillars[activeIndex].label}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {pillars[activeIndex].title}
              </h3>

              {activeIndex === 2 ? (
                /* Real-Time Analytics: Direct image on background */
                <div className="flex-1 flex items-center justify-center">
                  {pillars[activeIndex].image.startsWith('/') ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={pillars[activeIndex].image}
                        alt={pillars[activeIndex].title}
                        fill
                        className="object-contain"
                        sizes="50vw"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-900/50 text-sm">{pillars[activeIndex].image}</span>
                  )}
                </div>
              ) : (
                /* Other cards: Browser mockup */
                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                  <div className="bg-gray-900 rounded-lg overflow-hidden h-full flex flex-col">
                    <div className="bg-gray-800 px-3 py-2 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white/50 text-sm px-8 text-center relative">
                      {pillars[activeIndex].image.startsWith('/') ? (
                        <Image
                          src={pillars[activeIndex].image}
                          alt={pillars[activeIndex].title}
                          fill
                          className="object-contain"
                          sizes="50vw"
                        />
                      ) : (
                        <span>{pillars[activeIndex].image}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Home page contact form component with Resend integration
function HomeContactForm({
  shouldReduceMotion,
  trackFormStart,
  trackIntent,
  trackFormSubmit,
  trackCTAClick
}: {
  shouldReduceMotion: boolean;
  trackFormStart: (name: string, location: string) => void;
  trackIntent: (action: string, metadata: any) => void;
  trackFormSubmit: (name: string, location: string, success: boolean) => void;
  trackCTAClick: (name: string, location: string, url: string) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission attempt
    trackFormSubmit('Contact Form', 'Contact Section', false);
    trackIntent('SUBMITTED_CONTACT_FORM', { form: 'Contact Form' });

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        trackFormSubmit('Contact Form', 'Contact Section', true);

        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to submit form. Please try again.');
        trackFormSubmit('Contact Form', 'Contact Section', false);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
      trackFormSubmit('Contact Form', 'Contact Section', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={!shouldReduceMotion ? { opacity: 0, y: 40 } : {}}
      whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">Thank you! We'll be in touch within 24 hours.</p>
            <p className="text-sm mt-1">Check your email for a confirmation.</p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{errorMessage}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#EF8354] focus:border-transparent transition-all"
              placeholder="John Smith"
              onFocus={() => {
                trackFormStart('Contact Form', 'Contact Section');
                trackIntent('STARTED_CONTACT_FORM', { form: 'Contact Form' });
              }}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#EF8354] focus:border-transparent transition-all"
              placeholder="john@company.com"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company name (optional)</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#EF8354] focus:border-transparent transition-all"
            placeholder="Your Company Ltd"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your business *</label>
          <textarea
            rows={5}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#EF8354] focus:border-transparent transition-all"
            placeholder="What do you sell? Who are your customers? What's your current monthly revenue?"
            disabled={isSubmitting}
          ></textarea>
        </div>

        <motion.button
          whileHover={!shouldReduceMotion && !isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!shouldReduceMotion && !isSubmitting ? { scale: 0.98 } : {}}
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-8 py-4 bg-[#EF8354] hover:bg-[#d97446] text-white font-semibold rounded-full hover:shadow-xl transition-all ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Book Your Free Revenue Audit'}
        </motion.button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-300 text-center">
        <p className="text-gray-600 mb-4">Or reach out directly</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="mailto:hello@buildmydigital.com"
            onClick={() => trackCTAClick('Email Contact', 'Contact Section', 'mailto:hello@buildmydigital.com')}
            className="flex items-center gap-2 text-[#EF8354] hover:underline font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            hello@buildmydigital.com
          </a>
          <a
            href="https://calendly.com/buildmydigital"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('Book a call (Calendly)', 'Contact Section', 'https://calendly.com/buildmydigital')}
            className="flex items-center gap-2 text-[#EF8354] hover:underline font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book a call
          </a>
        </div>
      </div>
    </motion.div>
  );
}
