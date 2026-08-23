import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { CallToAction } from "./components/CallToAction";
import { ArticleCard } from "./components/ArticleCard";
import EditorialHero from "./components/EditorialHero";
import { Container } from "./components/Container";
import { getRecentIssues } from "@/app/lib/server/issues";
import { coverUrl, formatDisplayDate } from "@/app/lib/media";
import { ButtonLink } from "./components/Button";

export const dynamic = "force-dynamic";

export default async function Home() {
  const issues = await getRecentIssues(4);
  const latestIssue = issues[0] ?? null;

  // Build cards from the actual published issues.
  // If an issue has no cover image, ArticleCard will render a neutral placeholder automatically.
  const featured = issues.map((issue, index) => ({
    href: `/issues/${issue.slug}`,
    image: coverUrl(issue.coverImageKey) ?? undefined,
    date: formatDisplayDate(issue.date),
    title: issue.title || `Issue ${issue.number}`,
    author: "Seoulite Editors",
  }));

  const archivePreview = issues;

  return (
    <>
      <Hero />

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((card, index) => (
              <ArticleCard key={card.href + '-' + card.title + '-' + index} {...card} />
            ))}
          </div>
        </Container>
      </section>

      {latestIssue ? <EditorialHero latestIssue={latestIssue} /> : null}

      <Features />

      {archivePreview.length > 0 ? (
        <section className="bg-white pb-16">
          <Container>
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a8a8a]">
                  Archive
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-[#111111] sm:text-4xl">
                  Past issues
                </h2>
              </div>
              <ButtonLink variant="secondary" href="/issues" className="hidden sm:inline-flex">
                View all
              </ButtonLink>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {archivePreview.map((issue, index) => (
                <ArticleCard
                  key={`${issue.id}-${index}`}
                  href={`/issues/${issue.slug}`}
                  image={coverUrl(issue.coverImageKey) ?? undefined}
                  date={formatDisplayDate(issue.date)}
                  title={issue.title || `Issue ${issue.number}`}
                  author="Seoulite Editors"
                />
              ))}
            </div>
            <div className="mt-10 sm:hidden">
              <ButtonLink variant="secondary" href="/issues">
                View all
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

      <CallToAction />
    </>
  );
}
