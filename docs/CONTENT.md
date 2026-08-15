# Content — Seoulite

> **Status:** All current content is placeholder. Will be replaced when the user provides the real copy.

This file will hold the agreed-upon text content for Seoulite so future Claude Code sessions know which strings are final and which are still placeholders.

---

## Current placeholders

These strings are intentionally temporary. Do **not** treat them as final copy.

### Site identity
- **Site name:** `Seoulite` (in `app/lib/navigation.ts`)
- **Site description:** `"A modern Next.js website. This description is a placeholder and will be updated when the final design is provided."`

### Hero (homepage)
- Eyebrow: `"Welcome to Seoulite"`
- Title: `"A clean foundation ready for your design"`
- Subtitle: `"This is a temporary placeholder section. Once you provide the final visual design, we will replace this text and styling without changing the structure."`
- Primary CTA: `"Get started"` → `/about`
- Secondary CTA: `"Learn more"` → `/about`

### Features (homepage grid)
1. **Modular components** — "Reusable building blocks live in app/components so changes stay isolated."
2. **Data-driven content** — "Text and links live in app/lib so visuals can be restyled without editing copy."
3. **Responsive by default** — "Layouts use Tailwind utilities and work on mobile, tablet, and desktop."

### Call to action (homepage bottom)
- Title: `"Ready to begin?"`
- Subtitle: `"Replace this placeholder with your actual call-to-action when the design is ready."`
- Buttons: `"Learn More"` → `/about`, `"Get Started"` → `#`

### About page
- Title: `"About Seoulite"`
- Body: `"This is the About page. Replace this content with your actual about section when the design is ready."`

### Footer
- `"© {year} Seoulite. All rights reserved."`

### Issues Archive (NEW)
- **Issue archive page:** `/issues` - Lists all published Seoulite issues
- **Individual issue page:** `/issues/[issue-slug]` - Shows issue metadata and article list
- **Individual article page:** `/issues/[issue-slug]/[article-slug]` - Shows full article content
- **Data location:** Issue and article data structures defined in `app/lib/issues.ts`
- **Demo data:** Currently contains one demo issue (Issue 000) with two demo articles to verify the infrastructure works
- **Real content:** Will be replaced when the user provides actual Seoulite issues and articles

---

## To be filled in

The following sections will be completed once the user provides the final copy.

### Final hero copy
- _Pending._

### Final features copy
- _Pending._

### Final about copy
- _Pending._

### Final footer copy
- _Pending._

### Final issue content
- _Pending_ - Real Seoulite issues will replace the demo data in `app/lib/issues.ts`

### Any other pages
- _Pending._
