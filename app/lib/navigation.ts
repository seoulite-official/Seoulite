// Centralized navigation structure.
// Easy to update later when the final design specifies exact menu items.

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const siteConfig = {
  name: "Seoulite",
  description:
    "A modern Next.js website. This description is a placeholder and will be updated when the final design is provided.",
  url: "https://seoulite.local",
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Issues", href: "/issues" },
  { label: "About", href: "/about" },
];
