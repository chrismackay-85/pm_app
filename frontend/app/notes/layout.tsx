import type { ReactNode } from "react";
import { NotesTabs } from "@/components/notes/NotesTabs";

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <NotesTabs />
      <div className="w-full flex-1 px-6 py-8">{children}</div>
    </div>
  );
}
