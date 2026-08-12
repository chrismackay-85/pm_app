"use client";

import { useParams } from "next/navigation";
import { OverviewView } from "@/components/roadmap/OverviewView";
import { AppendixHView } from "@/components/roadmap/AppendixHView";
import { EditableAppendixTable } from "@/components/roadmap/EditableAppendixTable";
import { useRoadmapStore } from "@/lib/roadmapStore";

export default function AppendixPage() {
  const params = useParams<{ appendixId: string }>();
  const appendixId = params.appendixId?.toLowerCase();
  const appendices = useRoadmapStore((s) => s.appendices);
  const appendixHTitle = useRoadmapStore((s) => s.appendixH.title);

  if (appendixId === "overview") {
    return <OverviewView />;
  }

  if (appendixId === "h") {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-h4 text-dark-primary">Appendix H — {appendixHTitle}</h1>
        </div>
        <AppendixHView />
      </div>
    );
  }

  const table = appendices[appendixId?.toUpperCase() ?? ""];
  if (!table) {
    return <p className="text-body-2 text-dark-primary/60">Unknown appendix.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-h4 text-dark-primary">
          Appendix {table.letter} — {table.title}
        </h1>
        <p className="mt-1 text-body-3 text-dark-primary/60">{table.description}</p>
      </div>
      <EditableAppendixTable table={table} />
    </div>
  );
}
