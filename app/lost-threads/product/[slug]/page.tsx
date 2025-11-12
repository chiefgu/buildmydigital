'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getProductBySlug, formatPrice } from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="pt-32 pb-24 px-6 text-center min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link
            href="/lost-threads/shop"
            className="text-black underline font-semibold"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    addToCart(product, selectedSize, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideIn = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div className="pt-[120px] pb-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 font-bold uppercase text-sm tracking-wider hover:text-orange-500 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Shop</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            {/* Main Image */}
            <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100 border border-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[3/4] overflow-hidden bg-gray-100 transition-all ${
                    selectedImage === index
                      ? 'border-4 border-black'
                      : 'border border-gray-200 hover:border-black'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 25vw, 12.5vw"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial="hidden" animate="visible" variants={slideIn}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">{product.name}</h1>
            <p className="text-3xl font-bold mb-6">
              {formatPrice(product.price, product.currency)}
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="font-bold uppercase tracking-wider text-sm">
                  Select Size
                </label>
                <button className="text-sm font-bold uppercase tracking-wider hover:text-orange-500 transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 font-bold uppercase text-sm transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-white text-black border border-black hover:bg-black hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="font-bold uppercase tracking-wider text-sm mb-4 block">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-white border border-black hover:bg-black hover:text-white font-bold text-xl transition-colors"
                >
                  -
                </button>
                <span className="font-bold text-xl w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-white border border-black hover:bg-black hover:text-white font-bold text-xl transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-orange-500 text-white py-5 text-lg font-bold uppercase tracking-wider hover:bg-orange-600 transition-all duration-300 mb-4"
            >
              {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>

            <Link
              href="/lost-threads/cart"
              className="block w-full text-center border-2 border-black text-black py-5 text-lg font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300"
            >
              View Cart
            </Link>

            {/* Product Details */}
            <div className="mt-12 space-y-6">
              <div>
                <h3 className="font-bold uppercase tracking-wider text-sm mb-2">
                  Material
                </h3>
                <p className="text-gray-700">{product.material}</p>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wider text-sm mb-2">
                  Fit
                </h3>
                <p className="text-gray-700">{product.fit}</p>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wider text-sm mb-2">
                  Care Instructions
                </h3>
                <ul className="space-y-1 text-gray-700">
                  {product.care.map((instruction, index) => (
                    <li key={index}>• {instruction}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
