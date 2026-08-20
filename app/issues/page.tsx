import { Section } from "../components/Section";
import { Container } from "../components/Container";
import { getPublishedIssues } from "@/app/lib/server/issues";
import { ArticleCard } from "../components/ArticleCard";
import { coverUrl, formatDisplayDate } from "../lib/media";
import { fallbackCardImages } from "../lib/content";

export const dynamic = "force-dynamic";

export default async function Issues({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";
  const prismaIssues = await getPublishedIssues();

  const issues = prismaIssues.filter((issue) => {
    if (!query) return true;
    const haystack = `${issue.title ?? ""} ${issue.description} ${issue.number} ${issue.slug}`.toLowerCase();
    return haystack.includes(query);
  });

  return (
    <Section id="issues" className="bg-white">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a8a8a]">
          Archive
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#111111] sm:text-5xl">
          Past Issues
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#555555]">
          Browse published issues of Seoulite. Open an issue to read its articles or download the magazine PDF when available.
        </p>
        {query ? (
          <p className="mt-6 text-sm text-[#8a8a8a]">
            Showing results for “{q}”
          </p>
        ) : null}

        {issues.length === 0 ? (
          <p className="mt-16 text-[#555555]">
            {query
              ? "No issues matched that search. Try another word, or browse the full archive."
              : "No issues have been published yet."}
          </p>
        ) : (
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {issues.map((issue, index) => (
              <ArticleCard
                key={issue.slug}
                href={`/issues/${issue.slug}`}
                image={coverUrl(issue.coverImageKey) ?? fallbackCardImages[index % fallbackCardImages.length]}
                date={formatDisplayDate(issue.date)}
                title={issue.title || `Issue ${issue.number}`}
                author="Seoulite Editors"
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
