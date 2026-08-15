// Issue and Article data model for Seoulite
// This file defines the data structure for the issue/archive system.
// All content here is clearly marked as placeholder/demo and will be replaced
// with real Seoulite issues when the user provides them.


export type Article = {
  slug: string;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  image?: string;
  // Content will eventually be MDX or separate files; for now we'll use a simple string placeholder
  // that can be replaced with real content later
  contentPlaceholder: string;
};

export type Issue = {
  slug: string;
  number: number;
  date: string;
  title?: string;
  description: string;
  coverImage?: string;
  articles: Article[];
};

const demoArticles: Record<string, Article[]> = {
  "issue-000-demo": [
    {
      slug: "welcome-note",
      title: "Welcome to the Demo Issue",
      author: "Seoulite Team",
      category: "Editorial",
      excerpt: "This is a demonstration article showing how the issue system works.",
      image: "issues/issue-000-demo/articles/welcome-note.svg",
      contentPlaceholder: "This article demonstrates the infrastructure for Seoulite's past issues system. Real Seoulite issues will replace this demo content when the user provides the final archive. The system supports: issue archive listing at /issues, individual issue pages at /issues/[issue-slug], and individual article pages at /issues/[issue-slug]/[article-slug]."
    },
    {
      slug: "how-it-works",
      title: "How the Issue System Works",
      author: "Developer",
      category: "Technical",
      excerpt: "Technical overview of the issue/archive infrastructure.",
      image: "issues/issue-000-demo/articles/how-it-works.svg",
      contentPlaceholder: "Data Structure: Each issue contains slug (for URL), number (sequential), publication date, optional title, description, optional cover image, and list of articles. Each article contains: slug (unique within issue), title, author, category, excerpt, optional thumbnail image, and content."
    }
  ]
};

export const allIssues: Issue[] = [
  {
    slug: "issue-000-demo",
    number: 0,
    date: "2024-01-01",
    title: "Demo Issue",
    description: "This is a demonstration issue to verify the issue/archive infrastructure works correctly. Replace with real Seoulite issues.",
    coverImage: "issues/issue-000-demo/cover.svg",
    articles: demoArticles["issue-000-demo"]
  }
];

export function getAllIssues(): Issue[] {
  return [...allIssues].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getIssueBySlug(slug: string): Issue | undefined {
  return allIssues.find((issue) => issue.slug === slug);
}

export function getArticleBySlug(
  issueSlug: string,
  articleSlug: string
): Article | undefined {
  const issue = getIssueBySlug(issueSlug);
  if (!issue) return undefined;
  return issue.articles.find((article) => article.slug === articleSlug);
}