import { featuresContent } from "../lib/content";
import { Card } from "./Card";
import { Section } from "./Section";
import { Container } from "./Container";

// Features displays a grid of feature cards.
// Content comes from lib/content.ts.

export function Features() {
  return (
    <Section className="bg-white dark:bg-zinc-900">
      <Container>
        <h2 className="mb-12 text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100">
          What makes Seoulite special
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuresContent.map((feature, index) => (
            <Card key={index}>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
