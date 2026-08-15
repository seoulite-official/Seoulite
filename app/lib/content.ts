// Placeholder content for Seoulite.
// Replace this with real content when the design description is provided.

export type Feature = {
  title: string;
  description: string;
};

export const heroContent = {
  eyebrow: "Welcome to Seoulite",
  title: "A clean foundation ready for your design",
  subtitle:
    "This is a temporary placeholder section. Once you provide the final visual design, we will replace this text and styling without changing the structure.",
  primaryCta: { label: "Get started", href: "/about" },
  secondaryCta: { label: "Learn more", href: "/about" },
} as const;

export const featuresContent: Feature[] = [
  {
    title: "Modular components",
    description:
      "Reusable building blocks live in app/components so changes stay isolated.",
  },
  {
    title: "Data-driven content",
    description:
      "Text and links live in app/lib so visuals can be restyled without editing copy.",
  },
  {
    title: "Responsive by default",
    description:
      "Layouts use Tailwind utilities and work on mobile, tablet, and desktop.",
  },
];
