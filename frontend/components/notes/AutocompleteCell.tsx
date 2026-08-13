"use client";

import { useEffect, useRef, useState } from "react";

interface AutocompleteCellProps {
  value: string;
  suggestions: string[];
  isEditing: boolean;
  onStartEdit: () => void;
  onCommit: (value: string) => void;
  onTabNext: (committedValue: string) => void;
  onExitEdit: () => void;
}

export function AutocompleteCell({
  value,
  suggestions,
  isEditing,
  onStartEdit,
  onCommit,
  onTabNext,
  onExitEdit,
}: AutocompleteCellProps) {
  const [draft, setDraft] = useState(value);
  const [prevEditing, setPrevEditing] = useState(isEditing);
  const inputRef = useRef<HTMLInputElement>(null);

  if (isEditing !== prevEditing) {
    setPrevEditing(isEditing);
    if (isEditing) setDraft(value);
  }

  useEffect(() => {
    if (isEditing) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isEditing]);

  function commit(finalValue: string) {
    if (finalValue !== value) onCommit(finalValue);
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={onStartEdit}
        className="block w-full min-w-[8rem] rounded-button px-2 py-1 text-left text-body-3 text-dark-primary hover:bg-white/60"
      >
        {value || <span className="text-muted-gray">—</span>}
      </button>
    );
  }

  const suggestion =
    draft.trim().length > 0
      ? suggestions.find(
          (s) => s.toLowerCase().startsWith(draft.toLowerCase()) && s.toLowerCase() !== draft.toLowerCase()
        )
      : undefined;

  return (
    <div className="relative">
      {suggestion && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center overflow-hidden px-2 py-1 text-body-3 whitespace-pre"
        >
          <span className="invisible">{draft}</span>
          <span className="text-muted-gray">{suggestion.slice(draft.length)}</span>
        </div>
      )}
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => commit(draft)}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const finalValue = suggestion ?? draft;
            commit(finalValue);
            onTabNext(finalValue);
          } else if (e.key === "Enter") {
            commit(draft);
            onExitEdit();
          } else if (e.key === "Escape") {
            setDraft(value);
            onExitEdit();
          }
        }}
        className="relative z-10 w-full min-w-[8rem] rounded-button border border-brand-blue bg-transparent px-2 py-1 text-body-3 outline-none"
      />
    </div>
  );
}
