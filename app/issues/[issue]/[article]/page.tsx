import { Section } from "../../../components/Section";
import { Container } from "../../../components/Container";
import Link from "next/link";
import { ButtonLink } from "../../../components/Button";
import { getArticleBySlug } from "../../../lib/issues";
import { notFound } from "next/navigation";
import { cn } from "../../../lib/cn";

export const generateStaticParams = async () => {
  // In a real app, this would fetch from a CMS or database
  // For now, we return the demo article(s) from the demo issue
  const demoIssueSlug = "issue-000-demo";
  const demoArticles = [
    { params: { issue: demoIssueSlug, article: "welcome-note" } },
    { params: { issue: demoIssueSlug, article: "how-it-works" } }
  ];
  return demoArticles;
};

export default async function ArticlePage(
  { params }: { params: Promise<{ issue: string; article: string }> }
) {
  const { issue, article } = await params;
  const articleData = await getArticleBySlug(issue, article);

  if (!articleData) {
    notFound();
  }

  // We could fetch the issue for breadcrumbs/context, but for minimal infrastructure
  // we'll just show the article directly. The issue context is in the URL.

  return (
    <Section id={`article-${articleData.slug}`}>
      <Container>
        <div className="mb-8">
          <Link
            href={`/issues/${issue}`}
            className="inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            ← Back to Issue {issue.toUpperCase()}
          </Link>
        </div>

        {articleData.image ? (
          <img
            src={articleData.image}
            alt={articleData.title}
            className="w-full h-64 object-cover rounded-xl mb-8"
          />
        ) : (
          <div className="w-full h-64 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center rounded-xl mb-8">
            <span className="text-zinc-400 dark:text-zinc-500">[Article Image]</span>
          </div>
        )}

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {articleData.title}
        </h1>
        <div className="mb-6 flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span>{articleData.category}</span>
          <span>•</span>
          <span>{articleData.author}</span>
        </div>
        <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-300">
          {articleData.excerpt}
        </p>

        <div className="prose prose-zinc max-w-none">
          <p>{articleData.contentPlaceholder}</p>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href={`/issues/${issue}`}
            className="inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            ← Back to Issue {issue.toUpperCase()}
          </Link>
        </div>
      </Container>
    </Section>
  );
}