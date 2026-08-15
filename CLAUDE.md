# Seoulite — Claude Code Project Guide

This file is the persistent guide for any future Claude Code session working on the **Seoulite** project. Read this first before making changes.

---

## 1. Project Overview

- **Project name:** Seoulite
- **Project type:** Next.js website (App Router)
- **User level:** Complete beginner at coding — explain important decisions in simple terms. Do not assume programming knowledge.
- **Local directory:** `~/Desktop/seoulite`
- **Status:** Foundation built. Authentication system implemented. Final visual design has not yet been provided by the user.

---

## 2. Tech Stack

| Concern        | Choice                          |
| -------------- | ------------------------------- |
| Framework      | Next.js `16.3.0` (App Router)   |
| Language       | TypeScript                      |
| Styling        | Tailwind CSS `v4`               |
| Lint           | ESLint (`eslint-config-next`)   |
| Package manager| npm                             |
| Runtime        | React `19.2.8`                  |
| Dev server     | `npm run dev` → `http://localhost:3000` |
| Database       | Prisma ORM with SQLite (dev)    |
| Auth           | @auth/core v0.41.3 (Credentials + JWT) |
| Password Hash  | bcryptjs                        |

---

## 3. Directory Structure

```
seoulite/
├── app/
│   ├── about/
│   │   └── page.tsx          # Example secondary route (/about)
│   ├── admin/                # Admin routes (protected)
│   │   ├── login/
│   │   │   └── page.tsx      # Login page
│   │   └── page.tsx          # Admin dashboard
│   ├── components/           # Reusable UI components (see §5)
│   ├── lib/                  # Data + helpers — no JSX
│   │   ├── content.ts        # Placeholder hero/features content
│   │   ├── navigation.ts     # siteConfig + mainNav
│   │   └── cn.ts             # className helper
│   ├── api/                  # API routes
│   │   └/ auth/              # Authentication endpoints
│   │       └/ [...nextauth]/ # NextAuth route handler
│   ├── globals.css           # Tailwind import + base typography
│   ├── layout.tsx            # Root layout: <html>, Header, main, Footer
│   ├── page.tsx              # Homepage (composes Hero + Features + CTA)
│   └── favicon.ico
├── docs/                     # Project documentation (this folder)
│   ├── DESIGN.md
│   ├── CONTENT.md
│   ├── ISSUES.md
│   └── ADMIN.md              # Admin & authentication documentation
├── public/                   # Static assets (images, icons)
├── scripts/                  # Utility scripts
│   └── create-editor.ts      # Development account creation
├── middleware.ts             # Route protection middleware
├── .gitignore
├── AGENTS.md                 # Existing top-level agent rules
├── CLAUDE.md                 # This file
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── prisma.config.ts
└── prisma/
```

---

## 4. Files Created in This Session

### Created
- `app/components/Container.tsx`
- `app/components/Section.tsx`
- `app/components/Button.tsx` (exports `Button` + `ButtonLink`)
- `app/components/Card.tsx`
- `app/components/Header.tsx`
- `app/components/Footer.tsx`
- `app/components/Hero.tsx`
- `app/components/Features.tsx`
- `app/components/CallToAction.tsx`
- `app/lib/navigation.ts`
- `app/lib/content.ts`
- `app/lib/cn.ts`
- `app/lib/issues.ts` — Issue/Article data model and registry
- `app/about/page.tsx`
- `app/issues/page.tsx` — Issues archive listing
- `app/issues/[issue]/page.tsx` — Individual issue page
- `app/issues/[issue]/[article]/page.tsx` — Individual article page
- `app/issues/[issue]/not-found.tsx` — 404 for missing issue
- `app/issues/[issue]/[article]/not-found.tsx` — 404 for missing article
- `docs/DESIGN.md`, `docs/CONTENT.md`, `docs/ISSUES.md`
- `docs/ADMIN.md` — Admin & authentication documentation
- `app/admin/login/page.tsx` — Login page
- `app/admin/page.tsx` — Admin dashboard placeholder
- `app/api/auth/[...nextauth]/route.ts` — Auth.js configuration
- `middleware.ts` — Route protection middleware
- `scripts/create-editor.ts` — Development account creation script
- `.env` — Environment variables (updated)

### Modified
- `app/layout.tsx` — added `Header`, `Footer`, dynamic metadata from `siteConfig`
- `app/page.tsx` — replaced default scaffold content with composition of `Hero` + `Features` + `CallToAction`
- `app/globals.css` — improved base typography (font smoothing, text rendering); uses `var(--font-sans)`
- `app/lib/navigation.ts` — added "Issues" link to main navigation
- `.gitignore` — added database file protection
- `.env` — added NEXTAUTH_SECRET and NEXTAUTH_URL

### Untouched (by design)
- `next.config.ts`, `tsconfig.json`, `package.json`, `postcss.config.mjs`, `eslint.config.mjs`, `public/*`

---

## 5. Component Inventory

All components live in `app/components/`. They accept `className` and standard HTML/Next props where appropriate. Visual styling is intentionally neutral so the final design can be applied without restructuring.

| Component       | Purpose                                                        |
| --------------- | -------------------------------------------------------------- |
| `Container`     | Max-width page wrapper with responsive horizontal padding      |
| `Section`       | Vertical rhythm (`py-16 sm:py-20 lg:py-24`) + optional `id`    |
| `Button`        | Native `<button>` element; `primary` / `secondary` variants    |
| `ButtonLink`    | Next.js `<Link>` styled like `Button`                          |
| `Card`          | Bordered rounded container for features/items                  |
| `Header`        | Site header: brand text + nav links (data-driven via `mainNav`)|
| `Footer`        | Site footer with auto year                                     |
| `Hero`          | Homepage hero (content from `heroContent`)                     |
| `Features`      | Homepage feature grid (content from `featuresContent`)         |
| `CallToAction`  | Homepage bottom CTA section                                    |

---

## 6. Git Status

- **Branch:** `master`
- **Commits:** 0 (no commits made yet)
- **Remote:** none — no GitHub repository created
- **Working tree:** all changes are untracked

The user has explicitly asked **not** to create commits, push to GitHub, or initialize a remote unless told to do so. Do not run `git commit`, `git push`, `gh repo create`, or related commands without explicit permission.

---

## 7. Development Commands

```bash
npm run dev    # Start dev server at http://localhost:3000
npm run build  # Production build
npm run start  # Run production build
npm run lint   # Run ESLint
npx tsc --noEmit   # Type-check only
npx prisma studio    # Prisma GUI for database
npx ts-node scripts/create-editor.ts  # Create editor account (dev only)
```

---

## 8. Important Constraints (Rules for Future Sessions)

When working on this project, future Claude sessions must:

1. Use Next.js App Router conventions.
2. Use TypeScript throughout.
3. Use Tailwind CSS for styling unless there is a strong reason not to.
4. Keep components in `app/components/`, data/content in `app/lib/`.
5. Put static assets in `public/`.
6. Keep the homepage in `app/page.tsx`.
7. **Do not** modify `next.config.ts`, `tsconfig.json`, `package.json`, `postcss.config.mjs`, or `eslint.config.mjs` unless there is a clear, necessary reason.
8. **Do not** install additional packages unless they are genuinely necessary.
9. **Do not** replace working infrastructure to accomplish a UI task.
10. Make the site responsive (mobile, tablet, desktop).
11. Preserve existing functionality when adding or modifying features.
12. Inspect relevant files before making significant changes.
13. Run TypeScript and lint checks after meaningful changes.
14. Never delete files or functionality without explaining why.
15. **Do not** create a GitHub repo or push unless explicitly told.
16. **Do not** make commits unless explicitly told.
17. Explain architectural decisions to a beginner in simple language.
18. **Authentication**: Use Credentials-only with JWT sessions (@auth/core v0.41.3), Prisma for User storage only, bcryptjs for password hashing.

---

## 9. What Should NOT Be Changed Unnecessarily

These files and conventions exist for a reason — change only when required:

- `next.config.ts`, `tsconfig.json`, `package.json`, `postcss.config.mjs`, `eslint.config.mjs`
- The component API shapes in `app/components/` (props: `children`, `className`, `variant`)
- The data shapes in `app/lib/content.ts` and `app/lib/navigation.ts` (rename `type` fields only if needed)
- The dark-mode strategy (uses `prefers-color-scheme` + Tailwind `dark:` classes)
- The header/footer placement in `app/layout.tsx`
- The authentication system in `app/api/auth/[...nextauth]/route.ts` and `middleware.ts`
- The JWT session strategy and cookie configuration

---

## 10. What Has NOT Been Decided Yet

- **Final visual design** (colors, typography scale, spacing scale, imagery, animations) — the user will provide this. Current styling is intentionally neutral.
- **Branding details** (logo, favicon beyond the default).
- **Real content** for hero, features, footer, About page — current text is placeholder.
- **Final navigation structure** — currently just Home and About.
- **Additional routes/pages** — only `/` and `/about` exist so far.
- **Image strategy** — `public/` contains only the default Next.js scaffold SVGs.
- **Deployment target** — not chosen yet.
- **Domain, analytics, SEO beyond basic metadata** — not set up yet.
- **Admin interface features** — issue creation/editing/uploading deferred for later implementation.

---

## 11. Database Foundation Status

**Persistent Storage:** Prisma ORM with SQLite (development) is now the **single source of truth** for issue data. The existing `app/lib/issues.ts` remains as temporary/demo data only and should not be used for production content.

**Current Schema:**
- **Issue Model:** Stores issue metadata with storage keys for cover images and publication PDFs (actual files stored externally)
- **User Model:** Foundation for editorial/admin accounts (authentication implemented)
- **Storage Approach:** Binary files (PDFs, images) stored externally; database stores only metadata and storage keys

**Development Setup:**
- SQLite database file: `./dev.db`
- Prisma migrations: Applied via `npx prisma migrate dev`
- Schema validation: Passing
- TypeScript check: Passing

**Authentication Status:**
- **Implemented:** Credentials-based login with JWT sessions using @auth/core v0.41.3
- **Password Security:** bcryptjs hashing (12 salt rounds)
- **User Model:** Unchanged - sufficient for authentication needs
- **Session Strategy:** JWT (stateless) - no database session storage needed
- **Prisma Adapter:** NOT used - eliminated complexity for Credentials-only auth
- **Additional Models:** None (no Account, Session, VerificationToken tables)

**Next Steps (pending approval):**
- Authentication implementation (COMPLETE)
- Admin interface for issue management
- File upload handling for covers/publications
- Production database migration (PostgreSQL deferred until deployment provider chosen)

---

## 11. Where To Find Things

- Placeholder copy: `app/lib/content.ts`
- Navigation labels/links: `app/lib/navigation.ts`
- Site name/description (metadata): `siteConfig` in `app/lib/navigation.ts`
- Base typography: `app/globals.css`
- Page composition: `app/page.tsx`, `app/about/page.tsx`
- Layout (header/footer mounting): `app/layout.tsx`
- Authentication: `app/api/auth/[...nextauth]/route.ts`, `middleware.ts`
- Admin login: `app/admin/login/page.tsx`
- Admin dashboard: `app/admin/page.tsx`
- Account creation script: `scripts/create-editor.ts`
- Design notes (to be filled in): `docs/DESIGN.md`
- Content notes (to be filled in): `docs/CONTENT.md`
- Admin documentation: `docs/ADMIN.md`
- Issues/known problems: `docs/ISSUES.md`