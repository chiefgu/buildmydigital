import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";
import FAQSchema from "@/components/FAQSchema";
import ConditionalWidgets from "@/components/ConditionalWidgets";
import AttributionTracker from "@/components/AttributionTracker";
import PerformanceProvider from "@/components/PerformanceProvider";

export const metadata: Metadata = {
  metadataBase: new URL('https://buildmydigital.com'),
  title: {
    default: "BUILDMYDIGITAL - Commission-Only Closers & Revenue Infrastructure for UK Businesses",
    template: "%s | BUILDMYDIGITAL"
  },
  description: "Complete revenue infrastructure for UK businesses. Commission-only closers (0% upfront), conversion-optimised websites, marketing automation & real-time analytics. 2-3x ROI in 90 days. Book your free revenue audit.",
  keywords: [
    "commission only closers UK",
    "sales closers commission only",
    "revenue infrastructure",
    "marketing automation UK",
    "conversion optimisation",
    "lead generation UK",
    "sales automation",
    "business growth services UK",
    "high ticket sales closers",
    "performance based sales team",
    "SaaS marketing automation",
    "coaching business automation",
    "conversion rate optimisation UK",
    "real-time analytics dashboard"
  ],
  authors: [{ name: "BUILDMYDIGITAL" }],
  creator: "BUILDMYDIGITAL",
  publisher: "BUILDMYDIGITAL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://buildmydigital.com',
    siteName: 'BUILDMYDIGITAL',
    title: 'BUILDMYDIGITAL - Commission-Only Closers & Revenue Infrastructure',
    description: 'Complete revenue infrastructure for UK businesses. Commission-only closers, conversion-optimised websites, marketing automation. 2-3x ROI in 90 days.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BUILDMYDIGITAL - Revenue Infrastructure for UK Businesses',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BUILDMYDIGITAL - Commission-Only Closers & Revenue Infrastructure',
    description: 'Complete revenue infrastructure for UK businesses. Commission-only closers, conversion-optimised websites, marketing automation. 2-3x ROI in 90 days.',
    images: ['/og-image.jpg'],
    creator: '@buildmydigital',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Replace with your actual GA4 Measurement ID
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

  // Structured Data for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BUILDMYDIGITAL",
    "alternateName": "Build My Digital",
    "url": "https://buildmydigital.com",
    "logo": "https://buildmydigital.com/logo.svg",
    "description": "Complete revenue infrastructure for UK businesses. Commission-only closers, conversion-optimised websites, marketing automation & real-time analytics.",
    "email": "hello@buildmydigital.com",
    "sameAs": [
      "https://www.linkedin.com/company/buildmydigital",
      "https://twitter.com/buildmydigital"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "knowsAbout": [
      "Marketing Automation",
      "Sales Automation",
      "Conversion Rate Optimization",
      "Lead Generation",
      "Revenue Growth",
      "Business Development"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "BUILDMYDIGITAL",
    "image": "https://buildmydigital.com/logo.svg",
    "@id": "https://buildmydigital.com",
    "url": "https://buildmydigital.com",
    "telephone": "",
    "email": "hello@buildmydigital.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "GB"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "£0 - £2500/month",
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Revenue Infrastructure & Sales Automation",
    "provider": {
      "@type": "Organization",
      "name": "BUILDMYDIGITAL"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Revenue Infrastructure Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commission-Only Closers",
            "description": "Trained sales team that only gets paid when you get paid. 35% average close rate, zero upfront cost."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "High-Converting Websites",
            "description": "Conversion-optimised websites with <1s load time and 28% average conversion rate."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Automation",
            "description": "24/7 lead capture, qualification and nurturing. Saves 20+ hours per week."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Real-Time Analytics",
            "description": "Track every lead, call and conversion in one dashboard. £42 average cost per lead, 3.2x ROI."
          }
        }
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <FAQSchema />
      </head>
      <body className="antialiased">
        {/* Google Analytics 4 - GDPR Compliant Setup */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Set to 'denied' by default for GDPR compliance
            // This ensures no tracking happens until user consents
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });

            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <Providers>
          <AttributionTracker />
          <PerformanceProvider />
          <ConditionalWidgets />
          {children}
        </Providers>
      </body>
    </html>
  );
}
