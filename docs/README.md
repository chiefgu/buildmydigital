# BUILDMYDIGITAL Documentation

## Quick Links

### For Creating New Pages
- **[New Page Template](./NEW_PAGE_TEMPLATE.md)** - Complete template with Navigation and Footer

### Design & Style Guides
- **[Design Principles](../context/design-principles.md)** - Comprehensive design checklist
- **[Style Guide](../context/style-guide.md)** - Component patterns and styling
- **[CLAUDE.md](../CLAUDE.md)** - Project instructions for AI assistants

## Quick Reference

### Standard Page Structure
```tsx
'use client';

import Navigation from '@/components/Navigation';
// ... other imports

export default function YourPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <Navigation />

      {/* Content sections with pt-32 on first section */}

      {/* Footer section - see NEW_PAGE_TEMPLATE.md */}
    </div>
  );
}
```

### Key Files
- Navigation: `/components/Navigation.tsx`
- Analytics: `/lib/analytics.ts`
- Global Styles: `/app/globals.css`
- Fonts: `/public/fonts/`

### Color Palette
- Primary CTA: `#EF8354` (orange)
- Background: `#F8F7F5` (off-white)
- Text: `#2D3142` (charcoal)
- Soft Gradients: 200/100 color levels

### Typography
- Font: Raveo (400, 500, 600, 700)
- Headlines: `text-[clamp(48px,6vw,80px)]`
- Body: `text-lg`
- Small: `text-sm`

## Need Help?

1. Check the appropriate documentation file above
2. Look at `/app/coaches/page.tsx` for a working example
3. Refer to `/app/page.tsx` for the original implementation
