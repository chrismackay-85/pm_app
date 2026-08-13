"use client";

import { usePathname, useRouter } from "next/navigation";
import { SectionTabDropdown } from "@/components/ui/SectionTabDropdown";

const tabs = [
  { value: "meeting-notes", label: "Meeting Notes" },
  { value: "data-dictionary", label: "Data Dictionary" },
  { value: "ai-notes", label: "AI Notes" },
];

export function NotesTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const current = tabs.find((tab) => pathname?.endsWith(tab.value))?.value ?? "";

  return (
    <nav className="flex items-center gap-3 border-b border-muted-gray/60 bg-white px-6 py-2">
      <SectionTabDropdown
        ariaLabel="Jump to notes tab"
        placeholder="Section…"
        value={current}
        onChange={(value) => router.push(`/notes/${value}`)}
        options={tabs}
      />
    </nav>
  );
}
