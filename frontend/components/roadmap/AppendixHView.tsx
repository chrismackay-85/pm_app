"use client";

import { useRoadmapStore } from "@/lib/roadmapStore";

export function AppendixHView() {
  const appendixH = useRoadmapStore((s) => s.appendixH);
  const updateSection = useRoadmapStore((s) => s.updateSection);

  return (
    <div className="flex flex-col gap-5">
      {appendixH.sections.map((section) => (
        <div key={section.id} className="rounded-card bg-white p-4 shadow-brand">
          <h4 className="mb-2 text-body-1 font-medium text-dark-primary">{section.heading}</h4>
          <textarea
            defaultValue={section.body}
            onBlur={(e) => updateSection(section.id, e.target.value)}
            rows={3}
            className="w-full resize-y rounded-button border border-muted-gray/70 bg-light-gray px-3 py-2 text-body-3 text-dark-primary outline-none focus:border-brand-blue"
          />
        </div>
      ))}
    </div>
  );
}
