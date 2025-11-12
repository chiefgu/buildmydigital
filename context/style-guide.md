# BUILDMYDIGITAL - Brand Style Guide

## Design Philosophy

**Core Principles:**
- **Personality over polish**: Asymmetric, bold layouts that feel human and intentional, not AI-generated
- **Image-driven storytelling**: Real photos and screenshots trump generic icons
- **Results-focused**: Show real metrics, real results, real outcomes
- **Lead generation optimized**: Every section should drive towards conversion
- **Professional but personable**: High-end without being corporate or stiff
- **Soft sophistication**: Soft pastel gradients (200/100 levels) with high-contrast dark text for readability

---

## Color Palette

### Primary Brand Colors
- **Primary Orange**: `#EF8354` (Brand accent, CTAs, highlights)
- **Dark Orange**: `#d97446` (Hover states, gradients)
- **Deep Navy**: `#2D3142` (Primary text, headings)
- **Pure Black**: `#000000` (Hero backgrounds, featured sections)

### Secondary Colors (Soft Gradients - 200/100 Levels)
**IMPORTANT**: Always use 200/100 Tailwind color levels for soft, professional gradients.

- **SaaS/Tech**: `from-blue-200 via-cyan-100 to-teal-100` (soft blue-cyan)
- **Coaches/Consulting**: `from-orange-200 via-amber-100 to-yellow-100` (soft warm tones)
- **Freelancers/Creative**: `from-rose-200 via-pink-100 to-purple-100` (soft rose-pink)
- **E-commerce**: `from-purple-200 via-fuchsia-100 to-pink-100` (soft purple-pink)
- **Property/Finance**: `from-indigo-200 via-purple-100 to-violet-100` (soft indigo)
- **Featured/Hero**: `from-orange-200 via-pink-100 to-purple-100` (soft brand gradient)

**NEVER USE**: 400/500/600 level colors - these create overly vibrant, unprofessional gradients

### Neutral Colors
- **White**: `#FFFFFF` (Main backgrounds)
- **Gray 50**: `#F9FAFB` (Metric card backgrounds on soft gradients)
- **Gray 100**: `#F3F4F6` (Borders, dividers)
- **Gray 200**: `#E5E7EB` (Borders for content boxes on soft gradients)
- **Gray 600**: `#4B5563` (Labels on soft gradient backgrounds)
- **Gray 700**: `#374151` (Body text on soft gradient backgrounds)
- **Gray 800**: `#1F2937` (Dark UI elements)
- **Gray 900**: `#111827` (Headings on soft gradient backgrounds, dark buttons)

---

## Typography

### Heading Scale
```css
/* All headings use: */
font-weight: 600 (semibold) or 700 (bold)
line-height: 1.05 (tight)
letter-spacing: -0.03em (tighter)
color: #2D3142 (on light) or white (on dark)
```

**H1 - Hero Headlines**
- Size: `clamp(48px, 6vw, 80px)` - Fluid between 48-80px
- Example: "We Build The Sales Machine. You Collect The Revenue."
- Always bold (700)

**H2 - Section Headers**
- Size: `clamp(40px, 5vw, 64px)` - Fluid between 40-64px
- Example: "Stop Duct-Taping Your Revenue Together"
- Semibold (600) or Bold (700)
- Centered with `text-center`

**H3 - Card/Feature Titles**
- Size: `text-3xl` (30px) or `text-4xl` (36px)
- Example: "High-Converting Websites", "Coaches & Consultants"
- Bold (700)

**H4 - Testimonial Names**
- Size: `text-2xl` (24px)
- Example: "Marcus Thompson"
- Bold (700)

### Body Text
**Large Body (Descriptions)**
- Size: `text-xl` (20px)
- Color: `text-gray-600`
- Max-width: `max-w-[600px]` to `max-w-[800px]`
- Line-height: `leading-relaxed` (1.625)
- Always centered under section headers: `mx-auto`

**Medium Body**
- Size: `text-lg` (18px)
- Color: `text-white/90` (on dark/images with overlays) or `text-gray-700` (on light/soft gradients)

**Small Body/Labels**
- Size: `text-sm` (14px) or `text-xs` (12px)
- Used for badges, labels, metric labels

### Text Alignment
- **Section headers and descriptions**: Always `text-center`
- **Card content**: Left-aligned within cards
- **Forms**: Centered container, left-aligned labels

---

## Layout System

### Container Widths
```css
/* Standard sections (most content) */
max-w-[1400px] mx-auto

/* Contact form (narrower for focus) */
max-w-[1000px] mx-auto

/* Description text (readable line length) */
max-w-[600px] to max-w-[800px] mx-auto
```

### Grid System
**12-Column Asymmetric Grid** (preferred for visual interest)
```jsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  <div className="lg:col-span-8">Large featured card</div>
  <div className="lg:col-span-4">Tall sidebar card</div>
  <div className="lg:col-span-4">Small card 1</div>
  <div className="lg:col-span-4">Small card 2</div>
  <div className="lg:col-span-4">Small card 3</div>
  <div className="lg:col-span-12">Full-width banner</div>
</div>
```

**2x2 Grid** (for pillars/features)
```jsx
<div className="grid lg:grid-cols-2 gap-8">
  <div>Pillar 1</div>
  <div>Pillar 2</div>
  <div>Pillar 3</div>
  <div>Pillar 4</div>
</div>
```

### Spacing
- **Section vertical padding**: `paddingTop: '120px', paddingBottom: '120px'`
- **Section horizontal padding**: `px-6`
- **Section bottom margin for headers**: `mb-16` or `mb-20`
- **Card gaps**: `gap-6` (24px) or `gap-8` (32px)

---

## Component Patterns

### Cards

**Featured Card with Soft Gradient (Large, 7-8 column)**
```jsx
<div className="lg:col-span-7 group relative bg-gradient-to-br from-blue-200 via-cyan-100 to-teal-100 rounded-3xl overflow-hidden cursor-pointer h-[450px]">
  <div className="absolute inset-0 flex flex-col justify-end p-10">
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2 block">
        Label
      </span>
      <h3 className="text-4xl font-bold text-gray-900 mb-3">Card Title</h3>
      <p className="text-gray-700 text-lg mb-4">Description text</p>
      <span className="text-sm text-gray-600">
        Detail: <strong className="text-gray-900 text-lg">Value</strong>
      </span>
    </div>
  </div>
</div>
```

**Standard Card with Soft Gradient (4-5 column)**
```jsx
<div className="lg:col-span-4 group relative bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-100 rounded-3xl overflow-hidden cursor-pointer h-[400px]">
  <div className="absolute inset-0 flex flex-col justify-end p-8">
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <h3 className="text-3xl font-bold text-gray-900 mb-2">Title</h3>
      <p className="text-gray-700">Description</p>
    </div>
  </div>
</div>
```

**White Card (Testimonials, Pricing)**
```jsx
<div className="bg-white border border-gray-200 rounded-3xl p-8">
  {/* Content */}
</div>
```

**Testimonial Card with Photo Background**
```jsx
<div className="bg-gradient-to-br from-rose-200 via-pink-100 to-purple-100 rounded-3xl p-8 relative overflow-hidden">
  {/* Animated background image */}
  <motion.div
    className="absolute inset-0"
    initial={{ scale: 1.15, y: -20 }}
    whileInView={{ scale: 1, y: 0 }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: false, amount: 0.3 }}
  >
    <Image src="/path/to/photo.jpg" fill className="object-cover" style={{ objectPosition: '50% 30%' }} />
  </motion.div>

  {/* Dark overlay for text contrast */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>

  {/* Content with white text */}
  <div className="relative z-10">
    {/* White text content here */}
  </div>
</div>
```

### Glassmorphic Effects
```css
/* Light glassmorphism (on dark backgrounds/photos with overlays) */
bg-white/10 backdrop-blur-sm border border-white/20

/* Content boxes (on soft gradient backgrounds) */
bg-white/90 backdrop-blur-sm border border-gray-200

/* Metric cards (on dark backgrounds/photos) */
bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20

/* Metric cards (on soft gradient backgrounds) */
bg-gray-50 rounded-lg p-3 border border-gray-200
```

### Browser Window Mockups
```jsx
<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
  <div className="bg-gray-900 rounded-lg overflow-hidden">
    {/* Chrome/Traffic Lights */}
    <div className="bg-gray-800 px-3 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
      </div>
    </div>
    {/* Screenshot */}
    <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
      [Image: Screenshot description]
    </div>
  </div>
</div>
```

### Badges/Labels
```jsx
{/* Industry badge */}
<span className="text-xs font-bold uppercase tracking-widest text-white/80 mb-3 block">
  High-Ticket Programmes
</span>

{/* Pill badge */}
<div className="px-3 py-1 bg-[#EF8354]/20 backdrop-blur-sm rounded-full text-xs font-semibold text-[#EF8354]">
  High-Ticket Coach
</div>

{/* Popular tag */}
<div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#EF8354] to-orange-600 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg">
  MOST POPULAR
</div>
```

### Buttons

**Primary CTA (Solid Orange)**
```jsx
<a
  href="/contact"
  className="px-8 py-4 rounded-full bg-[#EF8354] text-white text-lg font-semibold hover:bg-orange-600 hover:shadow-lg transition-all hover:scale-105"
>
  Book a Call
</a>
```

**Secondary Button (Dark/Gray-900)**
```jsx
<a
  href="#"
  className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all"
>
  Get Started
</a>
```

**Tertiary Button (White on soft gradients)**
```jsx
<a
  href="#"
  className="px-8 py-4 bg-white/90 text-gray-900 rounded-full font-semibold hover:bg-white transition-all border border-gray-200"
>
  Learn More
</a>
```

**Ghost Button (Outline)**
```jsx
<a
  href="#"
  className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-black transition-all"
>
  Learn More
</a>
```

### Icons
**Do NOT use:**
- Generic SVG icons
- AI-generated icon sets
- Placeholder icons in final sections

**DO use:**
- Real product screenshots
- Actual photos of people/work
- Browser mockups for dashboards
- Numbered badges (1, 2, 3, 4) for steps/pillars

---

## Image Strategy

### Image Placeholders
All image placeholders must include:
1. **Visual context** - What should be in the image
2. **Dimensions** - Exact size requirements
3. **Style notes** - Professional, modern, energetic, etc.
4. **Overlay information** - What gradient will be applied

```jsx
{/* Example */}
<div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white/50 text-sm px-8 text-center">
  [Image: Website screenshot showing high-converting landing page with clear CTA]
</div>
```

### Image Types by Section
- **Industries**: Full bleed images with gradient overlays
- **Four Pillars**: Dashboard screenshots in browser mockups (16:10 aspect ratio)
- **Testimonials**: Professional headshots (square, 80x80 to 96x96 minimum)
- **Hero**: Background patterns or abstract shapes (minimal distraction)

### Aspect Ratios
- **Featured cards**: `h-[500px]` (tall hero)
- **Standard cards**: `h-[400px]` or `aspect-square`
- **Screenshots**: `aspect-[16/10]` (common for dashboards)
- **Headshots**: Square (1:1)
- **Banners**: Wide (varies, often 3:1 or 4:1)

---

## Gradients

### Soft Card Background Gradients (200/100 Levels)
**CRITICAL**: Always use 200/100 Tailwind color levels for professional, readable gradients.

```css
/* SaaS/Tech */
bg-gradient-to-br from-blue-200 via-cyan-100 to-teal-100

/* Coaches/Consulting */
bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-100

/* Freelancers/Creative */
bg-gradient-to-br from-rose-200 via-pink-100 to-purple-100

/* E-commerce */
bg-gradient-to-br from-purple-200 via-fuchsia-100 to-pink-100

/* Property/Finance */
bg-gradient-to-br from-indigo-200 via-purple-100 to-violet-100

/* Featured/Hero */
bg-gradient-to-br from-orange-200 via-pink-100 to-purple-100

/* Infrastructure Pillars */
- Foundation: from-orange-200 via-amber-100 to-yellow-100
- Engine: from-purple-200 via-fuchsia-100 to-pink-100
- Intelligence: from-emerald-200 via-teal-100 to-cyan-100
- Execution: from-blue-200 via-indigo-100 to-purple-100
```

**Text on soft gradients MUST use:**
- Headings: `text-gray-900`
- Body: `text-gray-700`
- Labels: `text-gray-600`
- Content boxes: `bg-white/90 border-gray-200`

### Photo Overlay Gradients
When soft gradient backgrounds include photos, add dark overlay for text readability:
```css
/* Standard photo overlay */
bg-gradient-to-b from-transparent via-black/50 to-black/80

/* Light photo overlay */
bg-gradient-to-b from-transparent via-black/20 to-black/60
```

### Hero Gradient Accents
```jsx
/* Hero background blob (very subtle) */
<div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-200/10 via-pink-200/10 to-purple-200/10 rounded-full blur-3xl -mr-[400px] -mt-[200px]"></div>
```

---

## Transitions & Animations

### Standard Transitions
```css
transition-all duration-300
transition-colors duration-300
```

### Hover States
```css
/* Cards */
cursor-pointer
hover:scale-[1.02] transition-transform duration-300

/* Buttons */
hover:scale-105 transition-all
hover:shadow-lg hover:shadow-[#EF8354]/30

/* Links */
hover:text-[#EF8354] transition-colors
```

### Glass Effect Transitions
```jsx
/* Navigation bar */
className="bg-white/80 backdrop-blur-md transition-all duration-300"
```

---

## Section Backgrounds

### Pattern
Alternate between white and subtle backgrounds for visual rhythm:

1. **Hero**: `bg-black` (dark, bold entry)
2. **Industries**: `bg-white` (clean, bright)
3. **Four Pillars**: `bg-black text-white` (dark, dramatic)
4. **Pricing**: `bg-white` (clean, clear)
5. **Testimonials**: `bg-gradient-to-b from-white to-gray-50` (subtle)
6. **Contact**: `bg-white` (focused, clean)
7. **Footer**: `bg-black text-white` (strong close)

---

## Navigation

### Style
```jsx
<nav className="fixed top-6 left-0 right-0 z-50 px-6">
  <div className="max-w-[1400px] mx-auto bg-white/80 backdrop-blur-md rounded-[20px] shadow-lg px-6 py-3 border border-gray-100">
    {/* Content */}
  </div>
</nav>
```

### Characteristics
- Fixed position with top margin (floating effect)
- Glassmorphic background
- Rounded with generous border radius
- Max width matches content sections
- Horizontal padding for breathing room

---

## Metrics & Results Display

### Inline Metrics (within cards)
```jsx
<div className="flex items-center gap-3">
  <span className="text-sm text-white/80">Client avg:</span>
  <span className="text-2xl font-bold text-white">£87k/mo</span>
</div>
```

### Grid Metrics (structured data)
**On dark backgrounds or photos with overlays:**
```jsx
<div className="grid grid-cols-2 gap-3">
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
    <div className="text-2xl font-bold text-white">28%</div>
    <div className="text-xs text-white/80">Avg. Conversion</div>
  </div>
</div>
```

**On soft gradient backgrounds:**
```jsx
<div className="grid grid-cols-2 gap-3">
  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
    <div className="text-2xl font-bold text-gray-900">28%</div>
    <div className="text-xs text-gray-600">Avg. Conversion</div>
  </div>
</div>
```

### Large Stats
```jsx
<div className="text-center">
  <div className="text-3xl font-bold text-black mb-1">24hrs</div>
  <div className="text-sm text-gray-600">Response Time</div>
</div>
```

---

## Forms

### Contact Form Style
```jsx
<div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12">
  {/* Inputs */}
  <input
    type="text"
    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EF8354] focus:border-transparent"
  />

  {/* Submit button */}
  <button className="w-full px-8 py-4 bg-gradient-to-r from-[#EF8354] to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
    Book Your Free Revenue Audit
  </button>
</div>
```

### Characteristics
- Subtle gray background for form container
- Rounded inputs with focus ring
- Full-width gradient submit button
- Clear labels above inputs
- Generous padding throughout

---

## Responsive Behavior

### Breakpoints
- **Mobile**: Default (< 1024px)
- **Desktop**: `lg:` prefix (≥ 1024px)

### Mobile Adaptations
```jsx
{/* Grid collapses to single column */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

{/* Text size reduces naturally via clamp() */}
className="text-[clamp(40px,5vw,64px)]"

{/* Padding adjusts */}
className="p-6 lg:p-10"

{/* Hide/show elements */}
className="hidden lg:flex"
```

---

## Writing Style

### Headlines
- **Direct and benefit-focused**: "We Build The Sales Machine. You Collect The Revenue."
- **Contrarian/provocative**: "Stop Duct-Taping Your Revenue Together"
- **Outcome-driven**: "Ready To Scale Your Revenue?"

### Descriptions
- **Conversational but professional**: "You don't need more tools. You need a complete system..."
- **Specific numbers**: "£10k-£500k/month", "42% close rate", "£140k in 60 days"
- **Active voice**: "We build" not "We can build"

### CTAs
- **Action-oriented**: "Book Your Free Revenue Audit" (not "Learn More")
- **Value-explicit**: "Get Results Like These"
- **Urgency when appropriate**: "Apply Now" for limited spots

---

## Quality Checklist

Before considering any section complete, verify:

- ✅ No generic SVG icons (use images, numbers, or photos instead)
- ✅ All images have detailed placeholder comments
- ✅ Headers are centered with `text-center`
- ✅ Descriptions use `mx-auto` for centering
- ✅ Real metrics included (not "XX%" or "10x")
- ✅ Asymmetric grid used (not uniform 3-column)
- ✅ Glassmorphic effects on overlay elements
- ✅ Gradient overlays on image placeholders
- ✅ Consistent spacing (`paddingTop/Bottom: '120px'`)
- ✅ Container is `max-w-[1400px]` (or 1000px for forms)
- ✅ Hover states on interactive elements
- ✅ Mobile responsiveness considered

---

## Anti-Patterns (What NOT to Do)

### ❌ Don't Use:
- Tiny circular avatars (12x12, 16x16) - Use proper headshots (80x80+)
- Generic SVG icon libraries - Use real screenshots or photos
- Uniform 3-column grids - Use asymmetric 12-column layouts
- Centered container widths of 1200px - Use 1400px for impact
- Left-aligned section headers - Always center headers
- Generic "Learn More" CTAs - Be specific about value
- Placeholder metrics (XX%, 10x) - Use real numbers
- Stock photo aesthetic - Real, authentic imagery only
- **Vibrant gradients (400/500/600 levels)** - Use soft pastels (200/100) instead
- **White text on soft pastels** - Use dark text (gray-900/700/600) instead
- **Gradient buttons** - Use solid colors (orange or gray-900)

### ✅ Do Use:
- Large, prominent photos and screenshots
- Asymmetric, magazine-style layouts
- Real data and specific results
- Glassmorphic overlays and depth
- Bold, confident copy
- Strategic white space
- **Soft pastel gradients (200/100 color levels)**
- **Dark text on soft gradient backgrounds (gray-900/700/600)**
- **White/90 content boxes with gray-200 borders on soft gradients**
- Dark overlays on photos for text readability

---

## Technical Notes

### Technologies
- **Framework**: Next.js 15.5.4 (App Router)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

### File Structure
```
/app
  page.tsx           - Homepage with all sections
/components
  Navigation.tsx     - Main nav component
/context
  style-guide.md     - This file
  design-principles.md - Design review checklist
/IMAGE-REQUIREMENTS.md - Detailed image specifications
```

### Development Workflow
1. Always reference this style guide before creating new sections
2. Use IMAGE-REQUIREMENTS.md when adding image placeholders
3. Test responsive behavior at 1440px and 375px viewports
4. Verify glassmorphic effects render correctly
5. Check that all metrics are real, not placeholders

---

## Future Additions

As the site evolves, document:
- Blog post card styles
- Case study layouts
- Animated elements
- Loading states
- Error states
- Modal designs
- Additional form patterns

---

**Last Updated**: October 2025
**Maintained By**: BUILDMYDIGITAL Development Team
**Current Version**: Soft Gradient System (200/100 color levels with dark text)
