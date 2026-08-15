import type { ReactNode } from "react";
import { cn } from "../lib/cn";

// Container constrains page width and applies consistent horizontal padding.
// Use it as the outer wrapper for any page-level content.
type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
