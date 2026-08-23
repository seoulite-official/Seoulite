export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const siteConfig = {
  name: "Seoulite",
  description:
    "",
  url: "https://seoulite.local",
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Past Issues", href: "/issues" },
  { label: "Contacts", href: "/about#contacts" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/seoulitesis/", icon: "instagram" as const },
];
