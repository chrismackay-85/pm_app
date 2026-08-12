"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const sections = [
  { href: "/board", label: "Board" },
  { href: "/roadmap", label: "Roadmap" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-muted-gray/60 bg-white">
      <div className="h-1 w-full bg-gradient-brand" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-h5 text-dark-primary">
          Pattern <span className="font-accent text-bright-blue">PM</span>
        </span>
        <nav className="flex items-center gap-1">
          {sections.map((section) => {
            const active = pathname?.startsWith(section.href);
            return (
              <Link
                key={section.href}
                href={section.href}
                className={cn(
                  "rounded-button px-4 py-2 text-body-2 font-medium transition-colors",
                  active
                    ? "bg-gradient-cta text-white"
                    : "text-dark-primary hover:bg-light-gray"
                )}
              >
                {section.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
