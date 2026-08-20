export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const siteConfig = {
  name: "Seoulite",
  description:
    "A student-run journal of culture, campus life, and the city.",
  url: "https://seoulite.local",
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Past Issues", href: "/issues" },
  { label: "Contacts", href: "/about#contacts" },
];

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" as const },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" as const },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" as const },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" as const },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" as const },
];
