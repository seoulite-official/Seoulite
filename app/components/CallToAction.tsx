import { Section } from "./Section";
import { ButtonLink } from "./Button";

export function CallToAction() {
  return (
    <Section className="bg-[#111111] text-white" contained={false}>
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            Write to us
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">
            Pitches, letters, and questions belong in the next issue
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/80">
            Seoulite is built by students. If you have a story, a photo essay, or feedback on an issue, send it through.
          </p>
          <ButtonLink variant="inverted" href="/about#contacts">
            Contacts
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
