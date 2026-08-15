import { Section } from "../../components/Section";
import { Container } from "../../components/Container";
import Link from "next/link";
import { ButtonLink } from "../../components/Button";
import { getIssueBySlug } from "../../lib/issues";
import { notFound } from "next/navigation";
import { cn } from "../../lib/cn";

export const generateStaticParams = async () => {
  // In a real app, this would fetch from a CMS or database
  // For now, we return the demo issue
  const issues = [
    { params: { issue: "issue-000-demo" } }
  ];
  return issues;
};

export default function IssuePage({ params }: { params: { issue: string } }) {
  const issue = getIssueBySlug(params.issue);

  if (!issue) {
    notFound();
  }

  return (
    <Section id={`issue-${issue.slug}`}>
      <Container>
        <div className="mb-12">
          {issue.coverImage ? (
            <img
              src={issue.coverImage}
              alt={`Cover: ${issue.title || "Issue " + issue.number}`}
              className="w-full h-64 object-cover rounded-2xl mb-6"
            />
          ) : (
            <div className="w-full h-64 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center rounded-2xl mb-6">
              <span className="text-zinc-400 dark:text-zinc-500">[Cover Image]</span>
            </div>
          )}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {issue.title || "Issue " + issue.number}
          </h1>
          <p className="mb-4 text-lg text-zinc-600 dark:text-zinc-300">
            {new Date(issue.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mb-8 text-zinc-600 dark:text-zinc-300">
            {issue.description}
          </p>
        </div>

        <h2 className="mb-6 text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100">
          Articles in this Issue
        </h2>
        <p className="mb-10 max-w-2xl text-center text-zinc-600 dark:text-zinc-300">
          This issue contains {issue.articles.length} article{issue.articles.length !== 1 ? "s" : ""}.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {issue.articles.map((article) => (
            <Link
              key={article.slug}
              href={`/issues/${issue.slug}/${article.slug}`}
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
                  href={`/issues/${issue.slug}/${article.slug}`}
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