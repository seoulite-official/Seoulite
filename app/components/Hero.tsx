import { heroContent } from "../lib/content";
import { ButtonLink } from "./Button";
import { Section } from "./Section";

// Hero is the top section of the homepage.
// All text/content is imported from lib/content.ts for easy replacement later.

export function Hero() {
  const { eyebrow, title, subtitle, primaryCta, secondaryCta } = heroContent;

  return (
    <Section id="hero" className="bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 lg:py-24 text-center">
        <p className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
          {eyebrow}
        </p>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <ButtonLink variant="primary" href={primaryCta.href}>
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink variant="secondary" href={secondaryCta.href}>
            {secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
