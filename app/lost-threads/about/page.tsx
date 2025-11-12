'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/lost-threads/hero/hero-1.jpg"
            alt="Lost Threads Story"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-10 text-center px-6"
        >
          <h1 className="lt-hero-text text-white mb-4">Our Story</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            More than clothing. A movement.
          </p>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-[900px] mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
              The Beginning
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Lost Threads started with a simple question: What if clothing could
              mean more? What if every piece you wore told a story, sparked a
              conversation, and challenged the status quo?
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              We're not interested in fast fashion or disposable trends. We
              create pieces that last—physically, visually, and emotionally.
              Every design is intentional. Every thread matters.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
              Our Philosophy
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Streetwear isn't just about what you wear—it's about who you are.
              We design for the creatives, the dreamers, the ones who don't fit
              in a box.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our minimalist graphics speak volumes. Our premium materials feel
              as good as they look. And our limited drops mean you're wearing
              something truly special, not mass-produced.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
              The Future
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              We're just getting started. Lost Threads is more than a brand—it's
              a community of people who refuse to blend in. People who value
              quality over quantity. People who want their clothes to tell their
              story.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Join us. Wear your story.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16 uppercase"
          >
            Our Values
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold mb-4 uppercase">
                Sustainability
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Premium organic materials, ethical production, and minimal waste.
                Fashion that doesn't cost the earth.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-bold mb-4 uppercase">Quality</h3>
              <p className="text-gray-400 leading-relaxed">
                Heavyweight fabrics, reinforced stitching, and timeless designs.
                Built to last years, not seasons.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-4 uppercase">
                Creativity
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Bold graphics, thoughtful design, and pieces that spark
                conversation. Wear what matters.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-[800px] mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Explore our latest collection and find your next statement piece.
          </p>
          <Link
            href="/lost-threads/shop"
            className="lt-button inline-block bg-black text-white px-12 py-5 rounded-full text-lg font-bold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300"
          >
            Shop the Collection
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
