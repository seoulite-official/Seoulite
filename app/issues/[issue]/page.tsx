import { Section } from "../../components/Section";
import { Container } from "../../components/Container";
import { ButtonLink } from "../../components/Button";
import { ArticleCard } from "../../components/ArticleCard";
import { getPublishedIssueBySlug } from "@/app/lib/server/issues";
import { notFound } from "next/navigation";
import { demoArticles } from "@/app/lib/issues";
import { articleImageUrl, coverUrl, formatDisplayDate, publicationUrl } from "@/app/lib/media";
import { fallbackCardImages } from "@/app/lib/content";

export const dynamic = "force-dynamic";

export default async function IssuePage({ params }: { params: Promise<{ issue: string }> }) {
  const { issue: slug } = await params;
  const prismaIssue = await getPublishedIssueBySlug(slug);

  if (!prismaIssue) {
    notFound();
  }

  const articles = demoArticles[prismaIssue.slug] || [];
  const cover = coverUrl(prismaIssue.coverImageKey);
  const pdf = publicationUrl(prismaIssue.publicationKey);
  const heading = prismaIssue.title || `Issue ${prismaIssue.number}`;

  return (
    <Section id={`issue-${prismaIssue.slug}`} className="bg-white">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a8a8a]">
          Issue {prismaIssue.number} · {formatDisplayDate(prismaIssue.date)}
        </p>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
            {cover ? (
              <img src={cover} alt={`Cover: ${heading}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-serif text-6xl text-zinc-400">
                {prismaIssue.number}
              </div>
            )}
          </div>
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-[#111111] sm:text-5xl">
              {heading}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#555555]">
              {prismaIssue.description}
            </p>
            {pdf ? (
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink variant="primary" href={pdf}>
                  Read the PDF
                </ButtonLink>
                <ButtonLink variant="secondary" href={pdf} target="_blank">
                  Open in a new tab
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>

        {pdf ? (
          <div className="mt-14">
            <h2 className="mb-4 font-serif text-2xl font-bold text-[#111111]">Full issue</h2>
            <iframe
              title={`${heading} PDF`}
              src={pdf}
              className="h-[70vh] w-full border border-zinc-200 bg-zinc-50"
            />
          </div>
        ) : null}

        <h2 className="mt-16 font-serif text-3xl font-bold text-[#111111]">
          Articles in this issue
        </h2>
        <p className="mt-3 text-sm text-[#555555]">
          {articles.length === 0
            ? "Articles for this issue will appear here as they are published."
            : `${articles.length} article${articles.length !== 1 ? "s" : ""} in Issue ${prismaIssue.number}.`}
        </p>

        {articles.length > 0 ? (
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                href={`/issues/${prismaIssue.slug}/${article.slug}`}
                image={
                  articleImageUrl(article.image) ??
                  cover ??
                  fallbackCardImages[index % fallbackCardImages.length]
                }
                date={formatDisplayDate(prismaIssue.date)}
                title={article.title}
                author={article.author}
              />
            ))}
          </div>
        ) : null}

        <div className="mt-14 border-t border-zinc-200 pt-8">
          <ButtonLink variant="secondary" href="/issues">
            Back to Issues Archive
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
