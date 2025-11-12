# BUILDMYDIGITAL - Project Instructions for Claude Code

## Overview
This is the BUILDMYDIGITAL marketing site showcasing our digital infrastructure services for small businesses. The site emphasizes results-driven content, authentic client testimonials, and a modern, professional aesthetic with soft gradients and high contrast.

## Design System

### Core Philosophy
- **Professional & Soft**: Soft pastel gradients (200/100 color levels) with dark text for maximum readability
- **Image-First**: Real client photos and screenshots over illustrations
- **Results-Driven**: Specific metrics and testimonials with real data
- **Asymmetric Layouts**: 12-column grids with varying spans for visual interest

### Color Palette

#### Primary Colors
- **Charcoal**: `#2D3142` - Primary text, dark buttons
- **Orange/Coral**: `#EF8354` - Primary CTA color, brand accent
- **Off-White**: `#F8F7F5` - Background color
- **White**: `#FFFFFF` - Card backgrounds, overlays

#### Soft Gradient System (200/100 Levels)
We use **very soft pastels** for backgrounds to create professional, subtle gradients:

- **SaaS**: `from-blue-200 via-cyan-100 to-teal-100`
- **Coaches**: `from-orange-200 via-amber-100 to-yellow-100`
- **Freelancers**: `from-rose-200 via-pink-100 to-purple-100`
- **E-commerce**: `from-purple-200 via-fuchsia-100 to-pink-100`
- **Property**: `from-indigo-200 via-purple-100 to-violet-100`
- **Hero/Featured**: `from-orange-200 via-pink-100 to-purple-100`

**CRITICAL**: When these soft gradients are used:
- Text MUST be dark: `text-gray-900` for headings, `text-gray-700` for body, `text-gray-600` for labels
- Content boxes MUST use `bg-white/90` with `border-gray-200` for contrast
- Overlays on images should use `from-transparent via-black/50 to-black/80` to preserve text readability

### Typography

#### Font Family
- **Raveo** (custom font) for all text
- Loaded from `/public/fonts/` directory
- Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Raveo Display** variant for large headlines

#### Text Sizing
- **Hero Headlines**: `text-[clamp(48px,6vw,80px)]` with `leading-[1.05]` and `tracking-[-0.03em]`
- **Section Headers**: `text-[clamp(40px,5vw,64px)]` - centered with tight leading
- **Card Titles**: `text-3xl` to `text-4xl` with `font-bold`
- **Body Text**: `text-lg` with `text-xl` for section descriptions
- **Labels/Badges**: `text-xs` to `text-sm` with `uppercase` and `tracking-wider`

#### Text Colors
- **On light backgrounds**: `text-gray-900` (headings), `text-gray-700` (body), `text-gray-600` (labels)
- **On dark backgrounds/images**: `text-white` with gradient overlays for contrast
- **Gradient text** (sparingly): `bg-gradient-to-r from-orange-200 via-pink-200 to-purple-200` with `text-transparent bg-clip-text`

### Layout System

#### Container Widths
- **Default sections**: `max-w-[1400px]` - generous width for impact
- **Forms**: `max-w-[1000px]` - narrower for better UX
- **Horizontal padding**: `px-6` on all sections

#### Section Spacing
- **Standard**: `paddingTop: '120px'` and `paddingBottom: '120px'`
- Applied via inline styles to ensure consistency

#### Grid Patterns
Use **12-column grid** with asymmetric layouts:
- **Featured card**: 7 or 8 columns
- **Secondary cards**: 4 or 5 columns
- **Equal cards**: 4+4+4 or 6+6 splits
- **Mobile**: Always single column (`lg:col-span-X`)

Example:
```jsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  <div className="lg:col-span-7">Large featured item</div>
  <div className="lg:col-span-5">Smaller item</div>
</div>
```

### Component Patterns

#### Cards
```jsx
<div className="bg-gradient-to-br from-blue-200 via-cyan-100 to-teal-100 rounded-3xl p-8 overflow-hidden">
  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
    <h3 className="text-4xl font-bold text-gray-900 mb-3">Title</h3>
    <p className="text-gray-700 text-lg">Description</p>
  </div>
</div>
```

#### Buttons
- **Primary CTA**: `bg-[#EF8354]` with `text-white`, `rounded-full`, `px-8 py-4`, `text-lg font-semibold`
- **Secondary**: `bg-white/90` with `text-gray-900`, same styling
- **Dark variant**: `bg-gray-900` with `text-white`
- **Hover states**: `hover:bg-orange-600` (or darker shade), `hover:scale-105`, `transition-all`

#### Badges
```jsx
<span className="inline-block bg-blue-500/10 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
  Badge Text
</span>
```

#### Metric Cards
```jsx
<div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
  <div className="text-2xl font-bold text-gray-900">{value}</div>
  <div className="text-xs text-gray-600">{label}</div>
</div>
```

### Animation Patterns

#### Scroll-Triggered Animations (Framer Motion)
```jsx
import { motion } from 'framer-motion';

// Basic fade-in
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>

// Staggered children
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Background image zoom
<motion.div
  initial={{ scale: 1.15, y: -20 }}
  whileInView={{ scale: 1, y: 0 }}
  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
  viewport={{ once: false, amount: 0.3 }}
>
```

#### Hover Animations
```jsx
<motion.div
  whileHover={{
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3 }
  }}
>
```

### Image Strategy

#### Real Client Images
- Stored in `/public/clients/{client-name}/`
- Use actual screenshots, photos, and logos
- Optimize with Next.js Image component

#### Image Overlays
- **Light gradient backgrounds**: No overlay needed (use dark text)
- **Photo backgrounds**: `bg-gradient-to-b from-transparent via-black/50 to-black/80`
- **Dark overlays**: Ensure white text has sufficient contrast

#### Image Positioning
```jsx
<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  fill
  className="object-cover"
  style={{ objectPosition: '50% 30%' }} // Adjust to show important parts
  sizes="(max-width: 1024px) 100vw, 66vw"
/>
```

### Client Testimonials

#### Structure
- Use real client names, companies, and industries
- Include specific metrics with numbers and timeframes
- Display client logo in white background box
- Feature background photo of client's work/business

#### Example Pattern
```jsx
<div className="bg-gradient-to-br from-rose-200 via-pink-100 to-purple-100 rounded-3xl p-8 relative overflow-hidden">
  {/* Animated background image */}
  <motion.div className="absolute inset-0" {...animationProps}>
    <Image src="/clients/client-name/hero.jpg" fill className="object-cover" />
  </motion.div>

  {/* Dark overlay for text contrast */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />

  {/* Content */}
  <div className="relative z-10">
    <div className="flex items-start gap-6 mb-6">
      {/* Logo in white box */}
      <div className="w-20 h-20 rounded-xl bg-white p-2">
        <Image src="/clients/client-name/logo.png" fill className="object-contain" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white">Client Name</h3>
        <span className="inline-block bg-blue-500/20 text-white px-3 py-1 rounded-full text-xs">
          Industry Badge
        </span>
        <p className="text-white/80 text-sm">Job Title, Company</p>
      </div>
    </div>

    <blockquote className="text-lg text-white mb-6">
      "Testimonial quote with specific results..."
    </blockquote>

    <div className="grid grid-cols-3 gap-3">
      {metrics.map(metric => (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <div className="text-2xl font-bold text-white">{metric.value}</div>
          <div className="text-xs text-white/80">{metric.label}</div>
        </div>
      ))}
    </div>
  </div>
</div>
```

## Development Guidelines

### File Structure
```
buildmydigital-site/
├── app/
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── contact/           # Contact page
├── components/            # Reusable components
├── context/               # Documentation
│   ├── design-principles.md
│   └── style-guide.md
└── public/
    ├── fonts/            # Raveo font files
    └── clients/          # Client images
```

### Best Practices

#### Code Quality
- Use TypeScript for type safety
- Prefer functional components with hooks
- Use `useReducedMotion()` to respect accessibility preferences
- Keep components under 500 lines (extract helpers if needed)

#### Performance
- Always use Next.js `<Image>` component with `sizes` prop
- Lazy load below-the-fold content
- Use `priority` prop for hero images
- Optimize animations with `will-change` sparingly

#### Accessibility
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for all images
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast (4.5:1 for body, 3:1 for large text)

### Common Tasks

#### Adding a New Client Testimonial
1. Create folder: `/public/clients/{client-name}/`
2. Add images: `logo.png`, `hero.jpg` (and any others)
3. Update testimonial card in `page.tsx` with real data
4. Test image positioning with `objectPosition`

#### Changing Gradients
- Always use 200/100 color levels for soft, professional look
- Test with dark text (`text-gray-900`) on light backgrounds
- Use content boxes with `bg-white/90` and `border-gray-200`

#### Adding New Sections
1. Start with container: `max-w-[1400px] mx-auto px-6`
2. Add section spacing: `paddingTop: '120px', paddingBottom: '120px'`
3. Center headers: `text-center mb-16`
4. Use asymmetric grid for cards
5. Add Framer Motion animations

## Testing Checklist

Before committing changes:
- [ ] Desktop view looks correct (1440px)
- [ ] Mobile view works (375px)
- [ ] Text is readable on all backgrounds
- [ ] Gradients are soft (200/100 levels)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Images load with proper aspect ratios
- [ ] Console has no errors
- [ ] All links work correctly

## Key Files Reference

- **Homepage**: `/app/page.tsx` - Main marketing page
- **Styles**: `/app/globals.css` - Global CSS and font definitions
- **Design Principles**: `/context/design-principles.md` - Comprehensive design checklist
- **Style Guide**: `/context/style-guide.md` - Detailed component patterns
- **This File**: `/Users/henry/Desktop/BUILDMYDIGITAL/CLAUDE.md` - Project instructions

## Contact

For questions about this project or design decisions, refer to the design documentation in `/context/` or review recent git commits for context.

---

**Last Updated**: October 2025
**Current Version**: Soft Gradient Redesign (200/100 color levels)
