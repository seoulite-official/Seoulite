export type Feature = {
  title: string;
  description: string;
};

export const heroContent = {
  eyebrow: "Student Journalism, On the Ground",
  title: "Stories From the Conferences That Shape Our World",
  subtitle:
    "Seoulite brings student journalism directly into the heart of MUN conferences, covering the people, debates, and ideas that shape each conference. From SEOMUN to BEIMUN, THIMUN, and YALEMUN, our members report, photograph, and design each issue to capture these experiences as they happen.",
  primaryCta: { label: "Check Now", href: "/issues" },
  secondaryCta: { label: "About Us", href: "/about" },
} as const;

export const featuresContent: Feature[] = [
  {
    title: "International, on-ground journalism",
    description:
      "A direct insight into live-press coverage, covering issues from domestic and international MUN conferences.",
  },
  {
    title: "Full cycle coverage",
    description:
      "Explore a full-cycle coverage ranging from articles and photos to layout design, all self-produced by members of Seoulite.",
  },
  {
    title: "An active archive",
    description:
      "Our website is an active archive of our accomplishments—as many articles there are now, we plan on writing more in the coming future. Follow our journey as we continue to build an active archive of student journalism.",
  },
];

export const fallbackCardImages = [
  "/design/E734FDEF-D4BD-4664-93C9-E956780199DB.JPG",
  "/design/mockup.jpg",
  "/design/sketch.jpg",
  "/design/banner.jpg",
] as const;
