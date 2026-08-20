import Link from "next/link";
import { mainNav, siteConfig, socialLinks } from "../lib/navigation";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-3 lg:px-10">
        <div>
          <p className="font-serif text-2xl font-bold tracking-[0.12em] uppercase">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            {siteConfig.description}
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          {mainNav.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/80 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Follow</p>
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
