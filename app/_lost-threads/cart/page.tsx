'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CartPage() {
  const shouldReduceMotion = useReducedMotion();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const fadeIn = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const slideIn = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : 20,
      transition: { duration: 0.3 },
    },
  };

  if (cart.length === 0) {
    return (
      <div className="pt-[120px] pb-24 px-6 min-h-screen flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center max-w-lg"
        >
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4 uppercase tracking-tight">Your Cart is Empty</h1>
          <p className="text-lg text-gray-600 mb-8">
            Start adding some pieces to your collection
          </p>
          <Link
            href="/lost-threads/shop"
            className="inline-block bg-orange-500 text-white px-12 py-4 text-lg font-bold uppercase tracking-wider hover:bg-orange-600 transition-all duration-300"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping for now
  const total = subtotal + shipping;

  return (
    <div className="pt-[120px] pb-24 px-6 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Shopping Bag ({cart.length})
            </h1>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm font-bold uppercase tracking-wider hover:text-red-600 transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
          <Link
            href="/lost-threads/shop"
            className="text-sm font-bold uppercase tracking-wider hover:text-orange-500 transition-colors"
          >
            ← Continue Shopping
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  layout
                  variants={slideIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex gap-6 p-6 bg-white border border-gray-200 mb-4 hover:border-black transition-colors"
                >
                  {/* Product Image */}
                  <Link
                    href={`/lost-threads/product/${item.product.slug}`}
                    className="relative w-32 h-32 flex-shrink-0 overflow-hidden bg-gray-100 border border-gray-200"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link href={`/lost-threads/product/${item.product.slug}`}>
                      <h3 className="font-bold text-lg mb-1 uppercase tracking-wide hover:text-orange-500 transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-2 uppercase tracking-wider">
                      Size: <span className="font-bold">{item.size}</span>
                    </p>
                    <p className="font-bold text-lg">
                      {formatPrice(item.product.price, item.product.currency)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 bg-white border border-black hover:bg-black hover:text-white font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 bg-white border border-black hover:bg-black hover:text-white font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <p className="font-bold text-xl">
                      {formatPrice(
                        item.product.price * item.quantity,
                        item.product.currency
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="bg-gray-50 p-8 border border-gray-200">
              <h2 className="text-2xl font-bold uppercase mb-6 tracking-tight">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 uppercase text-sm tracking-wider">Subtotal</span>
                  <span className="font-bold">
                    {formatPrice(subtotal, 'GBP')}
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 uppercase text-sm tracking-wider">Shipping</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="uppercase">Total</span>
                    <span>{formatPrice(total, 'GBP')}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/lost-threads/checkout"
                className="block w-full text-center bg-orange-500 text-white py-5 text-lg font-bold uppercase tracking-wider hover:bg-orange-600 transition-all duration-300 mb-4"
              >
                Proceed to Checkout
              </Link>

              <p className="text-xs text-gray-500 text-center uppercase tracking-wider">
                Secure checkout powered by Stripe
              </p>
            </div>

            {/* Shipping Info */}
            <div className="mt-6 bg-blue-50 p-6 border border-blue-200">
              <h3 className="font-bold uppercase text-sm mb-3 text-blue-900 tracking-wider">
                Free Shipping
              </h3>
              <p className="text-sm text-blue-800">
                We offer free standard shipping on all UK orders. International
                shipping calculated at checkout.
              </p>
            </div>

            {/* Returns Info */}
            <div className="mt-4 bg-gray-50 p-6 border border-gray-200">
              <h3 className="font-bold uppercase text-sm mb-3 tracking-wider">
                30-Day Returns
              </h3>
              <p className="text-sm text-gray-600">
                Not happy with your purchase? Return it within 30 days for a
                full refund.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
