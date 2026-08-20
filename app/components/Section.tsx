import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "../lib/cn";

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
    <section id={id} className={cn("py-14 sm:py-16 lg:py-20", className)}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
