import type { Metadata } from 'next';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import './styles.css';

export const metadata: Metadata = {
  title: 'Lost Threads - Streetwear Redefined',
  description: 'Minimalist streetwear for the modern era. Every piece built to last, made to mean something.',
};

export default function LostThreadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main>{children}</main>
        <footer className="bg-black text-white py-16 px-6 mt-32">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="font-bold text-xl mb-4">Lost Threads</h3>
                <p className="text-gray-400 text-sm">
                  Thoughtfully designed streetwear for the modern era.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/lost-threads/shop?category=tees" className="hover:text-white transition-colors">Tees</a></li>
                  <li><a href="/lost-threads/shop?category=longsleeve" className="hover:text-white transition-colors">Long Sleeves</a></li>
                  <li><a href="/lost-threads/shop?category=sweatshirts" className="hover:text-white transition-colors">Sweatshirts</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Info</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/lost-threads/about" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="/lost-threads/contact" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
              © 2024 Lost Threads. All rights reserved. <span className="mx-2">|</span> Powered by <a href="/" className="hover:text-white transition-colors">BUILDMYDIGITAL</a>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
