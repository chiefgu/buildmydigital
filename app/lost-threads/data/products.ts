// Lost Threads Product Data
// E-commerce product catalog for Lost Threads streetwear brand

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  category: 'tees' | 'longsleeve' | 'sweatshirts';
  images: string[];
  description: string;
  material: string;
  fit: string;
  sizes: string[];
  care: string[];
  inStock: boolean;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'uno-tee-black',
    name: 'UNO Tee - Sand',
    price: 35,
    currency: 'GBP',
    category: 'tees',
    images: [
      '/lost-threads/products/uno-tee-black/front.jpg',
      '/lost-threads/products/uno-tee-black/back.jpg',
      '/lost-threads/products/uno-tee-black/lifestyle-1.jpg',
      '/lost-threads/products/uno-tee-black/lifestyle-2.jpg',
    ],
    description:
      'Minimalist design meets maximum impact. Our signature UNO tee features a clean graphic on premium heavyweight cotton. The kind of essential that elevates every outfit.',
    material: '100% organic cotton, 220gsm, pre-shrunk',
    fit: 'Regular fit, slightly oversized',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    care: [
      'Machine wash cold',
      'Tumble dry low or hang dry',
      'Iron inside out on low heat',
      'Do not bleach',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    slug: 'waves-tee-white',
    name: 'Waves Tee - White',
    price: 32,
    currency: 'GBP',
    category: 'tees',
    images: [
      '/lost-threads/products/waves-tee-white/front.jpg',
      '/lost-threads/products/waves-tee-white/back.jpg',
      '/lost-threads/products/waves-tee-white/lifestyle-1.jpg',
      '/lost-threads/products/waves-tee-white/lifestyle-2.jpg',
    ],
    description:
      'Inspired by the ebb and flow of creative energy. Our Waves design captures movement in stillness. Printed on soft-hand cotton that gets better with every wear.',
    material: '100% cotton, 200gsm',
    fit: 'Regular fit',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    care: [
      'Machine wash cold',
      'Tumble dry low or hang dry',
      'Iron inside out on low heat',
      'Do not bleach',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    slug: 'transitions-tee-navy',
    name: 'Transitions Tee - Navy',
    price: 32,
    currency: 'GBP',
    category: 'tees',
    images: [
      '/lost-threads/products/transitions-tee-navy/front.jpg',
      '/lost-threads/products/transitions-tee-navy/back.jpg',
      '/lost-threads/products/transitions-tee-navy/lifestyle-1.jpg',
      '/lost-threads/products/transitions-tee-navy/lifestyle-2.jpg',
    ],
    description:
      'From one moment to the next. Our Transitions graphic explores the beauty of change through abstract geometric forms. A conversation starter disguised as everyday wear.',
    material: '100% cotton, 200gsm',
    fit: 'Regular fit',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    care: [
      'Machine wash cold',
      'Tumble dry low or hang dry',
      'Iron inside out on low heat',
      'Do not bleach',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    slug: 'faces-longsleeve-black',
    name: 'Faces Long Sleeve - Black',
    price: 45,
    currency: 'GBP',
    category: 'longsleeve',
    images: [
      '/lost-threads/products/faces-longsleeve-black/front.jpg',
      '/lost-threads/products/faces-longsleeve-black/back.jpg',
      '/lost-threads/products/faces-longsleeve-black/lifestyle-1.jpg',
      '/lost-threads/products/faces-longsleeve-black/lifestyle-2.jpg',
    ],
    description:
      'Bold statement piece. The Faces design pushes boundaries with its striking graphic across premium long sleeve construction. For those who don\'t blend in.',
    material: '100% heavyweight cotton, 240gsm',
    fit: 'Relaxed fit, dropped shoulders',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    care: [
      'Machine wash cold',
      'Tumble dry low or hang dry',
      'Iron inside out on low heat',
      'Do not bleach',
    ],
    inStock: true,
    featured: false,
  },
  {
    id: '5',
    slug: 'waves-sweatshirt-navy',
    name: 'Waves Sweatshirt - Navy',
    price: 55,
    currency: 'GBP',
    category: 'sweatshirts',
    images: [
      '/lost-threads/products/waves-sweatshirt-navy/front.jpg',
      '/lost-threads/products/waves-sweatshirt-navy/back.jpg',
      '/lost-threads/products/waves-sweatshirt-navy/lifestyle-1.jpg',
      '/lost-threads/products/waves-sweatshirt-navy/lifestyle-2.jpg',
    ],
    description:
      'Elevated comfort. Our Waves sweatshirt features embroidered detailing on 400gsm French terry. The piece you\'ll reach for every morning.',
    material: '80% cotton / 20% polyester, 400gsm French terry',
    fit: 'Regular fit, ribbed cuffs and hem',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    care: [
      'Machine wash cold',
      'Tumble dry low',
      'Do not iron directly on print',
      'Do not bleach',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: '6',
    slug: 'transitions-sweatshirt-charcoal',
    name: 'Transitions Sweatshirt - Charcoal',
    price: 55,
    currency: 'GBP',
    category: 'sweatshirts',
    images: [
      '/lost-threads/products/transitions-sweatshirt-charcoal/front.jpg',
      '/lost-threads/products/transitions-sweatshirt-charcoal/back.jpg',
      '/lost-threads/products/transitions-sweatshirt-charcoal/lifestyle-1.jpg',
      '/lost-threads/products/transitions-sweatshirt-charcoal/lifestyle-2.jpg',
    ],
    description:
      'The Transitions graphic in heavyweight sweatshirt form. Oversized fit, premium materials, lasting quality. Your new favorite layering piece.',
    material: '80% cotton / 20% polyester, 400gsm French terry',
    fit: 'Oversized fit, dropped shoulders',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    care: [
      'Machine wash cold',
      'Tumble dry low',
      'Do not iron directly on print',
      'Do not bleach',
    ],
    inStock: true,
    featured: false,
  },
];

// Helper functions
export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: Product['category']) =>
  products.filter((p) => p.category === category);

export const formatPrice = (price: number, currency: string = 'GBP') => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(price);
};
