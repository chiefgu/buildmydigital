# Design Principles & Review Checklist

## Core Design Principles

### 1. Personality Over Perfection
- **Asymmetry creates interest**: Avoid uniform grids. Use varying column spans (8+4, 4+4+4, etc.)
- **Human touch**: Real photos, real metrics, real results beat polished stock imagery
- **Soft sophistication**: Use soft pastel gradients (200/100 levels) with high-contrast dark text
- **Intentional imperfection**: Layouts should feel crafted, not templated

### 2. Image-First Storytelling
- **Show, don't illustrate**: Use actual screenshots, real photos, not icons or illustrations
- **Strategic placeholders**: Every image placeholder should have a detailed specification
- **Context matters**: Images should enhance the message, not just fill space
- **Quality over quantity**: Fewer, larger, more impactful images beat many small ones

### 3. Conversion-Focused Design
- **Clear hierarchy**: What should the user look at first, second, third?
- **Obvious CTAs**: Primary action should always be unmistakable
- **Trust signals**: Real metrics, client results, specific numbers build credibility
- **Friction reduction**: Make it easy to take the next step

### 4. Results-Driven Content
- **Specificity builds trust**: "£140k in 60 days" beats "significant results"
- **Data validates claims**: Show conversion rates, timelines, revenue figures
- **Client voice**: Real testimonials with names, companies, and results
- **Proof points**: Every claim should have evidence

### 5. Soft Gradient System
- **Color levels**: Always use 200/100 Tailwind levels for soft, professional gradients (e.g., `from-blue-200 via-cyan-100 to-teal-100`)
- **Never use**: 400/500/600 levels which create overly vibrant, unprofessional gradients
- **Text contrast**: Soft gradients require dark text (`text-gray-900`, `text-gray-700`, `text-gray-600`)
- **Content boxes**: Use `bg-white/90` with `border-gray-200` for high contrast against soft backgrounds
- **Image overlays**: When gradient backgrounds have photos, use `bg-gradient-to-b from-transparent via-black/50 to-black/80` for text readability

---

## Visual Design Checklist

### Typography ✓
- [ ] Section headers use `clamp(40px, 5vw, 64px)` or larger
- [ ] All headers are centered with `text-center`
- [ ] Descriptions are `text-xl` with `max-w-[600-800px] mx-auto`
- [ ] Line height is tight on headers (`leading-[1.05]`)
- [ ] Letter spacing is tightened on headers (`tracking-[-0.03em]`)
- [ ] Font weights are bold (700) or semibold (600) for headers
- [ ] Body text has sufficient contrast (gray-600 on white, white/90 on dark)

### Layout ✓
- [ ] Container width is `max-w-[1400px]` (or 1000px for forms)
- [ ] Sections have `paddingTop: '120px', paddingBottom: '120px'`
- [ ] Horizontal padding is `px-6` on sections
- [ ] Grid uses asymmetric layout (12-column with varying spans)
- [ ] Card gaps are consistent (`gap-6` or `gap-8`)
- [ ] Mobile responsive with single column fallback

### Color & Contrast ✓
- [ ] Brand orange (`#EF8354`) used for CTAs and accents
- [ ] Soft gradients use 200/100 Tailwind color levels only (not 400/500/600)
- [ ] Dark text on soft gradient backgrounds (`text-gray-900` for headings)
- [ ] Content boxes use `bg-white/90` with `border-gray-200` for contrast
- [ ] Text has sufficient contrast ratio (4.5:1 minimum for body, 3:1 for large text)
- [ ] Gradient overlays on photos use `via-black/50 to-black/80` for text readability
- [ ] Glassmorphic effects use semi-transparent backgrounds with backdrop-blur

### Images ✓
- [ ] No generic SVG icons in final sections
- [ ] All image placeholders have detailed HTML comments
- [ ] Proper aspect ratios applied (`aspect-[16/10]`, `aspect-square`, or fixed heights)
- [ ] Screenshots shown in browser mockups with traffic lights
- [ ] Headshots are large enough (80x80 minimum, prefer 96x96+)
- [ ] Full-bleed images in featured cards

### Components ✓
- [ ] Cards have `rounded-3xl` or `rounded-2xl` corners
- [ ] Cards with soft gradient backgrounds have dark text and white/90 content boxes
- [ ] Glassmorphic overlays use `bg-white/10 backdrop-blur-sm` (on dark backgrounds only)
- [ ] Buttons have clear hover states
- [ ] Interactive elements have `cursor-pointer`
- [ ] Badges and labels are appropriately sized
- [ ] Forms use focus rings on inputs

### Spacing ✓
- [ ] Consistent section spacing (120px vertical)
- [ ] Card internal padding is generous (`p-8` to `p-10`)
- [ ] Margins create visual rhythm (mb-16, mb-20 for headers)
- [ ] White space used strategically to create breathing room
- [ ] Elements don't feel cramped or cluttered

---

## Content Checklist

### Copy Quality ✓
- [ ] Headlines are benefit-driven, not feature-driven
- [ ] No generic phrases ("industry-leading", "best-in-class")
- [ ] Active voice used throughout
- [ ] Specific numbers instead of vague claims
- [ ] Conversational but professional tone

### CTAs ✓
- [ ] Primary CTA uses solid orange (`#EF8354`) or dark (`bg-gray-900`) background
- [ ] CTA text is action-oriented and value-explicit
- [ ] Every section has a clear next step
- [ ] No more than 2 competing CTAs per section
- [ ] Button sizes are appropriate to importance

### Social Proof ✓
- [ ] Real client names and companies
- [ ] Specific results with numbers and timeframes
- [ ] Industry context provided (badges, labels)
- [ ] Testimonials feel authentic, not generic
- [ ] Metrics are believable and verifiable

---

## Responsiveness Checklist

### Mobile (< 1024px) ✓
- [ ] Grids collapse to single column
- [ ] Text remains readable (minimum 16px for body)
- [ ] Touch targets are at least 44x44px
- [ ] Horizontal scrolling is eliminated
- [ ] Images scale appropriately
- [ ] Navigation works on mobile

### Desktop (≥ 1024px) ✓
- [ ] Asymmetric layouts display correctly
- [ ] Maximum content width is respected (1400px)
- [ ] Hover states enhance interactivity
- [ ] Multi-column grids render properly
- [ ] Large images load efficiently

### Cross-Browser ✓
- [ ] Glassmorphic effects work in all modern browsers
- [ ] Gradients render consistently
- [ ] Custom fonts load properly
- [ ] Layout doesn't break in Safari, Chrome, Firefox

---

## Performance Checklist

### Load Time ✓
- [ ] Images are optimized (WebP with fallbacks)
- [ ] No unnecessary JavaScript loaded
- [ ] CSS is minimal (Tailwind purges unused classes)
- [ ] Critical path rendering is optimized
- [ ] Lazy loading applied to below-fold content

### User Experience ✓
- [ ] Page doesn't jump during load (CLS < 0.1)
- [ ] Interactions feel responsive (< 100ms feedback)
- [ ] Smooth scrolling on anchor links
- [ ] No Flash of Unstyled Content (FOUC)

---

## Accessibility Checklist

### Semantic HTML ✓
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Links have descriptive text (not "click here")
- [ ] Buttons use `<button>` or `<a>` with proper attributes
- [ ] Form inputs have associated labels
- [ ] Images have alt text (when not decorative)

### Keyboard Navigation ✓
- [ ] All interactive elements are keyboard-accessible
- [ ] Tab order is logical
- [ ] Focus states are visible
- [ ] Skip links provided if needed

### Screen Readers ✓
- [ ] ARIA labels used where appropriate
- [ ] Decorative elements hidden from screen readers
- [ ] Content order makes sense when read linearly

### Color & Contrast ✓
- [ ] Text meets WCAG AA contrast requirements (4.5:1 for normal, 3:1 for large)
- [ ] Color is not the only means of conveying information
- [ ] Links are distinguishable (not just by color)

---

## Brand Consistency Checklist

### Visual Identity ✓
- [ ] Orange (`#EF8354`) is primary brand color
- [ ] Navy/Charcoal (`#2D3142`) used for primary text
- [ ] Soft gradient combinations use 200/100 levels (blue-200/cyan-100 for SaaS, orange-200/amber-100 for coaches, etc.)
- [ ] Dark text (`text-gray-900`) on soft gradient backgrounds for maximum readability
- [ ] Rounded corners are consistently `rounded-3xl` or `rounded-2xl`

### Voice & Tone ✓
- [ ] Confident but not arrogant
- [ ] Specific and data-driven
- [ ] Action-oriented language
- [ ] No jargon or buzzwords
- [ ] Clear benefit statements

### Imagery Style ✓
- [ ] Real over stock
- [ ] Professional but personable
- [ ] Shows results and outcomes
- [ ] Consistent quality across all images

---

## Pre-Launch Checklist

### Final Review ✓
- [ ] All placeholders replaced with real content
- [ ] Links go to correct destinations
- [ ] Forms submit properly
- [ ] Console has no errors
- [ ] Mobile and desktop tested
- [ ] Typography is consistent throughout
- [ ] Spacing feels balanced
- [ ] Load time is acceptable (< 3s)

### Quality Assurance ✓
- [ ] Spell check completed
- [ ] Grammar reviewed
- [ ] Numbers verified
- [ ] Client testimonials approved
- [ ] Legal compliance checked (GDPR, privacy policy, etc.)

### SEO Basics ✓
- [ ] Page title is descriptive
- [ ] Meta description is compelling
- [ ] Headings include relevant keywords
- [ ] Images have descriptive filenames
- [ ] Internal links are logical

---

## Red Flags (Stop and Fix)

### 🚨 Critical Issues
- Generic SVG icons instead of real images
- Tiny avatar images (< 60px)
- Uniform grids (all cards same size)
- Left-aligned section headers
- No real metrics or results
- Stock photo aesthetic
- Vague CTAs ("Learn More", "Get Started")
- Container width < 1400px (except forms)
- Vibrant gradients using 400/500/600 color levels (use 200/100 instead)
- White text on soft pastel backgrounds (use dark text instead)

### ⚠️ Warning Signs
- Too many competing CTAs
- Inconsistent spacing
- Poor color contrast
- Long paragraphs without breaks
- Missing hover states
- Cluttered layouts
- Uncentered headers
- Missing mobile responsiveness

---

## Design Review Process

### Before Starting
1. Read this document and style-guide.md
2. Review IMAGE-REQUIREMENTS.md if adding images
3. Understand the user's specific goal
4. Identify which sections need work

### During Development
1. Reference style guide for component patterns
2. Use design principles to guide decisions
3. Test responsive behavior as you build
4. Check console for errors regularly

### After Completion
1. Run through all checklists above
2. Take full-page screenshot at 1440px
3. Test mobile view at 375px
4. Verify all links and interactions
5. Check that changes align with project goals

---

## When to Use This Checklist

### Always Use For:
- New sections or components
- Major redesigns
- Before submitting PRs with UI changes
- When design consistency is questioned
- Pre-launch reviews

### Quick Reference For:
- Typography decisions
- Color choices
- Spacing questions
- Component patterns
- Layout structures

---

**Remember**: These are guidelines to maintain consistency and quality, not rigid rules. If breaking a principle serves the user better, document why and proceed intentionally.

**Last Updated**: October 2025
**Maintained By**: BUILDMYDIGITAL Development Team
**Current Version**: Soft Gradient System (200/100 color levels with dark text)
