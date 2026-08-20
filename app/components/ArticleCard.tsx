import Link from "next/link";
import { cn } from "../lib/cn";

type ArticleCardProps = {
  href: string;
  image?: string | null;
  date: string;
  title: string;
  author?: string;
  className?: string;
};

export function ArticleCard({
  href,
  image,
  date,
  title,
  author = "Seoulite",
  className,
}: ArticleCardProps) {
  const initial = author.trim().charAt(0).toUpperCase() || "S";

  return (
    <Link href={href} className={cn("group block", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
        {image ? (
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-200 font-serif text-4xl text-zinc-500">
            {title.charAt(0)}
          </div>
        )}
      </div>
      <p className="mt-4 text-[13px] text-[#8a8a8a]">{date}</p>
      <h3 className="mt-2 font-serif text-[1.35rem] font-bold leading-snug text-[#111111] group-hover:underline decoration-1 underline-offset-4">
        {title}
      </h3>
      <div className="mt-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#111111] text-xs font-semibold text-white">
          {initial}
        </span>
        <span className="text-[13px] text-[#8a8a8a]">{author}</span>
      </div>
    </Link>
  );
}
