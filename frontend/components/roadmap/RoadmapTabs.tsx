"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { appendixOrder, appendices, appendixHSeed } from "@/lib/seedRoadmap";
import { cn } from "@/lib/cn";

function titleFor(letter: string) {
  return letter === "H" ? appendixHSeed.title : appendices[letter]?.title;
}

export function RoadmapTabs() {
  const router = useRouter();
  const params = useParams<{ appendixId?: string }>();
  const current = params?.appendixId ?? "overview";
  const isAppendixActive = current !== "overview";

  return (
    <nav className="flex flex-wrap items-center gap-3 border-b border-muted-gray/60 bg-white px-6 py-2">
      <Link
        href="/roadmap/overview"
        className={cn(
          "rounded-button px-3 py-1.5 text-body-3 font-medium transition-colors",
          current === "overview"
            ? "bg-gradient-cta text-white"
            : "text-dark-primary/70 hover:bg-light-gray"
        )}
      >
        Overview
      </Link>

      <div className="relative">
        <select
          aria-label="Jump to appendix"
          value={isAppendixActive ? current : ""}
          onChange={(e) => router.push(`/roadmap/${e.target.value}`)}
          className={cn(
            "appearance-none rounded-button border py-1.5 pr-8 pl-3 text-body-3 font-medium outline-none transition-colors",
            isAppendixActive
              ? "border-brand-blue text-brand-blue"
              : "border-muted-gray/60 text-dark-primary/70 hover:bg-light-gray"
          )}
        >
          <option value="" disabled>
            Appendix…
          </option>
          {appendixOrder.map((letter) => (
            <option key={letter} value={letter.toLowerCase()}>
              {letter} — {titleFor(letter)}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-dark-primary/50"
        />
      </div>
    </nav>
  );
}
