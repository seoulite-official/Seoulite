import { Section } from "../components/Section";
import { Container } from "../components/Container";
import Link from "next/link";
import { getPublishedIssues } from "@/app/lib/server/issues";
import { cn } from "../lib/cn";
import { demoArticles } from "@/app/lib/issues";

export const dynamic = "force-dynamic";

export default async function Issues() {
  const prismaIssues = await getPublishedIssues();

  const issues = prismaIssues.map((issue) => ({
    ...issue,
    coverImage: issue.coverImageKey ?? undefined,
    articles: demoArticles[issue.slug] || [],
  }));

  return (
    <Section id="issues">
      <Container>
        <h2 className="mb-10 text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100">
          Seoulite Issues Archive
        </h2>

        <p className="mb-12 max-w-2xl text-center text-zinc-600 dark:text-zinc-300">
          Browse past issues of Seoulite. Each issue contains multiple articles on various topics.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {issues.map((issue) => (
            <Link
              key={issue.slug}
              href={`/issues/${issue.slug}`}
              className={cn(
                "group",
                "border border-zinc-200 rounded-2xl bg-white dark:border-zinc-800 dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors",
                "flex flex-col h-full"
              )}
            >
              {issue.coverImage ? (
                <img
                  src={issue.coverImage}
                  alt={`Cover: ${issue.title || "Issue " + issue.number}`}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-48 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center rounded-t-2xl">
                  <span className="text-zinc-400 dark:text-zinc-500">
                    [Cover Image]
                  </span>
                </div>
              )}

              <div className="flex-1 flex flex-col p-6">
                <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {issue.title || "Issue " + issue.number}
                </h3>

                <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {new Date(issue.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <p className="flex-1 text-zinc-600 dark:text-zinc-300">
                  {issue.description}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-4 self-start inline-flex items-center justify-center rounded-full px-5 h-11 text-sm font-medium transition-colors border border-zinc-300 text-zinc-900 group-hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:group-hover:bg-zinc-800"
                >
                  Read Issue
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
