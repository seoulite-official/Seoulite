import { Section } from "../../../components/Section";
import { Container } from "../../../components/Container";
import Link from "next/link";
import { getPublishedIssueBySlug, getArticleBySlug } from "@/app/lib/server/issues";
import { notFound } from "next/navigation";
import { articleImageUrl, formatDisplayDate } from "@/app/lib/media";
import { demoArticles } from "@/app/lib/issues";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ issue: string; article: string }>;
}) {
  const { issue, article } = await params;
  const demo = demoArticles[issue]?.find((item) => item.slug === article);
  const articleData = demo ?? (await getArticleBySlug(issue, article));
  const issueData = await getPublishedIssueBySlug(issue);

  if (!articleData) {
    notFound();
  }

  const image = articleImageUrl(articleData.image);

  return (
    <Section id={`article-${articleData.slug}`} className="bg-white">
      <Container className="max-w-3xl">
        <Link
          href={`/issues/${issue}`}
          className="text-sm text-[#8a8a8a] hover:text-[#111111]"
        >
          ← Back to {issueData ? issueData.title || `Issue ${issueData.number}` : "issue"}
        </Link>

        {issueData ? (
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#8a8a8a]">
            Issue {issueData.number} · {formatDisplayDate(issueData.date)}
          </p>
        ) : null}

        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#111111] sm:text-5xl">
          {articleData.title}
        </h1>
        <p className="mt-5 text-sm text-[#8a8a8a]">
          {articleData.category} · {articleData.author}
        </p>

        {image ? (
          <img src={image} alt="" className="mt-10 w-full object-cover" />
        ) : (
          <div className="mt-10 flex h-72 items-center justify-center bg-zinc-100 font-serif text-4xl text-zinc-400">
            Seoulite
          </div>
        )}

        <p className="mt-10 text-lg leading-relaxed text-[#333333]">{articleData.excerpt}</p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[#444444]">
          <p>{articleData.contentPlaceholder}</p>
        </div>

        <div className="mt-14 border-t border-zinc-200 pt-8">
          <Link href={`/issues/${issue}`} className="text-sm text-[#8a8a8a] hover:text-[#111111]">
            ← Back to issue
          </Link>
        </div>
      </Container>
    </Section>
  );
}
