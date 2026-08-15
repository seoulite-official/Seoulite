import { Section } from "./Section";
import { Container } from "./Container";
import { ButtonLink } from "./Button";

// CallToAction is a simple section to encourage user action.
// It can be used for newsletters, sign-ups, etc.

export function CallToAction() {
  return (
    <Section className="bg-zinc-100 dark:bg-zinc-900">
      <Container>
        <h2 className="mb-6 text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">
          Ready to begin?
        </h2>
        <p className="mb-8 max-w-xl text-center text-zinc-600 dark:text-zinc-300">
          Replace this placeholder with your actual call-to-action when the design is ready.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <ButtonLink variant="primary" href="/about">
            Learn More
          </ButtonLink>
          <ButtonLink variant="secondary" href="#">
            Get Started
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
