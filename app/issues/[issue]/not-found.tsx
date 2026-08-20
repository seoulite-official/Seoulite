import Link from "next/link";

export const metadata = {
  title: "Issue Not Found",
};

export default function IssueNotFound() {
  return (
    <section className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center bg-white py-12">
      <div className="text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold text-[#111111]">Issue Not Found</h1>
        <p className="mb-8 max-w-xl text-[#555555]">
          The issue you&apos;re looking for doesn&apos;t exist or hasn&apos;t been published yet.
        </p>
        <Link
          href="/issues"
          className="inline-flex h-11 items-center justify-center bg-[#111111] px-8 text-sm font-semibold text-white hover:bg-black"
        >
          Back to Issues Archive
        </Link>
      </div>
    </section>
  );
}
