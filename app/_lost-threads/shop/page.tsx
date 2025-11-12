'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { products, formatPrice, Product } from '../data/products';

// Make this route dynamic
export const dynamic = 'force-dynamic';

function ShopContent() {
  const shouldReduceMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const categories = [
    { id: 'all', label: 'All Products', count: products.length },
    {
      id: 'tees',
      label: 'Tees',
      count: products.filter((p) => p.category === 'tees').length,
    },
    {
      id: 'longsleeve',
      label: 'Long Sleeves',
      count: products.filter((p) => p.category === 'longsleeve').length,
    },
    {
      id: 'sweatshirts',
      label: 'Sweatshirts',
      count: products.filter((p) => p.category === 'sweatshirts').length,
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="pt-[120px] pb-16 min-h-screen">
      <div className="px-6 mb-12">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-8">SHOP ALL</h1>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 font-bold uppercase tracking-wider text-xs transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-black hover:bg-black hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid - Tight Editorial Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4" key={selectedCategory}>
        {filteredProducts.map((product) => (
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

            {/* Secondary image on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Image
                src={product.images[1] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Featured badge */}
            {product.featured && (
              <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Featured
              </div>
            )}

            {/* Product Info - Bottom Overlay */}
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
                <button className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-orange-500 transition-colors ml-2 shrink-0">
                  <span className="text-2xl font-light">+</span>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <p className="text-xl text-gray-500">
            No products found in this category.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div>Loading...</div></div>}>
      <ShopContent />
    </Suspense>
  );
}
