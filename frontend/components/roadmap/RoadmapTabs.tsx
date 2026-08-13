"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { appendixOrder, appendices, appendixHSeed } from "@/lib/seedRoadmap";
import { SectionTabDropdown } from "@/components/ui/SectionTabDropdown";
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

      <SectionTabDropdown
        ariaLabel="Jump to appendix"
        placeholder="Appendix…"
        value={isAppendixActive ? current : ""}
        onChange={(value) => router.push(`/roadmap/${value}`)}
        options={appendixOrder.map((letter) => ({
          value: letter.toLowerCase(),
          label: `${letter} — ${titleFor(letter)}`,
        }))}
      />
    </nav>
  );
}
