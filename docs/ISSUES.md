# Issues — Seoulite

> **Status:** Empty by design. Add entries here when problems are discovered, discussed, or resolved.

This file is the running log of known issues, decisions, and follow-ups for the Seoulite project.

---

## How to use this file

When you encounter an issue during development (build error, design ambiguity, dependency concern, accessibility gap, etc.), append an entry below using the template:

```
### [YYYY-MM-DD] Short title
- **Type:** bug | decision | follow-up | accessibility | performance
- **Status:** open | resolved | wontfix
- **Context:** What happened, where, and why it matters.
- **Action taken / decision:** What we did or agreed on.
```

---

## Open issues

_None yet._

---

## Resolved issues

_None yet._

---

## Decisions log

Decisions that should not be re-litigated each session. Add one line per decision with date and a short rationale.

- **2026-08-11** — Architecture: components live in `app/components/`, data/content live in `app/lib/`. Reason: keeps visual changes isolated from copy changes.
- **2026-08-11** — Visual styling: kept neutral (`zinc-*` palette, default spacing). Reason: the final design is not yet provided; neutral defaults are easy to restyle later.
- **2026-08-11** — Dark mode: follows OS preference via `prefers-color-scheme`. Reason: no explicit theme requirement yet.
- **2026-08-11** — Routing: only `/` (homepage) and `/about` exist. Reason: scope is intentionally minimal until the design specifies more routes.
- **2026-08-12** — Issue/archive system: added scalable issue/article infrastructure using Next.js App Router. Reason: prepare for Seoulite's past issues without requiring redesign later.
- **2026-08-12** — Issue routing: selected nested `/issues/[issue]/[article]` structure over flat article routing. Reason: maintains semantic relationship between issues and articles, allows article slugs to be unique only within issues.
- **2026-08-12** — Data modeling: created TypeScript Issue/Article types with optional image fields and JSX content functions. Reason: keeps data separate from UI, enables easy replacement of demo content with real issues.
- **2026-08-12** — Assets convention: established `public/issues/[issue-slug]/` for cover images and `public/issues/[issue-slug]/articles/` for article thumbnails. Reason: organized, scalable asset storage that aligns with issue-based structure.
- **2026-08-12** — Navigation update: added "Issues" link to main header navigation. Reason: makes the issue archive accessible from site header.
- **2026-08-14** — Database foundation: established Prisma ORM with SQLite as persistent source of truth for issue data. Reason: replaces temporary demo data with production-ready database schema supporting Issue and User models, keeping binary files external.

## Resolved issues

- **2026-08-17** — Issuu integration: Added optional  field to Issue model to store Issuu publication URLs. Updated admin forms, API routes, and public issue page to handle Issuu magazine displays. Implemented iframe-based embed for Issuu publications.
