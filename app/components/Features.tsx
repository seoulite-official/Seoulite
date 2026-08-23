import { featuresContent } from "../lib/content";
import { Section } from "./Section";

export function Features() {
  return (
    <Section className="bg-white">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a8a8a]">
          The magazine
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-[#111111] sm:text-4xl">
          ***What you will find in Seoulite***
        </h2>
      </div>
      <div className="grid gap-10 sm:grid-cols-3">
        {featuresContent.map((feature) => (
          <div key={feature.title}>
            <h3 className="font-serif text-xl font-bold text-[#111111]">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#555555]">{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
