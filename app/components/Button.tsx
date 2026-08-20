import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/cn";

type Variant = "primary" | "secondary" | "inverted";

const base =
  "inline-flex items-center justify-center rounded-md px-8 h-11 text-sm font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#111111]";

const variants: Record<Variant, string> = {
  primary: "bg-[#111111] text-white hover:bg-black",
  secondary:
    "border border-[#111111] bg-white text-[#111111] hover:bg-[#111111] hover:text-white",
  inverted: "bg-white text-[#111111] hover:bg-zinc-100",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}
