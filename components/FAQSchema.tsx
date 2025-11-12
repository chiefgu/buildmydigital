export default function FAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is commission-only sales and how does it work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Commission-only sales means you pay our closers only when they close a deal for you. There's zero upfront cost, no base salary, and no monthly retainer. Our trained sales team works on a 10-20% commission per closed deal, so we only succeed when you succeed. It's completely risk-free for your business."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to see results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most clients see their first results within 48 hours of going live. Our websites deploy in 2 days, closers are onboarded within 1 week, and we target 2-3x ROI within 90 days. The complete revenue infrastructure is typically operational within 2-4 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between Level 1, 2, and 3 packages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Level 1 (£0 upfront + 10-20% commission) includes commission-only closers only - perfect if you already have traffic. Level 2 (£1,500/mo + 10-15% commission) adds the complete infrastructure: website, automation, analytics, and closers. Level 3 (£2,500/mo + 10% commission) includes everything in Level 2 plus content production, strategic consulting, and priority support."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with businesses outside the UK?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! While we're based in the UK and optimize for UK businesses, we work with clients globally. Our revenue infrastructure, marketing automation, and commission-only closers work for businesses in any English-speaking market including USA, Canada, Australia, and across Europe."
        }
      },
      {
        "@type": "Question",
        "name": "What industries do you work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in high-ticket and subscription businesses including: SaaS companies, coaches and consultants (£5k-£50k programmes), freelancers and creatives, e-commerce businesses, and property & finance professionals. Our revenue infrastructure works best for businesses selling products or services over £500."
        }
      },
      {
        "@type": "Question",
        "name": "Can I cancel my subscription anytime?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We have no long-term contracts. You can cancel with 30 days' notice at any time. For Level 1 (commission-only closers), there's zero upfront cost and you only pay when deals close, making it completely risk-free."
        }
      },
      {
        "@type": "Question",
        "name": "How do you train your commission-only closers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our closers are trained on your specific offer, brand voice, and sales process. We create custom sales scripts, provide objection-handling frameworks, and conduct role-play training. Each closer goes through a minimum 2-week onboarding program before taking live calls. We track and record all calls for continuous improvement."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in the marketing automation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our marketing automation includes: 24/7 lead capture and qualification, automated email and SMS sequences, booking funnel automation, lead scoring and prioritization, CRM integration, and real-time analytics dashboard. The system works completely hands-free and saves clients an average of 20+ hours per week."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
