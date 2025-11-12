'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cart } = useCart();

  return (
    <div className="pt-[120px] pb-24 px-6 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl text-center"
      >
        <div className="bg-blue-50 border-2 border-blue-200 p-12">
          <div className="text-6xl mb-6">🚧</div>
          <h1 className="text-4xl font-bold mb-4 uppercase tracking-tight">Coming Soon</h1>
          <p className="text-xl text-gray-700 mb-8">
            Secure checkout with Stripe payment integration will be available shortly.
          </p>
          <div className="bg-white p-6 mb-8 border border-gray-200">
            <h3 className="font-bold uppercase text-sm mb-4 tracking-wider">For now, to complete your order:</h3>
            <ol className="text-left space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600">1.</span>
                <span>Email us at <a href="mailto:hello@lostthreads.co.uk" className="underline font-bold">hello@lostthreads.co.uk</a> with your cart items</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600">2.</span>
                <span>We'll send you a secure payment link</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600">3.</span>
                <span>Your order will ship within 1-3 business days</span>
              </li>
            </ol>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lost-threads/cart"
              className="inline-block bg-black text-white px-10 py-4 font-bold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300"
            >
              ← Back to Cart
            </Link>
            <Link
              href="/lost-threads/contact"
              className="inline-block border-2 border-black text-black px-10 py-4 font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
