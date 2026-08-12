import type { ReactNode } from "react";
import { RoadmapTabs } from "@/components/roadmap/RoadmapTabs";

export default function RoadmapLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <RoadmapTabs />
      <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">{children}</div>
    </div>
  );
}
