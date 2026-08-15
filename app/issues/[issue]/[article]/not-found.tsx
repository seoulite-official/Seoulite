import Link from "next/link";

export const metadata = {
  title: "Article Not Found",
};

export default function ArticleNotFound() {
  return (
    <section className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Article Not Found
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          The article you&apos;re looking for doesn&apos;t exist in this issue.
        </p>
        <Link
          href="../../.."
          className="inline-flex items-center justify-center rounded-full px-5 h-11 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          {'← Back to Issues Archive'}
        </Link>
      </div>
    </section>
  );
}