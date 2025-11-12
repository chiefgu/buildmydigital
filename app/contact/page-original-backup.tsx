'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

export default function ContactPage() {
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
    <>
      <Navigation />

      {/* Hero Section - Centered Layout */}
      <section
        className="relative px-6 bg-gradient-to-br from-black to-gray-900 overflow-hidden"
        style={{
          minHeight: '90vh',
          paddingTop: '140px',
          paddingBottom: '80px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Decorative Gradient */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#EF8354]/20 to-purple-500/20 rounded-full blur-3xl -mr-[400px] -mt-[200px]"></div>

        <div className="mx-auto w-full relative z-10" style={{ maxWidth: '900px' }}>

          {/* Centered Content */}
          <div className="text-center text-white mb-12">
            <h1
              className="font-bold leading-[1.05] mb-6"
              style={{
                fontFamily: 'Geist, sans-serif',
                letterSpacing: '-0.03em',
                fontSize: 'clamp(40px, 6vw, 72px)',
              }}
            >
              Let's talk
            </h1>

            <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-[600px] mx-auto">
              Book a call or drop us a message. We'll respond within 24 hours.
            </p>

            {/* Stats Row */}
            <div className="flex flex-row gap-12 justify-center mb-8">
              <div>
                <div className="text-4xl font-bold mb-2">24hrs</div>
                <div className="text-white/60 text-sm">Response Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-white/60 text-sm">Projects Delivered</div>
              </div>
            </div>
          </div>

          {/* Elevated White Form Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    id="name"
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
                    id="email"
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
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF8354] focus:border-transparent focus:bg-white transition-all"
                    placeholder="Company name (optional)"
                  />
                </div>

                <div>
                  <textarea
                    id="message"
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
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#EF8354] to-[#d97446] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#EF8354]/30 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
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

      {/* Client Logo Section - Trust Indicators */}
      <section className="px-6 bg-white" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-sm font-medium text-gray-500 mb-8 tracking-wider uppercase">
            Trusted by high-growth businesses
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-40">
            {/* Placeholder for client logos */}
            <div className="flex items-center justify-center h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl">
              <span className="text-gray-400 font-bold text-sm">Client Logo</span>
            </div>
            <div className="flex items-center justify-center h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl">
              <span className="text-gray-400 font-bold text-sm">Client Logo</span>
            </div>
            <div className="flex items-center justify-center h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl">
              <span className="text-gray-400 font-bold text-sm">Client Logo</span>
            </div>
            <div className="flex items-center justify-center h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl">
              <span className="text-gray-400 font-bold text-sm">Client Logo</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Improved Accordion Style */}
      <section className="px-6 bg-gradient-to-br from-gray-50 to-white" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.02em] text-black mb-4"
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
              }}
            >
              Common questions
            </h2>
            <p className="text-lg text-gray-600 max-w-[600px] mx-auto">
              Everything you need to know about working with us
            </p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="How quickly can we get started?"
              answer="Most projects kick off within 48 hours. We'll have an initial call, align on scope, and start implementation immediately after."
            />
            <FAQItem
              question="What if I'm not sure what I need?"
              answer="That's fine. We'll walk through your current setup, identify bottlenecks, and recommend solutions. No pressure to commit upfront."
            />
            <FAQItem
              question="Do you work with businesses outside the UK?"
              answer="Yes. We're based in Manchester but work with clients across Europe, North America, and Australia. Time zones haven't been an issue."
            />
            <FAQItem
              question="What's your pricing structure?"
              answer="It depends on the scope. Commission-only closers take 10-20% per deal. Fixed services (websites, funnels, content) are project-based. We'll send over a clear proposal after our first call."
            />
            <FAQItem
              question="Do you require long-term contracts?"
              answer="No. Most clients stay because the work delivers, not because they're locked in. We offer monthly rolling agreements with 30 days notice."
            />
            <FAQItem
              question="Can I see examples of your work?"
              answer="We'll share relevant case studies during our call. Due to NDAs, we can't publicly display all client work, but we'll show you projects similar to what you're looking for."
            />
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
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
                href="/contact"
                className="w-full px-8 py-5 rounded-full bg-white border border-black text-black text-[22px] font-normal text-center hover:bg-gray-100 transition-all hover:scale-105"
              >
                Get started for free
              </a>
              <a
                href="/contact"
                className="w-full px-8 py-5 rounded-full bg-black border border-white text-white text-[22px] font-normal text-center hover:bg-gray-900 transition-all hover:scale-105"
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
                  <li><a href="/#services" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Brand Strategy</a></li>
                  <li><a href="/#services" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Web Design</a></li>
                  <li><a href="/#services" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Development</a></li>
                  <li><a href="/#services" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">SEO & Marketing</a></li>
                  <li><a href="/#services" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">AI Automation</a></li>
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Solutions</h4>
                <ul className="space-y-3">
                  <li><a href="/#work" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">For Agencies</a></li>
                  <li><a href="/#work" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">For Startups</a></li>
                  <li><a href="/#work" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">For Creatives</a></li>
                  <li><a href="/#work" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">For E-commerce</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li><a href="/#about" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Blog</a></li>
                  <li><a href="/#testimonials" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Case Studies</a></li>
                  <li><a href="/#about" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Tutorials</a></li>
                  <li><a href="/contact" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><a href="/#about" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/contact" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Contact</a></li>
                  <li><a href="/#" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="/#" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-[#eeeeee] text-sm font-medium mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="/#" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/#" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Terms of Use</a></li>
                  <li><a href="/#" className="text-[#b1b1b1] text-sm hover:text-white transition-colors">Cookie Policy</a></li>
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

// FAQ Accordion Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-black pr-4">
          {question}
        </h3>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="px-6 pb-5 text-gray-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
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
