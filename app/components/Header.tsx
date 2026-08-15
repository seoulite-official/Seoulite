import Link from "next/link";
import type { ReactNode } from "react";
import { mainNav } from "../lib/navigation";
import { cn } from "../lib/cn";

// Header is a simple site header with logo (text for now) and navigation links.
// Layout is clean and works on mobile (hamburger not needed yet for few links).

type HeaderProps = {
  children?: ReactNode;
  className?: string;
};

export function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Seoulite
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors",
                // current route highlighting will be added later when needed
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {children && <div className="md:hidden">{children}</div>}
      </div>
    </header>
  );
}
