import { Section } from "../../components/Section";
import { Container } from "../../components/Container";
import Link from "next/link";
import { ButtonLink } from "../../components/Button";
import { getPublishedIssueBySlug } from "@/app/lib/server/issues";
import { notFound } from "next/navigation";
import { cn } from "../../lib/cn";
import { demoArticles } from "@/app/lib/issues";

export const generateStaticParams = async () => {
  // In a real app, this would fetch from a CMS or database
  // For now, we return the demo issue
  const issues = [
    { params: { issue: "issue-000-demo" } }
  ];
  return issues;
};

export default async function IssuePage({ params }: { params: Promise<{ issue: string }> }) {
  const { issue: slug } = await params;
  const prismaIssue = await getPublishedIssueBySlug(slug);

  if (!prismaIssue) {
    notFound();
  }

  // Convert Prisma issue to format expected by UI
  const issueData = {
    ...prismaIssue,
    // Map Prisma fields to expected format
    coverImage: prismaIssue.coverImageKey ?? undefined,
    articles: demoArticles[prismaIssue.slug] || [],
    issuuUrl: prismaIssue.issuuUrl
  };

  return (
    <Section id={`issue-${issueData.slug}`}>
      <Container>
        <div className="mb-12">
          {issueData.coverImage ? (
            <img
              src={issueData.coverImage}
              alt={`Cover: ${issueData.title || "Issue " + issueData.number}`}
              className="w-full h-64 object-cover rounded-2xl mb-6"
            />
          ) : (
            <div className="w-full h-64 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center rounded-2xl mb-6">
              <span className="text-zinc-400 dark:text-zinc-500">[Cover Image]</span>
            </div>
          )}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {issueData.title || "Issue " + issueData.number}
          </h1>
          <p className="mb-4 text-lg text-zinc-600 dark:text-zinc-300">
            {new Date(issueData.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mb-8 text-zinc-600 dark:text-zinc-300">
            {issueData.description}
          </p>
        </div>

        {issueData.issuuUrl && (
          <div className="mb-12">
            <h3 className="mb-4 text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">
              Read the Full Issue
            </h3>
            <div className="w-full h-[600px] bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
              <iframe
                title="Issuu publication"
                src={issueData.issuuUrl}
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <h2 className="mb-6 text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100">
          Articles in this Issue
        </h2>
        <p className="mb-10 max-w-2xl text-center text-zinc-600 dark:text-zinc-300">
          This issue contains {issueData.articles.length} article{issueData.articles.length !== 1 ? "s" : ""}.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {issueData.articles.map((article) => (
            <Link
              key={article.slug}
              href={`/issues/${issueData.slug}/${article.slug}`}
              className={cn(
                "group",
                "border border-zinc-200 rounded-xl bg-white dark:border-zinc-800 dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors",
                "flex flex-col h-full"
              )}
            >
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              ) : (
                <div className="w-full h-48 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center rounded-t-xl">
                  <span className="text-zinc-400 dark:text-zinc-500">[Article Image]</span>
                </div>
              )}
              <div className="flex-1 flex flex-col p-4">
                <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {article.title}
                </h3>
                <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {article.category} • {article.author}
                </p>
                <p className="flex-1 text-zinc-600 dark:text-zinc-300">
                  {article.excerpt}
                </p>
                <ButtonLink
                  variant="secondary"
                  href={`/issues/${issueData.slug}/${article.slug}`}
                  className="mt-3 self-start"
                >
                  Read Article
                </ButtonLink>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <ButtonLink
            variant="secondary"
            href="/issues"
          >
            ← Back to Issues Archive
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}