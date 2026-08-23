"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { mainNav, siteConfig, socialLinks } from "../lib/navigation";
import { cn } from "../lib/cn";

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  const common = "h-3.5 w-3.5 fill-current";
  switch (icon) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden>
          <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3-3zm-4 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.4 7.1a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
        </svg>
      );
  }
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const path = href.split("#")[0];
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const next = query.trim();
    setOpen(false);
    router.push(next ? `/issues?q=${encodeURIComponent(next)}` : "/issues");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#111111] text-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="shrink-0 flex items-center gap-3"
        >
          <img
            src="/design/logo.jpg"
            alt="Seoulite"
            className="h-10 w-auto dark:invert transition-opacity group-hover:opacity-90"
          />
          <span className="text-3xl font-serif font-bold tracking-tighter text-white group-hover:opacity-90 transition-opacity">
            Seoulite
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] font-medium text-white/90 transition-colors hover:text-white",
                isActive(link.href) && "underline decoration-1 underline-offset-[6px]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <form onSubmit={onSearch} className="relative">
            <label htmlFor="site-search" className="sr-only">
              Search issues
            </label>
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search...."
              className="h-9 w-44 rounded-full bg-white px-4 pr-9 text-sm text-[#111111] placeholder:text-zinc-400 outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500"
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
          </form>
          <div className="flex items-center gap-3 text-white">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="opacity-90 hover:opacity-100"
              >
                <SocialIcon icon={item.icon} />
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={cn("h-px w-5 bg-white transition", open && "translate-y-2 rotate-45")} />
            <span className={cn("h-px w-5 bg-white transition", open && "opacity-0")} />
            <span className={cn("h-px w-5 bg-white transition", open && "-translate-y-2 -rotate-45")} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#111111] px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-sm text-white",
                  isActive(link.href) && "underline underline-offset-4",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <form onSubmit={onSearch} className="relative mt-5">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search...."
              className="h-10 w-full rounded-full bg-white px-4 pr-10 text-sm text-[#111111] placeholder:text-zinc-400 outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </header>
  );
}