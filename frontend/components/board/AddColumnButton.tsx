"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface AddColumnButtonProps {
  onAdd: (name: string) => void;
}

export function AddColumnButton({ onAdd }: AddColumnButtonProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  function commit() {
    const trimmed = draft.trim();
    if (trimmed) onAdd(trimmed);
    setDraft("");
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex min-w-[220px] flex-1 flex-col rounded-card border-2 border-dashed border-muted-gray bg-white/50 p-3">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") {
              setDraft("");
              setEditing(false);
            }
          }}
          placeholder="Column name"
          className="rounded-button border border-muted-gray bg-white px-2 py-1 text-overline text-dark-primary outline-none"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="flex min-w-[220px] flex-1 items-start justify-center gap-1 rounded-card border-2 border-dashed border-muted-gray p-3 text-body-3 text-dark-primary/50 hover:border-brand-blue hover:text-brand-blue"
    >
      <Plus size={14} className="mt-0.5" /> Add column
    </button>
  );
}
