import type { ReactNode } from "react";
import { cn } from "../lib/cn";

// Footer is a simple site footer.
// It currently contains placeholder text and will be updated when the final design is provided.

type FooterProps = {
  children?: ReactNode;
  className?: string;
};

export function Footer({ children, className }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-zinc-200 bg-zinc-50 py-8 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <p className="text-center">
          © {new Date().getFullYear()} Seoulite. All rights reserved.
        </p>
        {children && <div className="mt-4 text-center">{children}</div>}
      </div>
    </footer>
  );
}
