import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "../lib/cn";

// Section provides vertical rhythm (top/bottom padding) for major page areas.
// id makes the section anchor-linkable.
type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  contained?: boolean;
};

export function Section({
  id,
  children,
  className,
  contained = true,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", className)}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
