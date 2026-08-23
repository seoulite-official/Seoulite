import Image from "next/image";
import { heroContent } from "../lib/content";
import { ButtonLink } from "./Button";

export function Hero() {
  const { eyebrow, title, subtitle, primaryCta } = heroContent;

  return (
    <section id="hero" className="relative isolate min-h-[28rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[38rem]">
      <Image
        src="/design/banner.jpg"
        alt="The Seoulite team gathered on campus steps"
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover object-[center_38%]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[28rem] max-w-7xl items-center px-5 py-16 sm:min-h-[34rem] sm:px-8 lg:min-h-[38rem] lg:px-10">
        <div className="max-w-xl text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-[3.35rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/90 sm:text-[15px]">
            {subtitle}
          </p>
          <ButtonLink variant="inverted" href={primaryCta.href} className="mt-8">
            {primaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
