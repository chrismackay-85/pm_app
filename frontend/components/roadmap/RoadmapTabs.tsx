"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { appendixOrder, appendices, appendixHSeed } from "@/lib/seedRoadmap";
import { cn } from "@/lib/cn";

function titleFor(letter: string) {
  return letter === "H" ? appendixHSeed.title : appendices[letter]?.title;
}

export function RoadmapTabs() {
  const params = useParams<{ appendixId?: string }>();
  const current = params?.appendixId ?? "overview";

  return (
    <nav className="flex flex-wrap gap-1 border-b border-muted-gray/60 bg-white px-6 py-2">
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
      {appendixOrder.map((letter) => (
        <Link
          key={letter}
          href={`/roadmap/${letter.toLowerCase()}`}
          title={titleFor(letter)}
          className={cn(
            "rounded-button px-3 py-1.5 text-body-3 font-medium transition-colors",
            current === letter.toLowerCase()
              ? "bg-gradient-cta text-white"
              : "text-dark-primary/70 hover:bg-light-gray"
          )}
        >
          {letter}
        </Link>
      ))}
    </nav>
  );
}
