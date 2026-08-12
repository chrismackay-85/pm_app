"use client";

import { useState } from "react";

interface EditableCellProps {
  value: string;
  onCommit: (value: string) => void;
}

export function EditableCell({ value, onCommit }: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function commit() {
    setEditing(false);
    if (draft !== value) onCommit(draft);
  }

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
          }
        }}
        className="w-full min-w-[8rem] rounded-button border border-brand-blue bg-white px-2 py-1 text-body-3 outline-none"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      className="block w-full min-w-[8rem] rounded-button px-2 py-1 text-left text-body-3 text-dark-primary hover:bg-white/60"
    >
      {value || <span className="text-muted-gray">—</span>}
    </button>
  );
}
