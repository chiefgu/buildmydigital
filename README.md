# BUILDMYDIGITAL Website

A modern, responsive website built with Next.js 15, TypeScript, and Tailwind CSS, implementing the BUILDMYDIGITAL brand design system.

## 🚀 Quick Start

The development server is already running at:
- **Local:** http://localhost:3000
- **Network:** http://192.168.1.116:3000

Open http://localhost:3000 in your browser to see your website!

## 📁 Project Structure

```
buildmydigital-site/
├── app/
│   ├── globals.css          # Design system & global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   └── Navigation.tsx        # Navigation menu component
└── public/                   # Static assets (images, fonts, etc.)
```

## 🎨 Design System

Your BUILDMYDIGITAL brand design system is fully configured:

### Colors
- **Charcoal** (#2D3142) - Primary text
- **Off-White** (#F8F7F5) - Background
- **Coral** (#EF8354) - Primary CTA buttons
- **Slate** (#4F5D75) - Secondary text
- Full opacity variations for subtle UI elements

### Typography
- **Display XL:** 72px (Hero headings)
- **Display LG:** 48px (Section headings)
- **Display MD:** 32px (Subsections)
- **Body:** 16px (Standard text)
- Custom letter spacing for modern look

### Components
- ✅ Navigation menu (responsive)
- ✅ Hero section with gradient
- ✅ Portfolio grid
- ✅ Services section
- ✅ Testimonials
- ✅ Contact form
- ✅ Footer

## 🛠 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 💬 Working with Claude Code

You can now describe changes in plain English and Claude will implement them. Examples:

### Make changes:
- "Make the hero text bigger"
- "Change the coral color to a darker shade"
- "Add a new section for pricing"
- "Make the navigation sticky"

### Add features:
- "Add a blog section"
- "Create a portfolio page"
- "Add image upload functionality"
- "Integrate a contact form with email"

### Style adjustments:
- "Make the spacing tighter"
- "Add animations to the cards"
- "Change the gradient colors"
- "Make buttons more rounded"

## 📝 Current Sections

1. **Navigation** - Sticky header with responsive menu
2. **Hero** - Gradient background with headline and CTA
3. **Recent Work** - Portfolio grid preview
4. **About** - Brand story section
5. **Services** - 6 service offerings with icons
6. **Split Color CTA** - Visual call-to-action
7. **Contact Form** - Lead capture form
8. **Footer** - Copyright info

## 🎯 Next Steps

### Replace Placeholder Content
The site uses placeholder images and sample text. You can:
1. Add real images to the `/public` folder
2. Update text content in `/app/page.tsx`
3. Replace service descriptions
4. Add real testimonials

### Connect Contact Form
To make the contact form functional:
- "Connect the contact form to send emails"
- "Add form validation"
- "Integrate with a CRM"

### Add More Pages
- "Create an about page"
- "Build a portfolio gallery page"
- "Add a blog"
- "Create service detail pages"

### Deploy
When you're ready to launch:
- "Help me deploy this to Vercel"
- "Set up a custom domain"
- "Configure SEO settings"

## 📚 Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Turbopack** - Fast bundler

## 🆘 Need Help?

Just ask Claude! Examples:
- "Why isn't my navigation showing?"
- "How do I add a new page?"
- "Fix the responsive layout on mobile"
- "Explain how the design system works"

---

**Built with Claude Code** 🤖
*Your BUILDMYDIGITAL brand style guide is in `/context/style-guide.md`*
