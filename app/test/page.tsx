'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function TestPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  const megaMenuContent = {
    'Services': {
      sections: [
        {
          title: 'Acquisition',
          items: [
            { name: 'High-Converting Websites', description: 'Built to turn traffic into revenue' },
            { name: 'Lead Magnets', description: 'Capture & qualify prospects' },
            { name: 'Landing Pages', description: 'Optimised for conversions' }
          ]
        },
        {
          title: 'Nurturing',
          items: [
            { name: 'Email Sequences', description: 'Automated follow-up systems' },
            { name: 'CRM Setup', description: 'Track every lead & touchpoint' },
            { name: 'Booking Systems', description: 'Seamless calendar integration' }
          ]
        },
        {
          title: 'Execution',
          items: [
            { name: 'Outbound Closers', description: 'Commission-only sales team' },
            { name: 'Call Scripts', description: 'Proven conversion frameworks' },
            { name: 'Performance Tracking', description: 'Real-time analytics' }
          ]
        }
      ]
    },
    'Work': {
      sections: [
        {
          title: 'Case Studies',
          items: [
            { name: 'SaaS Businesses', description: '3x pipeline in 8 weeks' },
            { name: 'Coaches & Consultants', description: '£40k saved on ad spend' },
            { name: 'Property Companies', description: '£2.4M deal from automation' }
          ]
        },
        {
          title: 'Industries',
          items: [
            { name: 'B2B SaaS', description: 'Enterprise sales automation' },
            { name: 'Coaching', description: 'High-ticket client acquisition' },
            { name: 'E-commerce', description: 'Revenue optimisation' }
          ]
        }
      ]
    },
    'About': {
      sections: [
        {
          title: 'Company',
          items: [
            { name: 'Our Story', description: 'Built by founders, for founders' },
            { name: 'How We Work', description: 'Performance-based approach' },
            { name: 'Pricing', description: 'Transparent, results-driven' }
          ]
        },
        {
          title: 'Resources',
          items: [
            { name: 'Blog', description: 'Growth strategies & insights' },
            { name: 'Free Audit', description: 'See where you\'re losing revenue' },
            { name: 'Book a Call', description: 'Speak with our team' }
          ]
        }
      ]
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        @media (min-width: 1024px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }

        .mega-menu-enter {
          opacity: 0;
          transform: translateY(-10px);
        }

        .mega-menu-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
      `}} />

      {/* ===== ANNOUNCEMENT BAR ===== */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
            style={{
              backgroundColor: '#4A3C4A',
              color: '#FFFFFF'
            }}
          >
            <div className="mx-auto px-4" style={{ maxWidth: '1220px' }}>
              <div className="flex items-center justify-between" style={{ height: '44px' }}>
                <div className="flex-1 flex items-center justify-center">
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: '500',
                    margin: 0,
                    textAlign: 'center'
                  }}>
                    <span style={{ fontWeight: '600' }}>Limited Spots Available</span> — We're taking on 3 new clients in November. Book your free audit before they're gone.
                  </p>
                </div>
                <button
                  onClick={() => setAnnouncementVisible(false)}
                  aria-label="Close announcement"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    padding: '8px',
                    marginLeft: '16px',
                    opacity: 0.8,
                    transition: 'opacity 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== NAVIGATION BAR ===== */}
      <nav className="fixed left-0 right-0 z-50" style={{
        top: announcementVisible ? '44px' : '0',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EBE8E1',
        transition: 'top 0.3s ease'
      }}>
        <div className="mx-auto px-4" style={{ maxWidth: '1220px' }}>
          <div className="flex items-center justify-between" style={{ height: '80px' }}>
            {/* Logo */}
            <a
              href="/"
              className="hover:opacity-70 transition-opacity"
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '24px',
                fontWeight: '600',
                color: '#000000',
                letterSpacing: '-1px'
              }}
            >
              GUEST DIGITAL
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-10" style={{ height: '80px' }}>
              {['Services', 'Work', 'About'].map((item) => (
                <div
                  key={item}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMegaMenu(item)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                  style={{
                    paddingBottom: '30px',
                    marginBottom: '-30px'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}
                  >
                    <a
                      href={`#${item.toLowerCase()}`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: activeMegaMenu === item ? '#000000' : '#8B8680',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        paddingBottom: '8px'
                      }}
                    >
                      {item}
                    </a>
                    <span style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      height: '2px',
                      backgroundColor: '#4A3C4A',
                      transform: activeMegaMenu === item ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.3s ease',
                      transformOrigin: 'left'
                    }}></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <a
              href="#contact"
              className="hidden lg:inline-block transition-all"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                color: '#FFFFFF',
                backgroundColor: '#4A3C4A',
                padding: '12px 28px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#342834'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4A3C4A'}
            >
              Let's talk
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
              aria-label="Menu"
            >
              <span className={`w-full h-0.5 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: '#000000' }} />
              <span className={`w-full h-0.5 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: '#000000' }} />
              <span className={`w-full h-0.5 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: '#000000' }} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #EBE8E1' }}>
            <div className="px-4 py-6 space-y-4">
              {['Services', 'Work', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#8B8680'
                  }}
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000000'
                }}
              >
                Let's talk
              </a>
            </div>
          </div>
        )}

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="hidden lg:block absolute left-0 right-0"
              style={{
                top: '80px',
                backgroundColor: '#FFFFFF',
                borderTop: '1px solid #000000',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
            <div className="mx-auto px-4" style={{ maxWidth: '1220px', paddingTop: '40px', paddingBottom: '40px' }}>
              <div className="grid gap-20" style={{
                gridTemplateColumns: `repeat(${megaMenuContent[activeMegaMenu as keyof typeof megaMenuContent]?.sections.length || 2}, 1fr)`
              }}>
                {megaMenuContent[activeMegaMenu as keyof typeof megaMenuContent]?.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#000000',
                      marginBottom: '20px',
                      letterSpacing: '0px'
                    }}>
                      {section.title}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {section.items.map((item, itemIdx) => (
                        <a
                          key={itemIdx}
                          href="#"
                          style={{
                            textDecoration: 'none',
                            padding: '10px 0',
                            transition: 'all 0.15s ease',
                            display: 'block'
                          }}
                          onMouseEnter={(e) => {
                            const title = e.currentTarget.querySelector('[data-title]') as HTMLElement;
                            if (title) title.style.color = '#4A3C4A';
                          }}
                          onMouseLeave={(e) => {
                            const title = e.currentTarget.querySelector('[data-title]') as HTMLElement;
                            if (title) title.style.color = '#000000';
                          }}
                        >
                          <div
                            data-title
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '15px',
                              fontWeight: '500',
                              color: '#000000',
                              marginBottom: '4px',
                              transition: 'color 0.15s ease'
                            }}
                          >
                            {item.name}
                          </div>
                          <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            fontWeight: '400',
                            color: '#777777',
                            lineHeight: '1.4'
                          }}>
                            {item.description}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* ===== HERO SECTION ===== */}
        <section style={{
          paddingTop: announcementVisible ? '224px' : '180px',
          paddingBottom: '110px',
          transition: 'padding-top 0.3s ease',
          backgroundColor: '#FFFFFF',
          backgroundImage: 'url(/hero-test.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}>
          {/* Overlay for text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            zIndex: 1
          }}></div>

          <div className="mx-auto px-4" style={{ maxWidth: '1220px', position: 'relative', zIndex: 2 }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="lg:col-span-7">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block px-5 py-2 mb-8"
                  style={{
                    backgroundColor: '#EBE8E1',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#000000',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  One System • Four Pillars • Predictable Revenue
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(50px, 8vw, 80px)',
                    fontWeight: '600',
                    lineHeight: '1.05',
                    letterSpacing: '-6px',
                    color: '#000000',
                    marginBottom: '32px'
                  }}
                >
                  The Infrastructure Behind Predictable Revenue Growth
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '19px',
                    fontWeight: '400',
                    lineHeight: '1.7',
                    color: '#2B2826',
                    marginBottom: '40px',
                    maxWidth: '540px'
                  }}
                >
                  We know the struggle. You've built a great product, but you can't reach the right clients, and you're stuck chasing people who'll never buy. We built the system that fixes this-and we only get paid when you close deals.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <a
                    href="#contact"
                    className="inline-block transition-all"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#FFFFFF',
                      backgroundColor: '#4A3C4A',
                      padding: '18px 34px',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      border: '2px solid #4A3C4A'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#342834';
                      e.currentTarget.style.borderColor = '#342834';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#4A3C4A';
                      e.currentTarget.style.borderColor = '#4A3C4A';
                    }}
                  >
                    Book Free Audit
                  </a>
                  <a
                    href="#pillars"
                    className="inline-block hover:opacity-70 transition-all"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#8B8680',
                      backgroundColor: 'transparent',
                      padding: '18px 34px',
                      textDecoration: 'none',
                      border: '1px solid #EBE8E1'
                    }}
                  >
                    See How It Works
                  </a>
                </motion.div>
              </div>

              {/* Right Column - Stats */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '£1500', label: 'Starting From' },
                    { value: '72HR', label: 'Deploy time' },
                    { value: '25%+', label: 'Close rate' },
                    { value: '2-3X', label: 'ROI target' }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
                      className="p-6"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #EBE8E1'
                      }}
                    >
                      <div style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '42px',
                        fontWeight: '600',
                        color: '#000000',
                        lineHeight: '1',
                        marginBottom: '8px'
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#8B8680',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #4A3C4A 50%, transparent)',
          margin: '0 auto'
        }}></div>

        {/* ===== PROBLEM SECTION ===== */}
        <section style={{ padding: '110px 0', backgroundColor: '#FFFFFF' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1220px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <h2 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(35px, 5vw, 55px)',
                  fontWeight: '600',
                  lineHeight: '1.1',
                  letterSpacing: '-3px',
                  color: '#000000'
                }}>
                  We've been exactly where you are
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px',
                  fontWeight: '400',
                  lineHeight: '1.8',
                  color: '#2B2826',
                  marginBottom: '24px'
                }}>
                  Three years ago, we were running a business just like yours. Spending £5k/month on ads. Getting leads. But they weren't converting. The follow-up was manual. Prospects went cold. Revenue was unpredictable.
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px',
                  fontWeight: '400',
                  lineHeight: '1.8',
                  color: '#2B2826'
                }}>
                  So we built what we needed—a system that attracts the right people, nurtures them automatically, and gets them on calls with closers who only get paid on results. Now we're sharing it with you.
                </p>
              </div>
            </div>

            {/* Vimeo Video Embed */}
            <div style={{ marginTop: '64px', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '100%',
                maxWidth: '900px',
                aspectRatio: '16 / 9',
                position: 'relative'
              }}>
                <iframe
                  title="vimeo-player"
                  src="https://player.vimeo.com/video/1128633481?h=13469dcfbc"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #4A3C4A 50%, transparent)',
          margin: '0 auto'
        }}></div>

        {/* ===== HOW IT WORKS - JOURNEY TIMELINE ===== */}
        <section style={{ padding: '110px 0', backgroundColor: '#EBE8E1' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1220px' }}>
            {/* Section Header */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block px-4 py-2 mb-6"
                style={{ backgroundColor: '#000000' }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#EBE8E1',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Your Journey
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: 'clamp(35px, 5vw, 55px)',
                  fontWeight: '600',
                  lineHeight: '1.1',
                  letterSpacing: '-3px',
                  color: '#000000',
                  marginBottom: '20px'
                }}
              >
                Here's how this actually works
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px',
                  fontWeight: '400',
                  lineHeight: '1.8',
                  color: '#2B2826',
                  maxWidth: '680px',
                  margin: '0 auto'
                }}
              >
                No confusing jargon. No lengthy onboarding. Just a clear path from where you are now to predictable revenue.
              </motion.p>
            </div>

            {/* Journey Steps - Clean Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#000000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  margin: '0 auto 24px'
                }}>
                  01
                </div>

                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '22px',
                  fontWeight: '600',
                  lineHeight: '1.3',
                  color: '#000000',
                  marginBottom: '8px',
                  textAlign: 'center'
                }}>
                  Audit
                </h3>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#8B8680',
                  marginBottom: '16px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Week 1
                </p>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: '#2B2826',
                  textAlign: 'center'
                }}>
                  We analyse your current setup and show you exactly where you're losing revenue.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#000000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  margin: '0 auto 24px'
                }}>
                  02
                </div>

                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '22px',
                  fontWeight: '600',
                  lineHeight: '1.3',
                  color: '#000000',
                  marginBottom: '8px',
                  textAlign: 'center'
                }}>
                  Build Infrastructure
                </h3>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#8B8680',
                  marginBottom: '16px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Weeks 2-4
                </p>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: '#2B2826',
                  textAlign: 'center'
                }}>
                  Website, automation, lead magnets, nurture sequences, booking system. All built to convert visitors into qualified prospects.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#000000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  margin: '0 auto 24px'
                }}>
                  03
                </div>

                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '22px',
                  fontWeight: '600',
                  lineHeight: '1.3',
                  color: '#000000',
                  marginBottom: '8px',
                  textAlign: 'center'
                }}>
                  Closers Book Calls
                </h3>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#8B8680',
                  marginBottom: '16px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Week 5+
                </p>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: '#2B2826',
                  textAlign: 'center'
                }}>
                  Trained sales professionals reach out to qualified leads and book discovery calls. They only get paid when you close deals.
                </p>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#000000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  margin: '0 auto 24px'
                }}>
                  04
                </div>

                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '22px',
                  fontWeight: '600',
                  lineHeight: '1.3',
                  color: '#000000',
                  marginBottom: '8px',
                  textAlign: 'center'
                }}>
                  You Focus on Delivery
                </h3>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#8B8680',
                  marginBottom: '16px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Ongoing
                </p>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: '#2B2826',
                  textAlign: 'center'
                }}>
                  No more chasing leads. No more manual follow-up. You deliver great work, we handle growth.
                </p>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
              style={{ marginTop: '64px' }}
            >
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: '1.7',
                color: '#2B2826',
                marginBottom: '24px'
              }}>
                Most clients see their first booked calls within 3-4 weeks. Results vary, but the system is proven.
              </p>
              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#4A3C4A',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: '600',
                  padding: '16px 36px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#342834';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#4A3C4A';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Let's Talk About Your Business
              </a>
            </motion.div>
          </div>
        </section>

        {/* Section Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #4A3C4A 50%, transparent)',
          margin: '0 auto'
        }}></div>

        {/* ===== FOUR PILLARS - ASYMMETRIC GRID ===== */}
        <section id="pillars" style={{ padding: '110px 0', backgroundColor: '#000000' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1220px' }}>
            {/* Section Header */}
            <div className="mb-16">
              <div className="inline-block px-4 py-2 mb-6" style={{ backgroundColor: '#2B2826' }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#EBE8E1',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Digital Infrastructure
                </span>
              </div>
              <h2 style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 'clamp(35px, 5vw, 55px)',
                fontWeight: '600',
                lineHeight: '1.1',
                letterSpacing: '-3px',
                color: '#FFFFFF',
                marginBottom: '20px'
              }}>
                One System. Four Pillars.
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '17px',
                fontWeight: '400',
                lineHeight: '30px',
                color: '#EBE8E1',
                maxWidth: '600px'
              }}>
                Everything you need to turn visitors into paying clients—without the manual grind.
              </p>
            </div>

            {/* Interactive 2x2 Grid with Hover Reveals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Pillar 1 - Acquisition */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: '#4A3C4A',
                  boxShadow: '0 10px 30px rgba(74, 60, 74, 0.15)',
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  backgroundColor: '#EBE8E1',
                  border: '1px solid #000000',
                  padding: '48px',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s ease'
                }}
              >
                {/* Large Number Background */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '200px',
                  fontWeight: '700',
                  color: '#000000',
                  lineHeight: '1',
                  opacity: '0.05',
                  transition: 'opacity 0.4s ease'
                }}
                className="group-hover:opacity-10">
                  01
                </div>

                {/* Badge */}
                <div className="inline-block px-3 py-1 mb-4 self-start" style={{ backgroundColor: '#000000' }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#EBE8E1',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    ACQUISITION
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '1.1',
                  letterSpacing: '-2px',
                  color: '#000000',
                  marginBottom: '16px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  High-Converting Websites
                </h3>

                {/* Description - Hover Reveal */}
                <div style={{
                  opacity: 0,
                  maxHeight: 0,
                  overflow: 'hidden',
                  transition: 'opacity 0.4s ease, max-height 0.4s ease',
                  position: 'relative',
                  zIndex: 1
                }}
                className="group-hover:opacity-100 group-hover:max-h-96">
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '17px',
                    fontWeight: '400',
                    lineHeight: '1.7',
                    color: '#8B8680',
                    marginBottom: '24px'
                  }}>
                    Your website should work harder than you do. Ours capture attention, build trust, and get people to raise their hand—fast.
                  </p>

                  {/* Metrics */}
                  <div className="flex gap-6">
                    <div>
                      <div style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '32px',
                        fontWeight: '600',
                        color: '#000000',
                        marginBottom: '4px'
                      }}>28%</div>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        fontWeight: '500',
                        color: '#8B8680',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>Avg conversion</div>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '32px',
                        fontWeight: '600',
                        color: '#000000',
                        marginBottom: '4px'
                      }}>72HR</div>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        fontWeight: '500',
                        color: '#8B8680',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>Deploy time</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Pillar 2 - Nurturing */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: '#4A3C4A',
                  boxShadow: '0 10px 30px rgba(74, 60, 74, 0.15)',
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #000000',
                  padding: '48px',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s ease'
                }}
              >
                {/* Large Number Background */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '200px',
                  fontWeight: '700',
                  color: '#000000',
                  lineHeight: '1',
                  opacity: '0.05',
                  transition: 'opacity 0.4s ease'
                }}
                className="group-hover:opacity-10">
                  02
                </div>

                {/* Badge */}
                <div className="inline-block px-3 py-1 mb-4 self-start" style={{ backgroundColor: '#000000' }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    NURTURING
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '1.1',
                  letterSpacing: '-2px',
                  color: '#000000',
                  marginBottom: '16px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  Lead Generation
                </h3>

                {/* Description - Hover Reveal */}
                <div style={{
                  opacity: 0,
                  maxHeight: 0,
                  overflow: 'hidden',
                  transition: 'opacity 0.4s ease, max-height 0.4s ease',
                  position: 'relative',
                  zIndex: 1
                }}
                className="group-hover:opacity-100 group-hover:max-h-96">
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '17px',
                    fontWeight: '400',
                    lineHeight: '1.7',
                    color: '#8B8680'
                  }}>
                    No more chasing tire-kickers. Our systems qualify leads while you sleep, so you only talk to people ready to buy.
                  </p>
                </div>
              </motion.div>

              {/* Pillar 3 - Execution */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: '#4A3C4A',
                  boxShadow: '0 10px 30px rgba(74, 60, 74, 0.15)',
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  backgroundColor: '#2B2826',
                  border: '1px solid #000000',
                  padding: '48px',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s ease'
                }}
              >
                {/* Large Number Background */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '200px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  lineHeight: '1',
                  opacity: '0.05',
                  transition: 'opacity 0.4s ease'
                }}
                className="group-hover:opacity-10">
                  03
                </div>

                {/* Badge */}
                <div className="inline-block px-3 py-1 mb-4 self-start" style={{ backgroundColor: '#000000' }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    EXECUTION
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '1.1',
                  letterSpacing: '-2px',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  Commission Closers
                </h3>

                {/* Description - Hover Reveal */}
                <div style={{
                  opacity: 0,
                  maxHeight: 0,
                  overflow: 'hidden',
                  transition: 'opacity 0.4s ease, max-height 0.4s ease',
                  position: 'relative',
                  zIndex: 1
                }}
                className="group-hover:opacity-100 group-hover:max-h-96">
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '17px',
                    fontWeight: '400',
                    lineHeight: '1.7',
                    color: '#EBE8E1',
                    marginBottom: '24px'
                  }}>
                    Trained sales team paid only when you get paid. Zero risk.
                  </p>

                  {/* Metric */}
                  <div>
                    <div style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '40px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      marginBottom: '4px'
                    }}>35%</div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: '500',
                      color: '#EBE8E1',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Close rate</div>
                  </div>
                </div>
              </motion.div>

              {/* Pillar 4 - Optimization */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: '#4A3C4A',
                  boxShadow: '0 10px 30px rgba(74, 60, 74, 0.15)',
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  backgroundColor: '#241422',
                  border: '1px solid #000000',
                  padding: '48px',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s ease'
                }}
              >
                {/* Large Number Background */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '200px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  lineHeight: '1',
                  opacity: '0.05',
                  transition: 'opacity 0.4s ease'
                }}
                className="group-hover:opacity-10">
                  04
                </div>

                {/* Badge */}
                <div className="inline-block px-3 py-1 mb-4 self-start" style={{ backgroundColor: '#2B2826' }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#EBE8E1',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    OPTIMIZATION
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '1.1',
                  letterSpacing: '-2px',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  AI Integration & Analytics
                </h3>

                {/* Description - Hover Reveal */}
                <div style={{
                  opacity: 0,
                  maxHeight: 0,
                  overflow: 'hidden',
                  transition: 'opacity 0.4s ease, max-height 0.4s ease',
                  position: 'relative',
                  zIndex: 1
                }}
                className="group-hover:opacity-100 group-hover:max-h-96">
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '17px',
                    fontWeight: '400',
                    lineHeight: '1.7',
                    color: '#EBE8E1'
                  }}>
                    See exactly what's working (and what's not). We track every lead, call, and conversion—so you know where your money's going.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #4A3C4A 50%, transparent)',
          margin: '0 auto'
        }}></div>

        {/* ===== PRICING SECTION ===== */}
        <section style={{ padding: '110px 0', backgroundColor: '#EBE8E1' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1220px' }}>
            {/* Section Header */}
            <div className="mb-16 text-center">
              <h2 style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 'clamp(35px, 5vw, 55px)',
                fontWeight: '600',
                lineHeight: '1.1',
                letterSpacing: '-3px',
                color: '#000000',
                marginBottom: '20px'
              }}>
                We only win when you win
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '17px',
                fontWeight: '400',
                lineHeight: '30px',
                color: '#8B8680',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Start with closers only, or get the full revenue infrastructure. No long-term contracts.
              </p>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Level 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-10"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EBE8E1'
                }}
              >
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#8B8680',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '12px'
                }}>
                  Level 1
                </div>
                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '28px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  letterSpacing: '-1px',
                  color: '#000000',
                  marginBottom: '16px'
                }}>
                  Closers Only
                </h3>
                <div style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '55px',
                  fontWeight: '600',
                  lineHeight: '1',
                  letterSpacing: '-3px',
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  £0
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#8B8680',
                  marginBottom: '32px'
                }}>
                  + 10-20% commission
                </div>
                <div style={{ marginBottom: '32px' }}>
                  {[
                    '2-4 commission-only closers',
                    'Custom sales scripts',
                    'Call tracking & recordings',
                    'Weekly performance reports'
                  ].map((feature, i) => (
                    <div key={i} style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: '#8B8680',
                      marginBottom: '12px',
                      paddingLeft: '20px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        color: '#000000'
                      }}>•</span>
                      {feature}
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="block text-center transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#FFFFFF',
                    backgroundColor: '#000000',
                    padding: '14px 28px',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2B2826'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
                >
                  Get Started
                </a>
              </motion.div>

              {/* Level 2 - Featured */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="p-10 relative"
                style={{
                  backgroundColor: '#241422',
                  border: '2px solid #241422',
                  transform: 'scale(1.05)'
                }}
              >
                <div className="absolute top-0 right-0 px-4 py-2" style={{ backgroundColor: '#2B2826' }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: '600',
                    color: '#EBE8E1',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Popular
                  </span>
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#EBE8E1',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '12px',
                  marginTop: '24px'
                }}>
                  Level 2
                </div>
                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '28px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  letterSpacing: '-1px',
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}>
                  Infrastructure + Closers
                </h3>
                <div style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '55px',
                  fontWeight: '600',
                  lineHeight: '1',
                  letterSpacing: '-3px',
                  color: '#FFFFFF',
                  marginBottom: '8px'
                }}>
                  £1,500
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#EBE8E1',
                  marginBottom: '32px'
                }}>
                  /mo + 10-15% commission
                </div>
                <div style={{ marginBottom: '32px' }}>
                  {[
                    'Everything in Level 1, plus:',
                    'Conversion-optimized website',
                    'Booking funnels & landing pages',
                    'Email & SMS automation',
                    'Lead scoring & qualification',
                    'Real-time analytics dashboard'
                  ].map((feature, i) => (
                    <div key={i} style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: i === 0 ? '#FFFFFF' : '#EBE8E1',
                      marginBottom: '12px',
                      paddingLeft: '20px',
                      position: 'relative',
                      fontWeight: i === 0 ? '600' : '400'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        color: '#EBE8E1'
                      }}>•</span>
                      {feature}
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="block text-center transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#FFFFFF',
                    backgroundColor: '#000000',
                    padding: '14px 28px',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2B2826'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
                >
                  Get Started
                </a>
              </motion.div>

              {/* Level 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-10"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EBE8E1'
                }}
              >
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#8B8680',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '12px'
                }}>
                  Level 3
                </div>
                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '28px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  letterSpacing: '-1px',
                  color: '#000000',
                  marginBottom: '16px'
                }}>
                  Full Revenue Engine
                </h3>
                <div style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '55px',
                  fontWeight: '600',
                  lineHeight: '1',
                  letterSpacing: '-3px',
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  £2,500
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#8B8680',
                  marginBottom: '32px'
                }}>
                  /mo + 10% commission
                </div>
                <div style={{ marginBottom: '32px' }}>
                  {[
                    'Everything in Level 2, plus:',
                    'Content production (BBL Studios)',
                    '4-6 pieces/week across platforms',
                    'Strategic consulting',
                    'Weekly optimisation calls',
                    'Priority support'
                  ].map((feature, i) => (
                    <div key={i} style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: '#8B8680',
                      marginBottom: '12px',
                      paddingLeft: '20px',
                      position: 'relative',
                      fontWeight: i === 0 ? '600' : '400'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        color: '#000000'
                      }}>•</span>
                      {feature}
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="block text-center transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#FFFFFF',
                    backgroundColor: '#000000',
                    padding: '14px 28px',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2B2826'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
                >
                  Apply Now
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #4A3C4A 50%, transparent)',
          margin: '0 auto'
        }}></div>

        {/* ===== CLIENT TESTIMONIALS ===== */}
        <section style={{ padding: '110px 0', backgroundColor: '#000000' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1220px' }}>
            {/* Section Header */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block px-4 py-2 mb-6"
                style={{ backgroundColor: '#2B2826' }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#EBE8E1',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Client Results
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: 'clamp(35px, 5vw, 55px)',
                  fontWeight: '600',
                  lineHeight: '1.1',
                  letterSpacing: '-3px',
                  color: '#FFFFFF',
                  marginBottom: '20px'
                }}
              >
                Real businesses. Real results.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px',
                  fontWeight: '400',
                  lineHeight: '1.8',
                  color: '#EBE8E1',
                  maxWidth: '680px',
                  margin: '0 auto'
                }}
              >
                These aren't cherry-picked success stories. These are businesses like yours who were struggling with the same problems.
              </motion.p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Testimonial 1 - Large Featured */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-8"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EBE8E1',
                  borderRadius: '16px',
                  padding: '48px',
                  position: 'relative'
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#8B8680',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '16px'
                    }}>
                      Business Coaching
                    </div>
                    <h3 style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '32px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                      letterSpacing: '-1px',
                      color: '#000000',
                      marginBottom: '16px'
                    }}>
                      Sarah Mitchell
                    </h3>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      fontWeight: '400',
                      lineHeight: '1.6',
                      color: '#2B2826',
                      marginBottom: '24px'
                    }}>
                      Founder, Peak Performance Coaching
                    </p>

                    <div style={{
                      backgroundColor: '#EBE8E1',
                      padding: '20px',
                      borderRadius: '12px',
                      marginBottom: '24px'
                    }}>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#8B8680',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '12px'
                      }}>
                        The Struggle
                      </div>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '15px',
                        fontWeight: '400',
                        lineHeight: '1.6',
                        color: '#2B2826'
                      }}>
                        "I was spending £3k/month on Facebook ads. Getting leads, but 90% weren't qualified. I was wasting hours on discovery calls with people who couldn't afford my £5k coaching packages."
                      </p>
                    </div>

                    <blockquote style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '17px',
                      fontWeight: '400',
                      lineHeight: '1.7',
                      color: '#2B2826',
                      fontStyle: 'italic',
                      marginBottom: '24px',
                      borderLeft: '3px solid #000000',
                      paddingLeft: '20px'
                    }}>
                      "Within 6 weeks, we had a pipeline of pre-qualified prospects. The system filtered out time-wasters and only put serious buyers on my calendar. First month: 4 new clients. ROI: 6x."
                    </blockquote>
                  </div>

                  <div>
                    <div style={{
                      backgroundColor: '#000000',
                      padding: '24px',
                      borderRadius: '12px',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#8B8680',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '16px'
                      }}>
                        Results in 90 Days
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div style={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontSize: '36px',
                            fontWeight: '600',
                            color: '#FFFFFF',
                            lineHeight: '1'
                          }}>
                            £60k
                          </div>
                          <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            color: '#8B8680',
                            marginTop: '8px'
                          }}>
                            New Revenue
                          </div>
                        </div>
                        <div>
                          <div style={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontSize: '36px',
                            fontWeight: '600',
                            color: '#FFFFFF',
                            lineHeight: '1'
                          }}>
                            87%
                          </div>
                          <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            color: '#8B8680',
                            marginTop: '8px'
                          }}>
                            Less Wasted Time
                          </div>
                        </div>
                        <div>
                          <div style={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontSize: '36px',
                            fontWeight: '600',
                            color: '#FFFFFF',
                            lineHeight: '1'
                          }}>
                            12
                          </div>
                          <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            color: '#8B8680',
                            marginTop: '8px'
                          }}>
                            Clients Closed
                          </div>
                        </div>
                        <div>
                          <div style={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontSize: '36px',
                            fontWeight: '600',
                            color: '#FFFFFF',
                            lineHeight: '1'
                          }}>
                            6x
                          </div>
                          <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            color: '#8B8680',
                            marginTop: '8px'
                          }}>
                            Return on Investment
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: '#EBE8E1',
                      padding: '20px',
                      borderRadius: '12px'
                    }}>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#8B8680',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '12px'
                      }}>
                        What Changed
                      </div>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0
                      }}>
                        {[
                          'Automated qualification funnel',
                          'Pre-call nurture sequence',
                          'Commission-only closers',
                          'CRM integration with follow-up'
                        ].map((item, index) => (
                          <li key={index} style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '15px',
                            fontWeight: '400',
                            lineHeight: '1.6',
                            color: '#2B2826',
                            marginBottom: '8px',
                            paddingLeft: '20px',
                            position: 'relative'
                          }}>
                            <span style={{
                              position: 'absolute',
                              left: 0,
                              color: '#000000',
                              fontWeight: '600'
                            }}>✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 2 - Smaller */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-4"
                style={{
                  backgroundColor: '#EBE8E1',
                  border: '1px solid #2B2826',
                  borderRadius: '16px',
                  padding: '36px'
                }}
              >
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#8B8680',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '16px'
                }}>
                  E-commerce
                </div>
                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '26px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  letterSpacing: '-1px',
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  James Chen
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: '#2B2826',
                  marginBottom: '24px'
                }}>
                  Co-Founder, EcoKits Ltd
                </p>

                <blockquote style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '1.7',
                  color: '#2B2826',
                  fontStyle: 'italic',
                  marginBottom: '24px'
                }}>
                  "Our cart abandonment was 78%. Now it's 34%. The automated email sequences alone recovered £18k in the first month."
                </blockquote>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '12px'
                }}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '28px',
                        fontWeight: '600',
                        color: '#000000',
                        lineHeight: '1'
                      }}>
                        44%
                      </div>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#8B8680',
                        marginTop: '6px'
                      }}>
                        Lower Abandonment
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '28px',
                        fontWeight: '600',
                        color: '#000000',
                        lineHeight: '1'
                      }}>
                        £18k
                      </div>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#8B8680',
                        marginTop: '6px'
                      }}>
                        Recovered Revenue
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 3 - Smaller */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-4"
                style={{
                  backgroundColor: '#2B2826',
                  border: '1px solid #2B2826',
                  borderRadius: '16px',
                  padding: '36px'
                }}
              >
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#8B8680',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '16px'
                }}>
                  SaaS Startup
                </div>
                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '26px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  letterSpacing: '-1px',
                  color: '#FFFFFF',
                  marginBottom: '8px'
                }}>
                  Lisa Patel
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: '#EBE8E1',
                  marginBottom: '24px'
                }}>
                  CEO, TaskFlow Pro
                </p>

                <blockquote style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '1.7',
                  color: '#EBE8E1',
                  fontStyle: 'italic',
                  marginBottom: '24px'
                }}>
                  "We had product-market fit but couldn't scale. The infrastructure you built handles 500+ leads/month. MRR went from £12k to £47k."
                </blockquote>

                <div style={{
                  backgroundColor: '#000000',
                  padding: '20px',
                  borderRadius: '12px'
                }}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '28px',
                        fontWeight: '600',
                        color: '#FFFFFF',
                        lineHeight: '1'
                      }}>
                        292%
                      </div>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#8B8680',
                        marginTop: '6px'
                      }}>
                        MRR Growth
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '28px',
                        fontWeight: '600',
                        color: '#FFFFFF',
                        lineHeight: '1'
                      }}>
                        500+
                      </div>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#8B8680',
                        marginTop: '6px'
                      }}>
                        Leads per Month
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 4 - Wide Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-8"
                style={{
                  backgroundColor: '#EBE8E1',
                  border: '1px solid #2B2826',
                  borderRadius: '16px',
                  padding: '36px'
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#8B8680',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '12px'
                    }}>
                      Property Development
                    </div>
                    <h3 style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '28px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                      letterSpacing: '-1px',
                      color: '#000000',
                      marginBottom: '8px'
                    }}>
                      Michael Roberts
                    </h3>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '1.6',
                      color: '#2B2826',
                      marginBottom: '16px'
                    }}>
                      Director, Urban Spaces Group
                    </p>

                    <blockquote style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      fontWeight: '400',
                      lineHeight: '1.7',
                      color: '#2B2826',
                      fontStyle: 'italic'
                    }}>
                      "High-ticket property deals need trust, not pushy sales. Your system nurtures prospects for 3-6 months, then books calls when they're ready. We closed a £2.4M deal from a lead that came through 4 months ago."
                    </blockquote>
                  </div>

                  <div style={{
                    backgroundColor: '#000000',
                    padding: '24px',
                    borderRadius: '12px'
                  }}>
                    <div style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '40px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      lineHeight: '1',
                      marginBottom: '8px'
                    }}>
                      £2.4M
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      color: '#8B8680'
                    }}>
                      Single deal from automated nurture sequence
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #4A3C4A 50%, transparent)',
          margin: '0 auto'
        }}></div>

        {/* ===== CONTACT SECTION ===== */}
        <section id="contact" style={{ padding: '110px 0', backgroundColor: '#FFFFFF' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1000px' }}>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: '600',
                lineHeight: '1.05',
                letterSpacing: '-3px',
                color: '#000000',
                marginBottom: '24px'
              }}>
                Your Revenue Infrastructure Starts Here
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: '1.6',
                color: '#8B8680',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                Book a free audit. We'll analyse your current setup, show you where you're losing revenue, and map out your custom infrastructure.
              </p>

              <ContactStats />
            </motion.div>

            {/* Contact Form */}
            <HomeContactForm />
          </div>
        </section>

        {/* Section Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #4A3C4A 50%, transparent)',
          margin: '0 auto'
        }}></div>

        {/* ===== FOOTER ===== */}
        <footer style={{ padding: '80px 0 0', backgroundColor: '#000000' }}>
          <div className="mx-auto px-4" style={{ maxWidth: '1220px' }}>
            {/* Footer Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12">
              {/* Logo Column */}
              <div className="col-span-2 md:col-span-1">
                <div className="mb-6">
                  <div style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    letterSpacing: '-1px'
                  }}>
                    GUEST DIGITAL
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://linkedin.com"
                    className="hover:opacity-70 transition-opacity"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#8B8680',
                      textDecoration: 'none'
                    }}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com"
                    className="hover:opacity-70 transition-opacity"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#8B8680',
                      textDecoration: 'none'
                    }}
                  >
                    Twitter
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}>
                  Services
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#pillars"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      Revenue Infrastructure
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h4 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}>
                  Solutions
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      For Coaches
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      For SaaS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      For Agencies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      For E-commerce
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}>
                  Resources
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}>
                  Company
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}>
                  Legal
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#8B8680',
                        textDecoration: 'none'
                      }}
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '32px', paddingBottom: '32px' }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                color: '#8B8680',
                textAlign: 'center'
              }}>
                © 2025 Guest Digital. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

// Contact Stats
function ContactStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-8 flex items-center justify-center gap-12"
    >
      <div className="text-center">
        <div style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '30px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '4px'
        }}>24hrs</div>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: '#8B8680'
        }}>Response Time</div>
      </div>
      <div className="text-center">
        <div style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '30px',
          fontWeight: '600',
          color: '#000000',
          marginBottom: '4px'
        }}>100+</div>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: '#8B8680'
        }}>Projects Delivered</div>
      </div>
    </motion.div>
  );
}

// Home page contact form component
function HomeContactForm() {
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
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #EBE8E1',
        borderRadius: '16px',
        padding: '48px'
      }}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Success Message */}
        {submitStatus === 'success' && (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #86efac',
            color: '#166534',
            padding: '12px 16px',
            borderRadius: '8px'
          }}>
            <p style={{ fontWeight: '600', marginBottom: '4px' }}>Thank you! We'll be in touch within 24 hours.</p>
            <p style={{ fontSize: '14px' }}>Check your email for a confirmation.</p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fca5a5',
            color: '#991b1b',
            padding: '12px 16px',
            borderRadius: '8px'
          }}>
            <p style={{ fontWeight: '600', marginBottom: '4px' }}>Error</p>
            <p style={{ fontSize: '14px' }}>{errorMessage}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>Your name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #EBE8E1',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="John Smith"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
              marginBottom: '8px'
            }}>Email address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #EBE8E1',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="john@company.com"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            color: '#000000',
            marginBottom: '8px'
          }}>Company name (optional)</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #EBE8E1',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              outline: 'none'
            }}
            placeholder="Your Company Ltd"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            color: '#000000',
            marginBottom: '8px'
          }}>Tell us about your business *</label>
          <textarea
            rows={5}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #EBE8E1',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              outline: 'none'
            }}
            placeholder="What do you sell? Who are your customers? What's your current monthly revenue?"
            disabled={isSubmitting}
          ></textarea>
        </div>

        <motion.button
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          type="submit"
          disabled={isSubmitting}
          onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#342834')}
          onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#4A3C4A')}
          style={{
            width: '100%',
            padding: '16px 32px',
            backgroundColor: '#4A3C4A',
            color: '#FFFFFF',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.5 : 1,
            transition: 'all 0.3s'
          }}
        >
          {isSubmitting ? 'Sending...' : 'Book Your Free Revenue Audit'}
        </motion.button>
      </form>

      <div style={{
        marginTop: '32px',
        paddingTop: '32px',
        borderTop: '1px solid #EBE8E1',
        textAlign: 'center'
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: '#8B8680',
          marginBottom: '16px'
        }}>Or reach out directly</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="mailto:hello@guestdigital.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#000000',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            hello@guestdigital.com
          </a>
        </div>
      </div>
    </motion.div>
  );
}
