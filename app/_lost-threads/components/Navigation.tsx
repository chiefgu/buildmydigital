'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const { getCartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-sm'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      {/* Top Bar */}
      <div className="bg-black text-white text-center py-2 px-6">
        <p className="text-xs uppercase tracking-wider">
          FREE SHIPPING WORLD WIDE ON ALL PREPAID ORDERS
        </p>
      </div>

      {/* Main Nav */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="font-bold uppercase text-sm tracking-wider hover:text-orange-500 transition-colors"
          >
            MENU
          </button>

          {/* Logo */}
          <Link href="/lost-threads" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-orange-500">
              LOST<br className="md:hidden"/>THREADS
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <button className="text-sm font-bold uppercase tracking-wider hover:text-orange-500 transition-colors hidden md:block">
              SEARCH HERE
            </button>
            <Link
              href="/lost-threads/cart"
              className="relative text-sm font-bold uppercase tracking-wider hover:text-orange-500 transition-colors"
            >
              SHOPPING BAG ({cartCount})
            </Link>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-bold uppercase text-sm mb-4 text-orange-500">COLLECTIONS</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/lost-threads/shop"
                        className="text-sm uppercase tracking-wide hover:text-orange-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        SHOP ALL
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/lost-threads/shop?category=tees"
                        className="text-sm uppercase tracking-wide hover:text-orange-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        T-SHIRTS
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/lost-threads/shop?category=longsleeve"
                        className="text-sm uppercase tracking-wide hover:text-orange-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        LONG SLEEVES
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/lost-threads/shop?category=sweatshirts"
                        className="text-sm uppercase tracking-wide hover:text-orange-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        SWEATSHIRTS
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold uppercase text-sm mb-4 text-orange-500">BRAND</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/lost-threads/about"
                        className="text-sm uppercase tracking-wide hover:text-orange-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        ABOUT US
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/lost-threads/contact"
                        className="text-sm uppercase tracking-wide hover:text-orange-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        CONTACT US
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
