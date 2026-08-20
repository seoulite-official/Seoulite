import Link from "next/link";
import { cn } from "../lib/cn";
import { coverUrl, formatDisplayDate } from "../lib/media";

type IssueCardProps = {
  issue: {
    id: string;
    slug: string;
    number: number;
    date: string;
    title?: string | null;
    description: string;
    coverImageKey?: string | null;
    coverImageOriginalName?: string | null;
    publicationKey?: string | null;
    published?: boolean;
    publishedAt?: string | Date | null;
  };
  className?: string;
  unpublishedOverlay?: boolean;
};

export function IssueCard({
  issue,
  className = "",
  unpublishedOverlay = false,
}: IssueCardProps) {
  const {
    number,
    date,
    title,
    description,
    slug,
    coverImageKey,
    published,
    publishedAt,
  } = issue;
  const image = coverUrl(coverImageKey);
  const heading = title || `Issue ${number}`;

  return (
    <Link href={`/issues/${slug}`} className={cn("group relative block", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
        {image ? (
          <img
            src={image}
            alt={heading}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-200 font-serif text-5xl text-zinc-500">
            {number}
          </div>
        )}
        {!published && unpublishedOverlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-xs font-semibold uppercase tracking-widest text-white">Draft</span>
          </div>
        )}
      </div>
      <p className="mt-4 text-[13px] text-[#8a8a8a]">{formatDisplayDate(date)}</p>
      <h3 className="mt-2 font-serif text-[1.35rem] font-bold leading-snug text-[#111111] group-hover:underline">
        {heading}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#555555]">{description}</p>
      <div className="mt-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-xs font-semibold text-white">
          S
        </span>
        <span className="text-[13px] text-[#8a8a8a]">Seoulite Editors</span>
      </div>
      {published && publishedAt ? (
        <span className="sr-only">
          Published {formatDisplayDate(publishedAt)}
        </span>
      ) : null}
    </Link>
  );
}
