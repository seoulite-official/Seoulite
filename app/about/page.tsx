import { Section } from "../components/Section";
import { Container } from "../components/Container";
import { ButtonLink } from "../components/Button";

export default function About() {
  return (
    <>
      <Section id="about">
        <Container>
          <h1 className="mb-6 text-4xl font-bold text-center text-zinc-900 dark:text-zinc-100">
            About Seoulite
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-center text-zinc-600 dark:text-zinc-300">
            This is the About page. Replace this content with your actual about section when the design is ready.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <ButtonLink variant="primary" href="/">
              Back to Home
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
