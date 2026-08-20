export type Feature = {
  title: string;
  description: string;
};

export const heroContent = {
  eyebrow: "Heading here",
  title: "Hot Takes & Bold Opinions: The Stories You Can't Ignore",
  subtitle:
    "Seoulite is a student-run journal of culture, campus life, and the city — essays, photography, and the conversations our community is having now.",
  primaryCta: { label: "Check Now", href: "/issues" },
  secondaryCta: { label: "About Us", href: "/about" },
} as const;

export const featuresContent: Feature[] = [
  {
    title: "Student voices",
    description:
      "Essays and reporting written by the people living this city and this campus — not from a distance.",
  },
  {
    title: "Print and digital",
    description:
      "Each issue is designed as a magazine you can read on the site or download as a full PDF.",
  },
  {
    title: "An archive that grows",
    description:
      "Past issues stay online so new readers can find the stories that still matter.",
  },
];

export const fallbackCardImages = [
  "/design/E734FDEF-D4BD-4664-93C9-E956780199DB.JPG",
  "/design/mockup.jpg",
  "/design/sketch.jpg",
  "/design/banner.jpg",
] as const;
