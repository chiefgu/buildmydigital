# New Page Template - Navigation & Footer

This document explains how to create new pages with consistent Navigation and Footer across the site.

## Quick Start Template

Use this template for all new pages:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { trackCTAClick, trackNavigation } from '@/lib/analytics';

// TypewriterText Component (Required for Footer)
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

export default function YourPageName() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <Navigation />

      {/* YOUR PAGE CONTENT HERE */}
      <section className="relative pt-32 pb-20">
        {/* Add your page sections here */}
      </section>

      {/* ===== FOOTER CTA WITH TYPEWRITER (COPY THIS EXACTLY) ===== */}
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
```

## Required Imports

Every new page MUST include these imports:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { trackCTAClick, trackNavigation } from '@/lib/analytics';
```

## Components Required

### 1. Navigation Component
- Already exists at `components/Navigation.tsx`
- Simply import and use: `<Navigation />`
- Includes:
  - Mega menu with services
  - Mobile menu
  - Announcement bar support
  - Book a Call CTA button

### 2. TypewriterText Component
- Must be included in EVERY page file that uses the footer
- Copy the entire function from the template above
- Place it BEFORE your main page component
- Used in the footer's "for all your [animation]" text

## Page Structure Rules

### 1. Main Container
```tsx
<div className="min-h-screen bg-[#F8F7F5]">
  <Navigation />

  {/* Your content sections */}

  {/* Footer (always last) */}
</div>
```

### 2. First Content Section Spacing
- Always use `pt-32` to account for fixed navigation
- Example: `<section className="relative pt-32 pb-20">`

### 3. Background Color
- Use `bg-[#F8F7F5]` for main container
- This is the site's standard off-white background

## Footer Details

### Structure
1. **CTA Section** (with TypewriterText)
   - Full-width heading
   - Two prominent CTA buttons
   - Responsive grid layout

2. **Links Grid** (6 columns)
   - Logo/Social
   - Services
   - Solutions
   - Resources
   - Company
   - Legal

3. **Copyright Bar**
   - Border-top separator
   - Centered text

### Styling Rules
- Background: `bg-black text-white`
- Padding: `paddingTop: '100px', paddingBottom: '50px'`
- Max width: `max-w-[1280px]`
- Link colors: `text-[#b1b1b1]` with `hover:text-white`

### CTA Button Colors
- **Primary (White)**: `bg-white border border-black text-black`
- **Secondary (Black)**: `bg-black border border-white text-white`

## Analytics Tracking

All CTAs and links must include analytics tracking:

```tsx
// For CTA buttons
onClick={() => trackCTAClick('Button Text', 'Location', 'url')}

// For navigation links
onClick={() => trackNavigation('Link Text', 'url', 'footer')}
```

## Common Mistakes to Avoid

❌ **Don't** create a custom navigation
❌ **Don't** create a custom footer component (it's inline)
❌ **Don't** forget the TypewriterText component
❌ **Don't** forget `'use client'` directive
❌ **Don't** forget pt-32 on first section

✅ **Do** use the Navigation component
✅ **Do** copy the entire footer section
✅ **Do** include TypewriterText function
✅ **Do** maintain consistent spacing
✅ **Do** include analytics tracking

## File Locations

- **Navigation Component**: `/components/Navigation.tsx`
- **Analytics Functions**: `/lib/analytics.ts`
- **Example Reference**: `/app/coaches/page.tsx`
- **Home Page Reference**: `/app/page.tsx`

## Testing Checklist

Before considering a new page complete:

- [ ] Navigation displays correctly
- [ ] Mega menu works on desktop
- [ ] Mobile menu works on mobile
- [ ] TypewriterText animates in footer
- [ ] All footer links work
- [ ] CTA buttons have correct colors and hovers
- [ ] Analytics tracking is present on all interactive elements
- [ ] Page spacing matches other pages (pt-32 on first section)
- [ ] Footer social links point to correct URLs
- [ ] Copyright year is current (2025)

## Need Help?

- Check `/app/coaches/page.tsx` for a complete working example
- Check `/app/page.tsx` for the original navigation and footer implementation
- All navigation logic is in `/components/Navigation.tsx`
