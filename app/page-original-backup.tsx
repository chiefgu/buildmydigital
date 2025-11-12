'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { useScrollAnimation } from '@/components/useScrollAnimation';

export default function Home() {
  // PREMIUM: Initialize scroll animations
  useScrollAnimation();

  return (
    <>
      <Navigation />

      {/* Hero Section - Full Navy Background Test */}
      <section className="relative min-h-screen flex items-center px-6 pt-32 pb-20 bg-gradient-to-br from-black to-gray-900 overflow-hidden">
        {/* Decorative Gradient - Full Width */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#EF8354]/20 to-purple-500/20 rounded-full blur-3xl -mr-[400px] -mt-[200px]"></div>

        <div className="max-w-[1200px] mx-auto w-full relative z-10">

          {/* Main Content */}
          <div className="text-white text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Commission-only closers available</span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-[clamp(40px,5vw,72px)] font-bold leading-[1.05] mb-6 mx-auto"
              style={{
                fontFamily: 'Raveo, Arial, sans-serif',
                letterSpacing: '-0.03em',
                maxWidth: '900px'
              }}
            >
              We build, automate, and scale your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF8354] via-pink-400 to-purple-400">
                digital revenue engine
              </span>
            </h1>

            <p className="text-xl text-white/70 mb-8 mx-auto leading-relaxed" style={{maxWidth: '600px'}}>
              The complete infrastructure to run your high-ticket business—without hiring a team.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#EF8354] hover:bg-[#d97446] text-white font-bold rounded-full hover:shadow-2xl hover:shadow-[#EF8354]/50 transition-all hover:scale-105"
              >
                Book a Call
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center fade-in">
              <div className="text-4xl font-bold text-white mb-2 scale-fade">£0</div>
              <div className="text-sm text-white/60">Upfront Cost</div>
            </div>
            <div className="text-center fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold text-white mb-2 scale-fade" style={{animationDelay: '0.1s'}}>24/7</div>
              <div className="text-sm text-white/60">Automation</div>
            </div>
            <div className="text-center fade-in" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold text-white mb-2 scale-fade" style={{animationDelay: '0.2s'}}>2-3x</div>
              <div className="text-sm text-white/60">ROI Target</div>
            </div>
            <div className="text-center fade-in" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold text-white mb-2 scale-fade" style={{animationDelay: '0.3s'}}>100%</div>
              <div className="text-sm text-white/60">Results-Driven</div>
            </div>
          </div>

        </div>
      </section>

      {/* Portfolio Preview Section - With Staggered Animations */}
      <section className="px-6 bg-white" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-medium leading-[1.0] tracking-[-0.03em] text-black mb-4">
              Who we work with
            </h2>
            <p className="text-lg text-gray-600 mx-auto" style={{maxWidth: '700px'}}>
              We partner with coaches, consultants, agencies, SaaS businesses, e-commerce brands, and high-ticket program creators to scale their revenue engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Coaches & Consultants', category: 'High-Ticket Programs', color: 'bg-white border border-gray-200' },
              { title: 'SaaS Companies', category: 'Subscription Growth', color: 'bg-white border border-gray-200' },
              { title: 'E-commerce Brands', category: 'Revenue Scaling', color: 'bg-white border border-gray-200' },
              { title: 'Digital Agencies', category: 'Service Delivery', color: 'bg-white border border-gray-200' },
              { title: 'Fitness & Wellness', category: 'Online Programs', color: 'bg-white border border-gray-200' },
              { title: 'Property & Finance', category: 'Lead Generation', color: 'bg-gradient-to-br from-purple-100 to-pink-100' },
            ].map((item, index) => (
              <div
                key={index}
                className="group aspect-[4/3] rounded-xl overflow-hidden cursor-pointer relative bg-white shadow-sm hover:shadow-md transition-all premium-card fade-in"
              >
                <div className={`w-full h-full ${item.color} flex flex-col justify-end p-8`}>
                  <p className="text-sm font-medium text-gray-600 mb-2">{item.category}</p>
                  <h3 className="text-2xl font-semibold text-black">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center scale-fade">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EF8354] text-white font-medium hover:bg-[#d97446] transition-all hover:scale-105 btn-animate"
            >
              See if we're a fit
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned Bento Box Layout */}
      <section id="services" className="px-6 bg-white" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-medium leading-[1.0] tracking-[-0.03em] text-black mb-4">
              What we do
            </h2>
            <p className="text-lg text-gray-600 mx-auto mb-8" style={{maxWidth: '700px'}}>
              The complete infrastructure to run and scale your high-ticket business—without hiring a team.
            </p>
          </div>

          {/* Bento Box Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">

            {/* Featured: Commission-Only Closers - Spans 4 columns */}
            <div className="md:col-span-4 bg-gradient-to-br from-[#EF8354] to-[#d97446] rounded-lg p-10 text-white shadow-lg hover:shadow-xl transition-all premium-card fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-6">
                  ★ Featured Service
                </div>
                <h3 className="text-[clamp(28px,3vw,36px)] font-bold mb-4 leading-tight">
                  Commission-Only Closers
                </h3>
                <p className="text-[18px] text-white/90 leading-relaxed mb-6 max-w-[600px]">
                  Professional sales team that only gets paid when you do. We handle discovery calls, objections, and closing—you focus on delivery. Zero fixed costs, pure performance.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm">No upfront costs</div>
                  <div className="px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm">Trained closers</div>
                  <div className="px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm">Pay on results</div>
                </div>
              </div>
            </div>

            {/* Automated Systems - Spans 2 columns */}
            <div className="md:col-span-2 bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all premium-card fade-in">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold text-black mb-3">
                Automated Systems
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Automated email sequences, lead scoring, and follow-ups that run 24/7. Your leads get nurtured while you sleep.
              </p>
            </div>

            {/* Content Production - Spans 2 columns */}
            <div className="md:col-span-2 bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all premium-card fade-in">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold text-black mb-3">
                Content Production
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                We film, edit, and post your content across platforms. Show up consistently without spending hours on social media management.
              </p>
            </div>

            {/* Funnels & Websites - Spans 2 columns */}
            <div className="md:col-span-2 bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all premium-card fade-in">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold text-black mb-3">
                Funnels & Websites
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Sales pages, booking funnels, and landing pages that actually convert. Built fast, tested thoroughly, and optimized for your offer.
              </p>
            </div>

            {/* Analytics - Spans 2 columns */}
            <div className="md:col-span-2 bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all premium-card fade-in">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold text-black mb-3">
                Analytics & Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Know exactly where your leads come from, what converts, and what doesn't. Real dashboards with the metrics that matter for your revenue.
              </p>
            </div>

            {/* Strategy - Spans 3 columns, taller card */}
            <div className="md:col-span-3 bg-black text-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all premium-card fade-in">
              <div className="w-12 h-12 bg-white/10 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold mb-3">
                Strategy & Consulting
              </h3>
              <p className="text-white/80 leading-relaxed text-[15px] mb-6">
                Fix your positioning, tighten your offer, and build a growth plan that works. Direct access to operators who've scaled businesses before.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/80 transition-colors">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Full Package CTA - Spans 3 columns */}
            <div className="md:col-span-3 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all premium-card fade-in flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-3">
                  Full Revenue Engine
                </h3>
                <p className="text-white/90 leading-relaxed text-[15px] mb-6">
                  Get everything—closers, marketing, content, websites, and analytics. The complete system to scale from 6 to 7 figures.
                </p>
              </div>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#EF8354] font-semibold rounded-full hover:bg-white/90 transition-all hover:scale-105">
                Book a call
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}

      {/* 1. Commission-Only Closers - Split Layout with Stats */}
      <section id="closers" className="px-6 bg-[#F5F3FF]" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-block px-3 py-1 bg-[#EF8354] hover:bg-[#d97446] text-white rounded-full text-sm font-medium mb-6">
                Commission-Only Closers
              </div>
              <h2 className="text-[48px] font-bold text-black mb-6 leading-tight">
                Sales team that only gets paid when you do
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Stop paying fixed salaries to sales reps who don't deliver. Our commission-only closers are hungry, trained, and only earn when they close deals for you. Zero risk, pure performance.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EF8354]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#EF8354]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Pre-vetted & trained</h3>
                    <p className="text-gray-600">Every closer goes through our rigorous training program and live call assessments before they touch your leads.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EF8354]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#EF8354]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Your offer, their script</h3>
                    <p className="text-gray-600">We customize the pitch to your specific offer, objections, and positioning. It sounds like you, not like us.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EF8354]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#EF8354]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Performance tracking</h3>
                    <p className="text-gray-600">Real-time dashboards showing call volume, show rates, close rates, and revenue generated per closer.</p>
                  </div>
                </div>
              </div>

              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#EF8354] hover:bg-[#d97446] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#EF8354]/30 transition-all hover:scale-105">
                Get a Closer
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Right: Stats Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-4xl font-bold text-black mb-2">£0</div>
                <div className="text-sm text-gray-600">Setup Cost</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-4xl font-bold text-black mb-2">10-20%</div>
                <div className="text-sm text-gray-600">Commission Rate</div>
              </div>
              <div className="bg-[#F5F3FF] rounded-lg p-6">
                <div className="text-4xl font-bold text-black mb-2">48hrs</div>
                <div className="text-sm text-gray-600">First Call Booked</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-4xl font-bold text-black mb-2">35%+</div>
                <div className="text-sm text-gray-600">Avg Close Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automated Systems - Unified Section */}
      <section id="automated-systems" className="relative overflow-hidden bg-white">
        {/* Part 1: Introduction & Benefits - Colored Background */}
        <div className="px-6 bg-white" style={{paddingTop: '120px', paddingBottom: '120px'}}>
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 bg-[#EF8354] text-white rounded-full text-sm font-semibold mb-6">
                Automated Systems
              </div>
              <h2 className="text-[48px] font-bold text-black mb-6 leading-[1.1] tracking-tight">
                Build once.<br />Automate forever.
              </h2>
              <p className="text-xl text-gray-700 mx-auto leading-relaxed max-w-[700px]">
                Stop losing revenue to manual processes. Our automated systems handle your marketing, sales, and operations 24/7.
              </p>
            </div>

            {/* Benefits - Alternating Layout with Large Visuals */}
            <div className="space-y-20">

              {/* Benefit 1: Instant Response - Image Right, Content Left */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full mb-4 border border-[#EF8354]/30">
                    <div className="w-2 h-2 bg-[#EF8354] rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-[#EF8354] uppercase tracking-wider">Lightning Fast</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-black mb-4">Instant Response</h3>
                  <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    Never lose a lead to slow response times. Our automated systems reply to inquiries in seconds—not hours or days. Qualify leads, answer questions, and book calls while your competitors are still checking their inbox.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-[#EF8354]/30">
                      <div className="text-3xl font-bold text-[#EF8354] mb-1">&lt;30s</div>
                      <div className="text-sm text-gray-600">Average Response Time</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-[#EF8354]/30">
                      <div className="text-3xl font-bold text-[#EF8354] mb-1">24/7</div>
                      <div className="text-sm text-gray-600">Always Available</div>
                    </div>
                  </div>
                </div>

                <div className="order-2">
                  {/* Placeholder for Instant Response Illustration */}
                  <div className="relative aspect-[4/3] rounded-lg bg-gradient-to-br from-purple-100 via-pink-100 to-white p-12 border-2 border-[#EF8354]/30/50 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                    <div className="relative h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <svg className="w-28 h-28 mx-auto text-[#EF8354] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">Instant Response Workflow</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefit 2: Save Time - Content Right, Image Left */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  {/* Placeholder for Time Savings Illustration */}
                  <div className="relative aspect-[4/3] rounded-lg bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-12 border-2 border-[#EF8354]/30/50 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                    <div className="relative h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <svg className="w-28 h-28 mx-auto text-[#EF8354] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">Time Savings Dashboard</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full mb-4 border border-[#EF8354]/30">
                    <div className="w-2 h-2 bg-[#EF8354] rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-[#EF8354] uppercase tracking-wider">Efficiency Boost</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-black mb-4">Save 20+ Hours/Week</h3>
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    Stop wasting time on repetitive manual tasks. Our automation handles follow-ups, scheduling, data entry, and lead qualification—freeing you to focus on strategy, growth, and closing deals.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">Zero manual follow-ups</div>
                        <div className="text-gray-600">Automated sequences handle all touchpoints</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">Instant calendar sync</div>
                        <div className="text-gray-600">Calls book automatically without back-and-forth</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">Smart data capture</div>
                        <div className="text-gray-600">Lead information flows directly into your CRM</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Benefit 3: Scale Without Hiring - Image Right, Content Left */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full mb-4 border border-[#EF8354]/30">
                    <div className="w-2 h-2 bg-[#EF8354] rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-[#EF8354] uppercase tracking-wider">Infinite Scale</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-black mb-4">Scale Without Hiring</h3>
                  <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    Handle 10x more leads without expanding your team. While competitors scramble to hire, train, and manage staff, your automated systems work around the clock—no sick days, no turnover, no drama.
                  </p>

                  {/* Comparison Stats */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-[#EF8354]/30">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Typical Team Cost</span>
                        <span className="text-2xl font-bold text-gray-400 line-through">£120k/year</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Automation Cost</span>
                        <span className="text-2xl font-bold text-[#EF8354]">£30k/year</span>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 font-bold">Savings</span>
                          <span className="text-3xl font-bold text-[#EF8354]">£90k+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-2">
                  {/* Placeholder for Scale Illustration */}
                  <div className="relative aspect-[4/3] rounded-lg bg-gradient-to-br from-orange-50 via-red-50 to-white p-12 border-2 border-[#EF8354]/30/50 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-500"></div>
                    <div className="relative h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <svg className="w-28 h-28 mx-auto text-[#EF8354] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">Scalability Metrics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - What do you want to automate? */}
      <ContactSection />

      {/* Marketing Automation Section */}
      <section id="automated-marketing" className="relative px-6 bg-[#FEF3F2] text-gray-900 overflow-hidden" style={{paddingTop: '120px', paddingBottom: '120px'}}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#EF8354]/10 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EF8354]/10 rounded-full blur-3xl opacity-40"></div>

          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 border border-[#EF8354]/30 rounded-full text-sm font-semibold mb-6 text-[#EF8354]">
                How It Works
              </div>
              <h3 className="text-[48px] font-bold mb-6 leading-[1.15] text-black">
                Marketing that runs<br />while you sleep
              </h3>
              <p className="text-xl text-gray-600 mx-auto leading-relaxed max-w-[700px]">
                Our automation systems nurture, qualify, and book calls automatically—24/7, 365 days a year.
              </p>
            </div>

            {/* Feature Grid - Alternating Layout with Image Spaces */}
            <div className="space-y-20">

              {/* Feature 1: Email Sequences - Image Left, Content Right */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  {/* Placeholder for Email Sequences Illustration */}
                  <div className="relative aspect-[4/3] rounded-lg bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-12 border-2 border-purple-100 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
                    <div className="relative h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <svg className="w-28 h-28 mx-auto text-[#EF8354] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">Email Sequences Illustration</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EF8354]/10/80 backdrop-blur-sm rounded-full mb-4 border border-[#EF8354]/30">
                    <div className="w-2 h-2 bg-[#EF8354] rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-[#EF8354] uppercase tracking-wider">Smart Automation</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4 text-black">Email Sequences</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Personalised follow-up sequences that adapt based on opens, clicks, and replies. No cookie-cutter templates—each sequence learns from engagement patterns and optimizes itself over time.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">Behavior-based triggers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">A/B tested subject lines</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">Personalization at scale</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Feature 2: Lead Scoring - Content Left, Image Right */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EF8354]/10/80 backdrop-blur-sm rounded-full mb-4 border border-[#EF8354]/30">
                    <div className="w-2 h-2 bg-[#EF8354] rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-[#EF8354] uppercase tracking-wider">AI-Powered</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4 text-black">Lead Scoring</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    AI ranks your leads by buying intent, so your closers only talk to people ready to purchase. Automatically prioritizes hot leads and nurtures cold ones until they're sales-ready.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">Real-time engagement tracking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">Predictive buying signals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">Automatic segmentation</span>
                    </li>
                  </ul>
                </div>

                <div className="order-2">
                  {/* Placeholder for Lead Scoring Illustration */}
                  <div className="relative aspect-[4/3] rounded-lg bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8 border-2 border-blue-100 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500"></div>
                    <div className="relative h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <svg className="w-24 h-24 mx-auto text-[#EF8354] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">Lead Scoring Dashboard</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3: SMS & WhatsApp - Image Left, Content Right */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  {/* Placeholder for SMS/WhatsApp Illustration */}
                  <div className="relative aspect-[4/3] rounded-lg bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-12 border-2 border-orange-100 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 group-hover:from-orange-500/20 group-hover:to-red-500/20 transition-all duration-500"></div>
                    <div className="relative h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <svg className="w-28 h-28 mx-auto text-[#EF8354] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">Multi-Channel Messaging</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EF8354]/10/80 backdrop-blur-sm rounded-full mb-4 border border-[#EF8354]/30">
                    <div className="w-2 h-2 bg-[#EF8354] rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-[#EF8354] uppercase tracking-wider">Multi-Channel</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4 text-black">SMS & WhatsApp</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Multi-channel outreach that meets leads where they are. Automated but never robotic—messages feel personal and timely, not spammy. Get higher response rates than email alone.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">SMS + WhatsApp integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">Perfect timing algorithms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#EF8354] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">Two-way conversation handling</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
      </section>

      {/* 3. Creative Production - Clean & Premium */}
      <section id="content" className="px-6 bg-white" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-[#EF8354] text-white rounded-full text-sm font-medium mb-6">
              Creative Production
            </div>
            <h2 className="text-[48px] font-bold text-black mb-6 leading-tight">
              Show up everywhere, without lifting a finger
            </h2>
            <p className="text-lg text-gray-600 mx-auto leading-relaxed max-w-[700px]">
              Real humans. Real creative. Ready to deploy across every platform that matters.
            </p>
          </div>

          {/* Main Content Grid - Side by side */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">

            {/* Left: What We Make */}
            <div>
              <h3 className="text-2xl font-bold text-black mb-8">What we make for you</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-[#EF8354] pl-6">
                  <h4 className="font-bold text-black mb-2">Reels & TikToks (9:16)</h4>
                  <p className="text-gray-600 text-sm">Vertical video designed to stop the scroll. Real editing, real hooks, real results.</p>
                </div>
                <div className="border-l-2 border-[#EF8354] pl-6">
                  <h4 className="font-bold text-black mb-2">Instagram & Facebook Feed (1:1, 4:5)</h4>
                  <p className="text-gray-600 text-sm">Square and portrait formats optimized for engagement. Eye-catching visuals that convert.</p>
                </div>
                <div className="border-l-2 border-[#EF8354] pl-6">
                  <h4 className="font-bold text-black mb-2">YouTube & Facebook Wide (16:9)</h4>
                  <p className="text-gray-600 text-sm">Cinematic wide-format for storytelling that holds attention and builds trust.</p>
                </div>
                <div className="border-l-2 border-[#EF8354] pl-6">
                  <h4 className="font-bold text-black mb-2">Google Search & Display Ads</h4>
                  <p className="text-gray-600 text-sm">Copy and creative that captures intent. Headlines that convert clicks to customers.</p>
                </div>
              </div>
            </div>

            {/* Right: How We Make It */}
            <div>
              <h3 className="text-2xl font-bold text-black mb-8">How we make it</h3>

              {/* BBL Studios Callout */}
              <div className="bg-[#2D3142] text-white rounded-lg p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">Creative Partner</p>
                    <p className="text-xl font-bold">BBL Studios</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  We partner with a proven creative studio that's delivered 500+ projects for 50+ premium brands.
                  This isn't outsourced freelancer work—this is a dedicated creative team.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <div className="text-2xl font-bold text-orange-500">95%</div>
                    <div className="text-xs text-gray-400">Retention</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">4-6</div>
                    <div className="text-xs text-gray-400">Pieces/Week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">48hr</div>
                    <div className="text-xs text-gray-400">Turnaround</div>
                  </div>
                </div>
              </div>

              {/* Human Creative Process */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-[#EF8354] uppercase tracking-wider">Human creative, not AI slop</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-[#EF8354]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#EF8354]"></div>
                    </div>
                    <p className="text-gray-700 text-sm"><strong className="text-black">Copywriters</strong> who understand hooks, not algorithms</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-[#EF8354]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#EF8354]"></div>
                    </div>
                    <p className="text-gray-700 text-sm"><strong className="text-black">Editors</strong> who know pacing, rhythm, and storytelling</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-[#EF8354]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#EF8354]"></div>
                    </div>
                    <p className="text-gray-700 text-sm"><strong className="text-black">Designers</strong> who create scroll-stopping visuals</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic pt-4 border-t border-gray-200">
                  AI helps us move faster—but humans make every creative decision. Every frame. Every word. Every pixel.
                </p>
              </div>
            </div>

          </div>

          {/* Creative Work Showcase - Perfect Bento Grid */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-black mb-12 text-center">Creative that converts across every platform</h3>

            {/* Perfect Tiling Bento Grid - No Gaps */}
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 lg:gap-6">

              {/* Row 1 + 2: Large YouTube (7 cols, 2 rows) */}
              <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:row-span-2">
                <div className="relative h-full min-h-[300px] lg:min-h-[400px] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-lg overflow-hidden shadow-xl group cursor-pointer transition-transform hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold mb-2">YouTube & Facebook</h4>
                    <p className="text-white/90 text-sm">16:9 Cinematic Format</p>
                    <div className="mt-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                      Wide-format storytelling
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 1 + 2: Vertical Reels (3 cols, 2 rows) */}
              <div className="col-span-2 md:col-span-4 lg:col-span-3 lg:row-span-2">
                <div className="relative h-full min-h-[300px] lg:min-h-[400px] bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-lg overflow-hidden shadow-xl group cursor-pointer transition-transform hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-center">Reels & TikTok</h4>
                    <p className="text-white/90 text-xs text-center">9:16 Vertical</p>
                    <div className="mt-4 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                      Scroll-stopping
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 1: Instagram Square (2 cols, 1 row) */}
              <div className="col-span-2 md:col-span-4 lg:col-span-2">
                <div className="relative h-full min-h-[150px] lg:min-h-[190px] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 rounded-lg overflow-hidden shadow-xl group cursor-pointer transition-transform hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-center leading-tight">Instagram Feed</h4>
                    <p className="text-white/90 text-xs mt-1">1:1 Square</p>
                  </div>
                </div>
              </div>

              {/* Row 2: Facebook Portrait (2 cols, 1 row) */}
              <div className="col-span-2 md:col-span-4 lg:col-span-2">
                <div className="relative h-full min-h-[150px] lg:min-h-[190px] bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-600 rounded-lg overflow-hidden shadow-xl group cursor-pointer transition-transform hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-center leading-tight">Facebook</h4>
                    <p className="text-white/90 text-xs mt-1">4:5 Portrait</p>
                  </div>
                </div>
              </div>

              {/* Row 3: Google Ads (5 cols, 1 row) */}
              <div className="col-span-4 md:col-span-4 lg:col-span-5">
                <div className="relative h-full min-h-[150px] lg:min-h-[190px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg overflow-hidden shadow-xl group cursor-pointer transition-transform hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-between p-6 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Google Ads</h4>
                        <p className="text-white/70 text-xs">Search & Display</p>
                      </div>
                    </div>
                    <div className="hidden lg:block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium border border-white/20">
                      Copy + Creative
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Instagram Carousel (3 cols, 1 row) */}
              <div className="col-span-4 md:col-span-4 lg:col-span-3">
                <div className="relative h-full min-h-[150px] lg:min-h-[190px] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-lg overflow-hidden shadow-xl group cursor-pointer transition-transform hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white p-4">
                    <div className="flex gap-2 mb-4">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-xl"></div>
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/30 backdrop-blur-sm rounded-xl"></div>
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-xl"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <h4 className="text-sm font-bold">Instagram Carousel</h4>
                    <p className="text-white/90 text-xs">Multi-slide</p>
                  </div>
                </div>
              </div>

              {/* Row 3: LinkedIn (2 cols, 1 row) */}
              <div className="col-span-2 md:col-span-4 lg:col-span-2">
                <div className="relative h-full min-h-[150px] lg:min-h-[190px] bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 rounded-lg overflow-hidden shadow-xl group cursor-pointer transition-transform hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-center leading-tight">LinkedIn</h4>
                    <p className="text-white/90 text-xs mt-1">B2B</p>
                  </div>
                </div>
              </div>

              {/* Row 3: Twitter/X (2 cols, 1 row) */}
              <div className="col-span-2 md:col-span-4 lg:col-span-2">
                <div className="relative h-full min-h-[150px] lg:min-h-[190px] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg overflow-hidden shadow-xl group cursor-pointer transition-transform hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-center leading-tight">Twitter/X</h4>
                    <p className="text-white/90 text-xs mt-1">Threads</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* What You Get */}
          <div className="bg-[#F5F3FF] rounded-lg p-12">
            <h3 className="text-2xl font-bold text-black mb-8 text-center">What you get</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-[#EF8354] mb-2">4-6</div>
                <p className="text-sm font-semibold text-black mb-1">Pieces per week</p>
                <p className="text-xs text-gray-600">Consistent creative output across all your channels</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#EF8354] mb-2">100%</div>
                <p className="text-sm font-semibold text-black mb-1">Platform optimized</p>
                <p className="text-xs text-gray-600">Right format, right specs, right strategy for each platform</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#EF8354] mb-2">48hr</div>
                <p className="text-sm font-semibold text-black mb-1">Turnaround time</p>
                <p className="text-xs text-gray-600">From brief to delivery—fast enough to stay relevant</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#EF8354] mb-2">Full</div>
                <p className="text-sm font-semibold text-black mb-1">Community management</p>
                <p className="text-xs text-gray-600">We handle comments, replies, and engagement</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full hover:shadow-xl transition-all hover:scale-105">
              See the Work
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* 4. Funnels & Websites - Conversion Story */}
      <section id="funnels" className="px-6 bg-white" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 bg-[#EF8354] text-white rounded-full text-sm font-medium mb-6">
              Funnels & Websites
            </div>
            <h2 className="text-[48px] font-bold mb-6 leading-tight">
              Your conversion funnel shouldn't leak revenue
            </h2>
            <p className="text-xl text-gray-600 mx-auto leading-relaxed max-w-[700px]">
              Most businesses lose 70%+ of potential customers because their funnel has holes. We build pages that capture, nurture, and convert.
            </p>
          </div>

          {/* The Problem vs Solution */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">

            {/* Left: The Problem */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What most businesses have</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Slow loading pages</p>
                    <p className="text-sm text-gray-400">53% bounce if load time is over 3 seconds</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Confusing navigation</p>
                    <p className="text-sm text-gray-400">No clear path to purchase or booking</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Generic copy that doesn't sell</p>
                    <p className="text-sm text-gray-400">Doesn't address objections or pain points</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">No mobile optimization</p>
                    <p className="text-sm text-gray-400">70% of traffic on mobile, terrible UX</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-300">
                <p className="text-3xl font-bold text-gray-900 mb-1">2-5%</p>
                <p className="text-sm text-gray-400">Average conversion rate</p>
              </div>
            </div>

            {/* Right: The Solution */}
            <div className="bg-[#EF8354]/10 border border-[#EF8354]/30 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#EF8354] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#EF8354]">What we build for you</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#EF8354]/20 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#EF8354]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Lightning-fast pages</p>
                    <p className="text-sm text-gray-400">Sub-second load times, zero bloat</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#EF8354]/20 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#EF8354]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Single clear CTA</p>
                    <p className="text-sm text-gray-400">One goal, one action, zero confusion</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#EF8354]/20 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#EF8354]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Psychology-driven copy</p>
                    <p className="text-sm text-gray-400">Addresses every objection before it's asked</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#EF8354]/20 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-[#EF8354]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Mobile-first design</p>
                    <p className="text-sm text-gray-400">Looks better on phone than on desktop</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-green-500/30">
                <p className="text-3xl font-bold text-[#EF8354] mb-1">15-35%</p>
                <p className="text-sm text-gray-400">Our average conversion rate</p>
              </div>
            </div>

          </div>

          {/* What We Build */}
          <div className="bg-gray-50 rounded-lg p-12 border border-gray-200">
            <h3 className="text-3xl font-bold text-center mb-12">What we build</h3>

            <div className="grid md:grid-cols-3 gap-8">

              {/* Landing Pages */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#EF8354]/50 shadow-sm transition-all">
                <div className="w-14 h-14 bg-[#EF8354] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Landing Pages</h4>
                <p className="text-gray-600 text-sm mb-4">
                  High-converting pages for product launches, webinars, lead magnets, and offers. Built with proven frameworks like PAS, AIDA, and Hero sections.
                </p>
                <ul className="space-y-2">
                  <li className="text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#EF8354] rounded-full"></div>
                    Above-the-fold optimization
                  </li>
                  <li className="text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#EF8354] rounded-full"></div>
                    Trust signals & social proof
                  </li>
                  <li className="text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#EF8354] rounded-full"></div>
                    A/B testing ready
                  </li>
                </ul>
              </div>

              {/* Booking Funnels */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#EF8354]/50 shadow-sm transition-all">
                <div className="w-14 h-14 bg-[#EF8354] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Booking Funnels</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Frictionless scheduling flows for coaches, consultants, and service businesses. Calendly, Cal.com, or custom integrations.
                </p>
                <ul className="space-y-2">
                  <li className="text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#EF8354] rounded-full"></div>
                    Automatic timezone detection
                  </li>
                  <li className="text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#EF8354] rounded-full"></div>
                    Email & SMS reminders
                  </li>
                  <li className="text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#EF8354] rounded-full"></div>
                    No-show reduction tactics
                  </li>
                </ul>
              </div>

              {/* Payment Pages */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#EF8354]/50 shadow-sm transition-all">
                <div className="w-14 h-14 bg-[#EF8354] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Payment Pages</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Checkout flows that convert. Reduce cart abandonment with smart urgency, trust badges, and one-click purchasing.
                </p>
                <ul className="space-y-2">
                  <li className="text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#EF8354] rounded-full"></div>
                    Stripe, PayPal, Apple/Google Pay
                  </li>
                  <li className="text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#EF8354] rounded-full"></div>
                    Order bumps & upsells
                  </li>
                  <li className="text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#EF8354] rounded-full"></div>
                    Abandoned cart recovery
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#EF8354] text-white font-bold rounded-full hover:shadow-xl transition-all hover:scale-105">
              Build Your Funnel
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* 5. Analytics - Dashboard Style */}
      <section id="analytics" className="px-6 bg-[#F0FDF4]" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-[#EF8354] text-white rounded-full text-sm font-medium mb-6">
              Analytics & Tracking
            </div>
            <h2 className="text-[48px] font-bold text-black mb-6 leading-tight">
              Know exactly what's working
            </h2>
            <p className="text-lg text-gray-700 mx-auto leading-relaxed" style={{maxWidth: '700px'}}>
              Real dashboards, real metrics. See where every lead comes from, what converts, and what to scale.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Lead Sources</div>
              <div className="text-3xl font-bold text-black mb-1">8</div>
              <div className="text-xs text-[#EF8354]">+2 this month</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Conversion Rate</div>
              <div className="text-3xl font-bold text-black mb-1">34%</div>
              <div className="text-xs text-[#EF8354]">+5% vs last month</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Cost Per Lead</div>
              <div className="text-3xl font-bold text-black mb-1">£42</div>
              <div className="text-xs text-[#EF8354]">-£8 vs last month</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Revenue</div>
              <div className="text-3xl font-bold text-black mb-1">£87k</div>
              <div className="text-xs text-[#EF8354]">+32% MoM</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-bold text-black mb-4">Track Everything</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Ad performance by platform</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Landing page conversion rates</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Email sequence performance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Sales call outcomes & recordings</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-bold text-black mb-4">Custom Reports</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Weekly reports delivered to your inbox. See exactly what to double down on and what to cut.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 text-[#EF8354] font-semibold hover:gap-3 transition-all">
                See Sample Report
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Strategy & Consulting - Premium Editorial */}
      {/* 7. Full Revenue Engine - Comprehensive Package */}
      <section id="full-engine" className="px-6 bg-[#FDF2F8]" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-gray-900 rounded-full text-sm font-medium mb-6">
              Full Revenue Engine
            </div>
            <h2 className="text-[48px] font-bold text-black mb-6 leading-tight">
              Everything you need to scale from 6 to 7 figures
            </h2>
            <p className="text-lg text-gray-700 mx-auto leading-relaxed" style={{maxWidth: '700px'}}>
              Stop piecing together freelancers and agencies. Get the complete system: closers, marketing, content, funnels, and analytics—all working together.
            </p>
          </div>

          <div className="bg-white rounded-lg p-12 shadow-xl mb-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">What's Included</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-black">Commission-only sales team</div>
                      <div className="text-gray-600 text-sm">2-4 trained closers handling all your sales calls</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-black">AI marketing automation</div>
                      <div className="text-gray-600 text-sm">Email, SMS, lead scoring, and nurture sequences</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-black">Content production & posting</div>
                      <div className="text-gray-600 text-sm">4-6 pieces per week across all platforms</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-black">Funnels, websites & landing pages</div>
                      <div className="text-gray-600 text-sm">Built, tested, and optimised for conversion</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-black">Analytics & tracking dashboards</div>
                      <div className="text-gray-600 text-sm">Real-time metrics on everything that matters</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-black">Strategic consulting & growth planning</div>
                      <div className="text-gray-600 text-sm">Weekly calls to optimise and scale</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-black mb-6">Investment</h3>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 mb-6">
                  <div className="text-sm text-gray-600 mb-2">Starting at</div>
                  <div className="text-5xl font-bold text-black mb-4">£2,500<span className="text-2xl text-gray-600">/mo</span></div>
                  <div className="text-sm text-gray-600 mb-6">+ commission on closed deals</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>No long-term contracts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>Cancel anytime with 30 days notice</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>ROI guarantee or money back</span>
                    </div>
                  </div>
                </div>

                <a href="#contact" className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-gray-900 font-bold rounded-full hover:shadow-2xl hover:shadow-purple-500/30 transition-all hover:scale-105">
                  Apply for Full Engine
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Limited to 8 clients per quarter
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-black mb-2">2-3 weeks</div>
              <div className="text-gray-600">To full deployment</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">2-3x ROI</div>
              <div className="text-gray-600">Target return in 90 days</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">100%</div>
              <div className="text-gray-600">Performance-aligned</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - With Animations */}
      <section id="testimonials" className="px-6 bg-white" style={{paddingTop: '120px', paddingBottom: '120px'}}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-medium leading-[1.0] tracking-[-0.03em] text-black mb-4">
              What our clients say
            </h2>
            <p className="text-lg text-gray-600 mx-auto" style={{maxWidth: '600px'}}>
              Don't just take our word for it – hear from businesses we've helped transform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-[#F5F3FF] rounded-xl p-8 premium-card fade-in">
              <p className="text-base text-black mb-6 leading-relaxed">
                "BUILDMYDIGITAL transformed our online presence completely. Their strategic approach exceeded all expectations."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full" />
                <div>
                  <p className="font-semibold text-black">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Creative Director</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 premium-card fade-in">
              <p className="text-base text-black mb-6 leading-relaxed">
                "The team delivered beyond what we imagined. Our website now perfectly reflects our brand and generates leads."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full" />
                <div>
                  <p className="font-semibold text-black">Michael Chen</p>
                  <p className="text-sm text-gray-600">Founder, TechFlow</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 premium-card fade-in">
              <p className="text-base text-black mb-6 leading-relaxed">
                "Working with BUILDMYDIGITAL was seamless. They understood our vision and brought it to life with exceptional creativity."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full" />
                <div>
                  <p className="font-semibold text-black">Emma Rodriguez</p>
                  <p className="text-sm text-gray-600">CEO, Bright Ideas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Form - Clean & Direct */}
      <QuickContactForm />

      {/* Footer CTA Section - With Animations */}
      <section className="px-6 bg-black text-white" style={{paddingTop: '100px', paddingBottom: '50px'}}>
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-20">
            {/* Heading */}
            <div className="flex-1">
              <h2 className="text-[clamp(32px,4vw,53px)] font-medium leading-[1.15] mb-2">
                All-in-one agency<span className="font-normal">, one partner</span>
              </h2>
              <p className="text-[clamp(32px,4vw,53px)] font-normal leading-[1.15]">
                for all your <TypewriterText />
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 w-full md:w-auto md:min-w-[385px]">
              <a
                href="#contact"
                className="w-full px-8 py-5 rounded-full bg-white border border-black text-black text-[22px] font-normal text-center hover:bg-gray-100 transition-all hover:scale-105 btn-animate"
              >
                Get started for free
              </a>
              <a
                href="#contact"
                className="w-full px-8 py-5 rounded-full bg-black border border-white text-white text-[22px] font-normal text-center hover:bg-gray-900 transition-all hover:scale-105 btn-animate"
              >
                Contact us
              </a>
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="border-t border-white/10 pt-12 pb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {/* Logo Column */}
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-xl font-semibold mb-6">BUILDMYDIGITAL</h3>
                <div className="flex flex-col gap-2">
                  <a href="https://linkedin.com" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">LinkedIn</a>
                  <a href="https://twitter.com" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Twitter</a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Services</h4>
                <ul className="space-y-3">
                  <li><a href="#services" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Brand Strategy</a></li>
                  <li><a href="#services" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Web Design</a></li>
                  <li><a href="#services" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Development</a></li>
                  <li><a href="#services" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">SEO & Marketing</a></li>
                  <li><a href="#services" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">AI Automation</a></li>
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Solutions</h4>
                <ul className="space-y-3">
                  <li><a href="#work" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">For Agencies</a></li>
                  <li><a href="#work" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">For Startups</a></li>
                  <li><a href="#work" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">For Creatives</a></li>
                  <li><a href="#work" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">For E-commerce</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li><a href="#about" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#testimonials" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Case Studies</a></li>
                  <li><a href="#about" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Tutorials</a></li>
                  <li><a href="#contact" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#about" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#contact" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Terms of Use</a></li>
                  <li><a href="#" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="text-center text-[#b1b1b1] text-sm">
            © 2025 BUILDMYDIGITAL. All rights reserved.
          </div>
        </div>
      </section>
    </>
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

// Quick Contact Form Component - Clean & Direct
function QuickContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add form submission logic here
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="quick-contact" className="relative px-6 bg-[#F5F3FF] overflow-hidden" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#EF8354]/20 to-[#EF8354]/10 rounded-full blur-3xl -mr-[400px] -mt-[200px]"></div>

      <div className="mx-auto w-full relative z-10" style={{ maxWidth: '900px' }}>
        {/* Centered Content */}
        <div className="text-center text-gray-900 mb-12">
          <h2
            className="font-bold leading-[1.05] mb-6"
            style={{
              fontFamily: 'Raveo, Arial, sans-serif',
              letterSpacing: '-0.03em',
              fontSize: 'clamp(40px, 6vw, 64px)',
            }}
          >
            Get in touch
          </h2>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-[600px] mx-auto">
            Ready to scale your revenue? Drop us a message and we'll respond within 24 hours.
          </p>

          {/* Stats Row */}
          <div className="flex flex-row gap-12 justify-center mb-8">
            <div>
              <div className="text-4xl font-bold mb-2">24hrs</div>
              <div className="text-gray-500 text-sm">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-gray-500 text-sm">Projects Delivered</div>
            </div>
          </div>
        </div>

        {/* Elevated White Form Card */}
        <div className="bg-white rounded-lg p-8 md:p-10 shadow-2xl">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#EF8354]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">Message sent!</h3>
              <p className="text-gray-600">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  id="quick-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF8354] focus:border-transparent focus:bg-white transition-all"
                  placeholder="Your name *"
                />
              </div>

              <div>
                <input
                  type="email"
                  id="quick-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF8354] focus:border-transparent focus:bg-white transition-all"
                  placeholder="Email address *"
                />
              </div>

              <div>
                <input
                  type="text"
                  id="quick-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF8354] focus:border-transparent focus:bg-white transition-all"
                  placeholder="Company name (optional)"
                />
              </div>

              <div>
                <textarea
                  id="quick-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF8354] focus:border-transparent focus:bg-white transition-all resize-none"
                  placeholder="Tell us about your project... *"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-[#EF8354] hover:bg-[#d97446] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#EF8354]/30 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </span>
              </button>
            </form>
          )}

          {/* Alternative Contact Methods */}
          {!isSuccess && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-center text-sm text-gray-500 mb-4">Or reach out directly</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hello@buildmydigital.com"
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#EF8354] transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@buildmydigital.com
                </a>
                <a
                  href="https://calendly.com/buildmydigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#EF8354] transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a call
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Contact Section Component with Two-Step Form
function ContactSection() {
  const [step, setStep] = useState<1 | 2>(1);
  const [automationQuery, setAutomationQuery] = useState('');

  const handleEnquire = () => {
    if (automationQuery.trim()) {
      setStep(2);
    }
  };

  const fillSuggestion = (text: string) => {
    setAutomationQuery(text);
  };

  return (
    <section id="contact" className="px-6 bg-white" style={{paddingTop: '120px', paddingBottom: '120px'}}>
      <div className="max-w-[900px] mx-auto">
        {step === 1 ? (
          <>
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 bg-[#EF8354] text-white rounded-full text-sm font-semibold mb-6">
                Let's Talk Automation
              </div>
              <h2 className="text-[clamp(40px,6vw,56px)] font-medium leading-[1.0] tracking-tight text-black mb-6">
                What do you want<br />to automate?
              </h2>
              <p className="text-lg text-gray-600 max-w-[650px] mx-auto leading-relaxed">
                Tell us about your workflow challenges and we'll show you how our systems can solve them—automatically.
              </p>
            </div>

            {/* Suggestion Chips */}
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-500 mb-4">Common automation requests:</p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:text-[#EF8354] transition-all"
                  onClick={() => fillSuggestion('We spend 10+ hours per week manually following up with leads via email. Can this be automated?')}
                >
                  Lead follow-ups
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:text-[#EF8354] transition-all"
                  onClick={() => fillSuggestion('Our sales team spends too much time on discovery calls with unqualified leads. How can AI help pre-qualify?')}
                >
                  Lead qualification
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:text-[#EF8354] transition-all"
                  onClick={() => fillSuggestion('We create content but struggle to post consistently across platforms. Can AI handle scheduling and posting?')}
                >
                  Content scheduling
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:text-[#EF8354] transition-all"
                  onClick={() => fillSuggestion('I need to track which marketing channels actually generate revenue, but our data is scattered. Help?')}
                >
                  Marketing attribution
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:text-[#EF8354] transition-all"
                  onClick={() => fillSuggestion('Our customer onboarding process is manual and takes days. Can AI streamline this?')}
                >
                  Customer onboarding
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:text-[#EF8354] transition-all"
                  onClick={() => fillSuggestion('We lose deals because we respond to inquiries too slowly. How can we automate instant responses while staying personal?')}
                >
                  Instant responses
                </button>
              </div>
            </div>

            {/* Prompt-Style Input Box */}
            <div className="bg-white rounded-lg shadow-2xl shadow-purple-100/50 border-2 border-gray-100 overflow-hidden">
              <div className="p-6">
                <textarea
                  value={automationQuery}
                  onChange={(e) => setAutomationQuery(e.target.value)}
                  rows={7}
                  className="w-full resize-none focus:outline-none text-gray-900 placeholder-gray-400 text-base leading-relaxed"
                  placeholder="Describe what you want to automate... Be as specific as you like. For example: 'We manually send follow-up emails to leads who download our PDF. This takes 2 hours daily and leads often slip through the cracks.'"
                />
              </div>

              {/* Bottom Bar */}
              <div className="border-t-2 border-gray-100 px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-purple-50/30">
                <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                <button
                  onClick={handleEnquire}
                  disabled={!automationQuery.trim()}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#EF8354] text-white rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Send Enquiry
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contact Info Below */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4">Or reach out directly</p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="mailto:hello@buildmydigital.com" className="text-gray-700 hover:text-black transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@buildmydigital.com
                </a>
                <a href="https://calendly.com/buildmydigital" className="text-gray-700 hover:text-black transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a call
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: Contact Details */}
            <div className="text-center mb-12">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <h2 className="text-[48px] font-medium leading-[1.0] tracking-[-0.03em] text-black mb-4">
                Your details
              </h2>
              <p className="text-lg text-gray-600 max-w-[600px] mx-auto">
                We'll get back to you within 24 hours with a custom automation plan.
              </p>
            </div>

            {/* Summary of Step 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 mb-8">
              <p className="text-sm font-medium text-gray-700 mb-2">Your automation request:</p>
              <p className="text-gray-900 leading-relaxed">{automationQuery}</p>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <form className="p-6 space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                    placeholder="https://yourcompany.com"
                  />
                </div>

                <div>
                  <label htmlFor="social" className="block text-sm font-medium text-gray-700 mb-2">
                    Social media (LinkedIn, Instagram, etc.)
                  </label>
                  <input
                    type="text"
                    id="social"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                    placeholder="@yourcompany or link to profile"
                  />
                </div>
              </form>

              {/* Bottom Bar - matching step 1's style */}
              <div className="border-t border-gray-200 p-4 flex items-center justify-end bg-gray-50">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all"
                >
                  Submit Enquiry
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
