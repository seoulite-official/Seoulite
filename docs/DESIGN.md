# Design — Seoulite

> **Status:** Awaiting the user-provided visual/UI design description.

This file will hold the agreed-upon visual design for Seoulite (colors, typography, spacing, imagery, animations, etc.) so future Claude Code sessions have a single source of truth.

---

## To be filled in

The following sections will be completed once the user provides the design description.

### Brand & identity
- _Pending._

### Color palette
- _Pending._

### Typography
- _Pending._

### Spacing & layout scale
- _Pending._

### Imagery & iconography
- _Pending._

### Animation & motion
- _Pending._

### Component variants
- _Pending._

### Responsive breakpoints
- _Pending._
## Visual References

The `/design` directory contains the original hand-drawn interface designs provided by the user.

These images are the primary visual references for the Seoulite website. Future UI implementation should use these references to guide the overall layout, visual hierarchy, spacing, typography, navigation, cards, imagery, and other interface elements.

The designs do not need to be reproduced pixel-for-pixel. If responsive behavior, accessibility, technical constraints, or existing backend functionality require adjustments, preserve the overall visual intent and composition of the designs.

Before making significant UI changes, inspect the relevant image in `/design` and compare the implementation against it.

The existing backend should not be unnecessarily changed simply to reproduce the visual design. However, frontend structure may be changed when necessary to achieve the intended design.
---

## Working notes
- Current component code uses neutral Tailwind colors (`zinc-*`) and default system-ish spacing so it can be restyled without restructuring components.
- The fonts currently used are `Geist` (sans) and `Geist_Mono` via `next/font/google`.
- Dark mode currently follows the user's OS preference (`prefers-color-scheme`). This can be revisited when the design specifies a theme strategy.
