'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { trackNavigation } from '@/lib/analytics';

export default function Navigation() {
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if announcement was dismissed on mount
  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed === 'true') {
      setIsAnnouncementVisible(false);
    }
  }, []);

  // Listen for announcement dismissal event
  useEffect(() => {
    const handleAnnouncementDismissed = () => {
      setIsAnnouncementVisible(false);
    };

    window.addEventListener('announcement-dismissed', handleAnnouncementDismissed);
    return () => window.removeEventListener('announcement-dismissed', handleAnnouncementDismissed);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Move up when scrolling down past 100px
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150);
    setHoverTimer(timer);
  };

  // Calculate top position based on scroll and announcement visibility
  const getNavTop = () => {
    if (isScrolled) return '12px';
    return isAnnouncementVisible ? '64px' : '12px';
  };

  const getMobileMenuTop = () => {
    if (isScrolled) return '76px';
    return isAnnouncementVisible ? '128px' : '76px';
  };

  const getMegaMenuTop = () => {
    if (isScrolled) return '64px';
    return isAnnouncementVisible ? '116px' : '64px';
  };

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 px-6 transition-all duration-500 ease-in-out"
        style={{
          top: getNavTop()
        }}
      >
        <div className={`max-w-[1400px] mx-auto bg-white/80 backdrop-blur-md shadow-lg px-8 py-3 border border-gray-100 flex items-center justify-between transition-all ${
          isMegaMenuOpen ? 'rounded-t-[20px] rounded-b-none border-b-0' : 'rounded-[20px]'
        }`}>

        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="bg-black rounded-xl p-2 transition-transform duration-500 group-hover:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="w-6 h-6 text-white"
              fill="currentColor"
            >
              <rect x="10" y="60" width="30" height="30"/>
              <rect x="35" y="35" width="30" height="30"/>
              <rect x="60" y="10" width="30" height="30"/>
            </svg>
          </div>
        </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Services Mega Menu Trigger */}
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
            <button
              className="px-3 py-2 rounded-2xl hover:bg-gray-50 transition-colors flex items-center gap-1 group"
            >
              <span className="text-sm font-semibold text-gray-900 tracking-[-0.25px]">
                Services
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={`transform transition-transform ${isMegaMenuOpen ? 'rotate-180' : 'rotate-90'}`}
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>

            <Link
              href="#work"
              onClick={() => trackNavigation('Our Work', '#work', 'header')}
              className="px-3 py-2 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-900 tracking-[-0.25px]">
                Our Work
              </span>
            </Link>

            <Link
              href="#pricing"
              onClick={() => trackNavigation('Pricing', '#pricing', 'header')}
              className="px-3 py-2 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-900 tracking-[-0.25px]">
                Pricing
              </span>
            </Link>

            <Link
              href="#testimonials"
              onClick={() => trackNavigation('Case Studies', '#testimonials', 'header')}
              className="px-3 py-2 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-900 tracking-[-0.25px]">
                Case Studies
              </span>
            </Link>

            <Link
              href="#contact"
              onClick={() => trackNavigation('Contact', '#contact', 'header')}
              className="px-3 py-2 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-900 tracking-[-0.25px]">
                Contact
              </span>
            </Link>
          </div>

        {/* Right Side - CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/contact"
            onClick={() => trackNavigation('Book a Call', '/contact', 'header')}
            className="bg-[#EF8354] hover:bg-[#d97446] text-white rounded-full text-sm font-semibold tracking-[-0.25px] transition-all hover:scale-105 hover:shadow-lg flex items-center gap-3 pr-6"
          >
            <div className="bg-white/20 p-2.5 rounded-full">
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span>Book a Call</span>
          </Link>
        </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed left-0 right-0 z-40 px-6 transition-all duration-500 ease-in-out"
          style={{
            top: getMobileMenuTop()
          }}
        >
          <div className="bg-white/80 backdrop-blur-md rounded-[20px] shadow-2xl border border-gray-100 overflow-hidden max-h-[calc(100vh-160px)] overflow-y-auto">
            <div className="p-6 flex flex-col gap-6">
              {/* Services Section */}
              <div className="flex flex-col gap-4">
                <div className="border border-gray-200 px-3 py-2 rounded-3xl inline-flex self-start">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-900">Our Services</span>
                </div>

                <Link href="#infrastructure" onClick={() => { trackNavigation('Website Development', '#infrastructure', 'mobile_menu'); setIsMenuOpen(false); }} className="flex gap-3 hover:opacity-70 transition-opacity">
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect width="20" height="20" rx="4" fill="#EF8354" opacity="0.1"/>
                      <path d="M6 10h8M10 6v8" stroke="#EF8354" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-medium text-gray-900 tracking-[-0.25px]">Website Development</p>
                    <div className="flex gap-1 text-xs text-gray-600">
                      <span>High-Converting</span>
                      <span>·</span>
                      <span>Fast</span>
                      <span>·</span>
                      <span>Scalable</span>
                    </div>
                  </div>
                </Link>

                <Link href="#infrastructure" onClick={() => { trackNavigation('Marketing Automation', '#infrastructure', 'mobile_menu'); setIsMenuOpen(false); }} className="flex gap-3 hover:opacity-70 transition-opacity">
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect width="20" height="20" rx="4" fill="#EF8354" opacity="0.1"/>
                      <circle cx="10" cy="10" r="4" stroke="#EF8354" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-medium text-gray-900 tracking-[-0.25px]">Marketing Automation</p>
                    <div className="flex gap-1 text-xs text-gray-600">
                      <span>24/7 Capture</span>
                      <span>·</span>
                      <span>Nurturing</span>
                    </div>
                  </div>
                </Link>

                <Link href="#infrastructure" onClick={() => { trackNavigation('Commission-Only Closers', '#infrastructure', 'mobile_menu'); setIsMenuOpen(false); }} className="flex gap-3 hover:opacity-70 transition-opacity">
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect width="20" height="20" rx="4" fill="#EF8354" opacity="0.1"/>
                      <path d="M5 15l5-5 5 5" stroke="#EF8354" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-medium text-gray-900 tracking-[-0.25px]">Commission-Only Closers</p>
                    <div className="flex gap-1 text-xs text-gray-600">
                      <span>Zero Risk</span>
                      <span>·</span>
                      <span>Pure Results</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Other Links */}
              <div className="border-t border-gray-200 pt-4 flex flex-col gap-3">
                <Link href="#work" onClick={() => { trackNavigation('Our Work', '#work', 'mobile_menu'); setIsMenuOpen(false); }} className="text-base font-semibold text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                  Our Work
                </Link>
                <Link href="#pricing" onClick={() => { trackNavigation('Pricing', '#pricing', 'mobile_menu'); setIsMenuOpen(false); }} className="text-base font-semibold text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                  Pricing
                </Link>
                <Link href="#testimonials" onClick={() => { trackNavigation('Case Studies', '#testimonials', 'mobile_menu'); setIsMenuOpen(false); }} className="text-base font-semibold text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                  Case Studies
                </Link>
                <Link href="#contact" onClick={() => { trackNavigation('Contact', '#contact', 'mobile_menu'); setIsMenuOpen(false); }} className="text-base font-semibold text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                  Contact
                </Link>
              </div>

              {/* CTA Button */}
              <div className="border-t border-gray-200 pt-4">
                <Link href="/contact" onClick={() => { trackNavigation('Book a Call', '/contact', 'mobile_menu'); setIsMenuOpen(false); }} className="flex items-center justify-center gap-3 w-full bg-[#EF8354] hover:bg-[#d97446] text-white rounded-full text-base font-semibold tracking-[-0.25px] transition-all pr-6">
                  <div className="bg-white/20 p-2.5 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>Book a Call</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mega Menu Dropdown - Desktop Only */}
      {isMegaMenuOpen && (
        <div
          className="hidden lg:block fixed left-0 right-0 z-40 px-6 transition-all duration-500 ease-in-out"
          style={{
            top: getMegaMenuTop()
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-[1400px] mx-auto bg-white/80 backdrop-blur-md rounded-b-[20px] rounded-t-none shadow-2xl border-x border-b border-gray-100 overflow-hidden">
            {/* Hover bridge - invisible area that connects nav to menu */}
            <div className="h-10 bg-white/80 backdrop-blur-md"></div>
            <div className="border-t border-gray-200 p-8">
              <div className="flex gap-16 justify-between">

                {/* Column 1: Our Services */}
                <div className="flex flex-col gap-6 w-[314px]">
                  <div className="border border-gray-200 px-3 py-2 rounded-3xl inline-flex self-start">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-900">
                      Our Services
                    </span>
                  </div>

                  <div className="flex flex-col gap-6">
                    {/* High-Converting Websites */}
                    <Link
                      href="#infrastructure"
                      onClick={() => trackNavigation('Website Development', '#infrastructure', 'mega_menu')}
                      className="flex gap-4 hover:opacity-70 transition-opacity"
                    >
                      <div className="w-5 h-5 flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <rect width="20" height="20" rx="4" fill="#EF8354" opacity="0.1"/>
                          <path d="M6 10h8M10 6v8" stroke="#EF8354" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-base font-medium text-gray-900 tracking-[-0.25px]">
                          Website Development
                        </p>
                        <div className="flex gap-1 text-xs text-gray-600">
                          <span>High-Converting</span>
                          <span>·</span>
                          <span>Fast</span>
                          <span>·</span>
                          <span>Scalable</span>
                        </div>
                      </div>
                    </Link>

                    {/* Marketing Automation */}
                    <Link
                      href="#infrastructure"
                      onClick={() => trackNavigation('Marketing Automation', '#infrastructure', 'mega_menu')}
                      className="flex gap-4 hover:opacity-70 transition-opacity"
                    >
                      <div className="w-5 h-5 flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <rect width="20" height="20" rx="4" fill="#EF8354" opacity="0.1"/>
                          <circle cx="10" cy="10" r="4" stroke="#EF8354" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-base font-medium text-gray-900 tracking-[-0.25px]">
                          Marketing Automation
                        </p>
                        <div className="flex gap-1 text-xs text-gray-600">
                          <span>24/7 Capture</span>
                          <span>·</span>
                          <span>Nurturing</span>
                        </div>
                      </div>
                    </Link>

                    {/* Commission-Only Closers */}
                    <Link
                      href="#infrastructure"
                      onClick={() => trackNavigation('Commission-Only Closers', '#infrastructure', 'mega_menu')}
                      className="flex gap-4 hover:opacity-70 transition-opacity"
                    >
                      <div className="w-5 h-5 flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <rect width="20" height="20" rx="4" fill="#EF8354" opacity="0.1"/>
                          <path d="M5 15l5-5 5 5" stroke="#EF8354" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-base font-medium text-gray-900 tracking-[-0.25px]">
                          Commission-Only Closers
                        </p>
                        <div className="flex gap-1 text-xs text-gray-600">
                          <span>Zero Risk</span>
                          <span>·</span>
                          <span>Pure Results</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Column 2: Industries */}
                <div className="flex flex-col gap-6 w-[207px]">
                  <div className="border border-gray-200 px-3 py-2 rounded-3xl inline-flex self-start">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-900">
                      Industries
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link href="#work" onClick={() => trackNavigation('SaaS Companies', '#work', 'mega_menu')} className="text-base font-medium text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                      SaaS Companies
                    </Link>
                    <Link href="#work" onClick={() => trackNavigation('Coaches & Consultants', '#work', 'mega_menu')} className="text-base font-medium text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                      Coaches & Consultants
                    </Link>
                    <Link href="#work" onClick={() => trackNavigation('Freelancers', '#work', 'mega_menu')} className="text-base font-medium text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                      Freelancers
                    </Link>
                    <Link href="#work" onClick={() => trackNavigation('E-commerce', '#work', 'mega_menu')} className="text-base font-medium text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                      E-commerce
                    </Link>
                  </div>
                </div>

                {/* Column 3: Resources */}
                <div className="flex flex-col gap-6 w-[206px]">
                  <div className="border border-gray-300 px-3 py-2 rounded-3xl inline-flex self-start">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-900">
                      Resources
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link href="#testimonials" onClick={() => trackNavigation('Case Studies', '#testimonials', 'mega_menu')} className="text-base font-medium text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                      Case Studies
                    </Link>
                    <Link href="#pricing" onClick={() => trackNavigation('Pricing Guide', '#pricing', 'mega_menu')} className="text-base font-medium text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                      Pricing Guide
                    </Link>
                    <Link href="#about" onClick={() => trackNavigation('About Us', '#about', 'mega_menu')} className="text-base font-medium text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                      About Us
                    </Link>
                  </div>
                </div>

                {/* Column 4: Get Started */}
                <div className="flex flex-col gap-6 w-[207px]">
                  <div className="border border-gray-300 px-3 py-2 rounded-3xl inline-flex self-start">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-900">
                      Get Started
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link href="#pricing" onClick={() => trackNavigation('View Pricing', '#pricing', 'mega_menu')} className="text-base font-medium text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                      View Pricing
                    </Link>
                    <Link href="#contact" onClick={() => trackNavigation('Book a Call', '#contact', 'mega_menu')} className="text-base font-medium text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                      Book a Call
                    </Link>
                    <Link href="#contact" onClick={() => trackNavigation('Free Audit', '#contact', 'mega_menu')} className="text-base font-medium text-gray-900 tracking-[-0.25px] hover:text-[#EF8354] transition-colors">
                      Free Revenue Audit
                    </Link>
                  </div>
                </div>

                {/* Featured Card */}
                <div className="flex flex-col gap-3 w-[314px]">
                  <Link href="#testimonials" onClick={() => trackNavigation('Featured Work Card', '#testimonials', 'mega_menu')}>
                    <div className="bg-gradient-to-br from-orange-200 via-pink-100 to-purple-100 h-[200px] rounded-xl overflow-hidden relative group cursor-pointer">
                      <Image
                        src="/clients/makeupbyabigail/hero.jpg"
                        alt="Featured work - Makeup By Abigail"
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white font-semibold text-lg mb-1">
                          See Our Latest Work
                        </p>
                        <p className="text-white/80 text-sm">
                          #1 Google ranking for bridal makeup
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-medium text-gray-900 tracking-[-0.25px]">
                      Ready to scale your revenue?
                    </p>
                    <Link href="#testimonials" onClick={() => trackNavigation('View All Case Studies', '#testimonials', 'mega_menu')} className="text-base text-gray-900 tracking-[-0.25px] underline hover:text-[#EF8354] transition-colors">
                      View all case studies
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
