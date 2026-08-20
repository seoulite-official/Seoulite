import Link from "next/link";
import Image from "next/image";
import type { Issue } from "@/app/lib/issues";
import { coverUrl, formatDisplayDate, publicationUrl } from "@/app/lib/media";
import { ButtonLink } from "./Button";

export default function EditorialHero({ latestIssue }: { latestIssue: Issue }) {
  const image = coverUrl(latestIssue.coverImageKey) ?? "/design/banner.jpg";
  const pdf = publicationUrl(latestIssue.publicationKey);
  const heading = latestIssue.title || `Issue ${latestIssue.number}`;

  return (
    <section className="border-y border-zinc-100 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10">
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 sm:aspect-[5/4]">
          <Image
            src={image}
            alt={heading}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a8a8a]">
            Latest issue · {formatDisplayDate(latestIssue.date)}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-[#111111]">{heading}</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#555555]">
            {latestIssue.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink variant="primary" href={`/issues/${latestIssue.slug}`}>
              Read Issue {latestIssue.number}
            </ButtonLink>
            {pdf ? (
              <ButtonLink variant="secondary" href={pdf}>
                Download PDF
              </ButtonLink>
            ) : null}
          </div>
          <Link href="/issues" className="mt-6 inline-block text-sm text-[#8a8a8a] underline-offset-4 hover:underline">
            Browse the archive
          </Link>
        </div>
      </div>
    </section>
  );
}
