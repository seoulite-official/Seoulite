// Small helper for combining Tailwind class strings.
// Keeps components readable for beginners.
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
