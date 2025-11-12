'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts, formatPrice, products } from './data/products';

export default function LostThreadsHome() {
  const shouldReduceMotion = useReducedMotion();
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="bg-white">
      {/* Hero Section - Editorial Style */}
      <section className="relative h-screen flex items-end overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/lost-threads/hero/hero-1.jpg"
            alt="Lost Threads"
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 pb-24">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <h1 className="text-[clamp(64px,10vw,160px)] font-bold uppercase leading-[0.9] tracking-tight text-white mb-6">
                LOST
                <br />
                <span className="text-orange-500">THREADS</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-xl">
                [NEW DROP]
              </p>
              <Link
                href="/lost-threads/shop"
                className="inline-block bg-orange-500 text-white px-10 py-4 text-lg font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors"
              >
                LIVE NOW
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collection - Tight Editorial Grid */}
      <section className="py-16">
        <div className="px-6 mb-12">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <h2 className="text-4xl md:text-5xl font-bold uppercase">NEW ARRIVALS</h2>
            <Link
              href="/lost-threads/shop"
              className="text-sm font-bold uppercase tracking-wider hover:text-orange-500 transition-colors"
            >
              VIEW ALL
            </Link>
          </div>
        </div>

        {/* Tight Grid - No Gaps */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/lost-threads/product/${product.slug}`}
              className="group relative aspect-[3/4] overflow-hidden border border-gray-200 hover:border-black transition-colors"
            >
              {/* Product Image */}
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Product Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm uppercase mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatPrice(product.price, product.currency)}
                    </p>
                  </div>
                  <button className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-orange-500 transition-colors ml-2">
                    <span className="text-2xl font-light">+</span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Full-Width Campaign Image */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="/lost-threads/hero/hero-1.jpg"
          alt="Campaign"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h2 className="text-[clamp(48px,8vw,120px)] font-bold uppercase mb-4">
              STREETWEAR
            </h2>
            <Link
              href="/lost-threads/shop"
              className="inline-block bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="py-16">
        <div className="px-6 mb-12">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <h2 className="text-4xl md:text-5xl font-bold uppercase">ESSENTIALS</h2>
            <Link
              href="/lost-threads/shop"
              className="text-sm font-bold uppercase tracking-wider hover:text-orange-500 transition-colors"
            >
              VIEW ALL
            </Link>
          </div>
        </div>

        {/* Tight Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <Link
              key={product.id}
              href={`/lost-threads/product/${product.slug}`}
              className="group relative aspect-[3/4] overflow-hidden border border-gray-200 hover:border-black transition-colors"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm uppercase mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatPrice(product.price, product.currency)}
                    </p>
                  </div>
                  <button className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-orange-500 transition-colors ml-2">
                    <span className="text-2xl font-light">+</span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
            "[ GET 10% OFF ]"
          </h2>
          <p className="text-lg mb-8 text-white/80">
            SUBSCRIBE TO THE LOST THREADS COMMUNITY.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white"
            />
            <button className="bg-orange-500 text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
