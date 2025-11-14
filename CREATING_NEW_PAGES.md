# Creating New Pages - Quick Start

## 📄 Complete Template

See **[docs/NEW_PAGE_TEMPLATE.md](./docs/NEW_PAGE_TEMPLATE.md)** for the complete copy-paste template with:
- ✅ Navigation component (identical to home page)
- ✅ Footer with TypewriterText animation
- ✅ All required imports
- ✅ Analytics tracking
- ✅ Proper spacing and structure

## ⚡ Quick Checklist

When creating a new page:

1. **Copy the template** from `docs/NEW_PAGE_TEMPLATE.md`
2. **Include these imports:**
   ```tsx
   'use client';
   import Navigation from '@/components/Navigation';
   import { trackCTAClick, trackNavigation } from '@/lib/analytics';
   ```
3. **Add TypewriterText component** (copy from template)
4. **Use this structure:**
   ```tsx
   <div className="min-h-screen bg-[#F8F7F5]">
     <Navigation />
     <section className="relative pt-32 pb-20">
       {/* Your content */}
     </section>
     {/* Footer section - copy from template */}
   </div>
   ```

## 📚 More Documentation

- **[docs/NEW_PAGE_TEMPLATE.md](./docs/NEW_PAGE_TEMPLATE.md)** - Complete template with Navigation & Footer
- **[docs/README.md](./docs/README.md)** - Documentation index
- **[CLAUDE.md](./CLAUDE.md)** - Full project instructions
- **[context/design-principles.md](./context/design-principles.md)** - Design guidelines
- **[context/style-guide.md](./context/style-guide.md)** - Component patterns

## 🔍 Working Examples

- `/app/coaches/page.tsx` - New page with Nav & Footer
- `/app/page.tsx` - Home page (original implementation)
- `/app/contact/page.tsx` - Contact form page

## ❗ Common Mistakes

❌ Creating custom navigation
❌ Forgetting TypewriterText component
❌ Missing `pt-32` on first section
❌ Forgetting `'use client'` directive

✅ Use Navigation component
✅ Copy entire footer section
✅ Include TypewriterText function
✅ Add analytics tracking
