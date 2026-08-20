"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { mainNav, siteConfig, socialLinks } from "../lib/navigation";
import { cn } from "../lib/cn";

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  const common = "h-3.5 w-3.5 fill-current";
  switch (icon) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden>
          <path d="M14 9h3V6h-3c-1.7 0-3 1.4-3 3.1V11H8v3h3v7h3v-7h3l1-3h-4V9.2c0-.1.1-.2.2-.2z" />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden>
          <path d="M18.2 7.1c.6-.4 1.1-.9 1.5-1.5-.6.3-1.2.5-1.9.6A2.6 2.6 0 0 0 13.4 9c0 .2 0 .4.1.6-2.2-.1-4.1-1.2-5.4-2.8-.2.4-.3.8-.3 1.2 0 .9.5 1.7 1.2 2.2-.5 0-.9-.1-1.3-.4v.1c0 1.3.9 2.3 2.1 2.6-.2.1-.5.1-.7.1-.2 0-.3 0-.5-.1.3 1 1.3 1.8 2.4 1.8A5.2 5.2 0 0 1 6 16.4 7.4 7.4 0 0 0 10 17.6c4.8 0 7.4-4 7.4-7.4v-.3c.5-.4 1-.9 1.4-1.4-.5.2-1 .4-1.6.6z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden>
          <path d="M7.1 9H4.2v11h2.9V9zM5.6 4C4.6 4 3.8 4.8 3.8 5.8S4.6 7.6 5.6 7.6 7.5 6.8 7.5 5.8 6.7 4 5.6 4zM20 13.3c0-2.4-1.3-3.5-3-3.5-1.4 0-2 .8-2.4 1.3V9H12v11h2.9v-6.1c0-.3 0-.7.1-1 .3-.7.9-1.4 1.9-1.4 1.3 0 1.9 1 1.9 2.5V20H21v-6.7z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden>
          <path d="M22 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C18.4 5.4 12 5.4 12 5.4s-6.4 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9 2 12.2 2 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.4.4 7.8.4 7.8.4s6.4 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM10 15.2V9.2l5.2 3-5.2 3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden>
          <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm-4 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.4 7.1a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
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
          className="shrink-0 font-serif text-2xl font-bold tracking-[0.12em] uppercase text-white"
        >
          {siteConfig.name}
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
