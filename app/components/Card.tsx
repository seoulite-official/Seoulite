import type { ReactNode } from "react";
import { cn } from "../lib/cn";

// Card is a generic rounded container with a border.
// Used for features, items, etc.
type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700",
        className,
      )}
    >
      {children}
    </div>
  );
}
