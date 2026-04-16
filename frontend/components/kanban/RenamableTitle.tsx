"use client";

import { useState } from "react";
import type { Dispatch } from "react";
import type { KanbanAction } from "../../lib/kanban/types";

export default function RenamableTitle(props: {
  columnId: string;
  title: string;
  dispatch: Dispatch<KanbanAction>;
}) {
  const { columnId, title, dispatch } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(title);

  const commit = () => {
    const nextTitle = draft.trim();
    if (!nextTitle) {
      setDraft(title);
      setIsEditing(false);
      return;
    }

    dispatch({ type: "renameColumn", columnId, title: nextTitle });
    setIsEditing(false);
  };

  return (
    <div className="flex items-start justify-between gap-2">
      {isEditing ? (
        <div className="flex w-full items-center gap-2">
          <input
            data-testid={`rename-input-${columnId}`}
            className="w-full rounded-md border border-accentYellow/30 bg-white px-2 py-1 text-sm font-semibold text-darkNavy outline-none focus:ring-2 focus:ring-accentYellow/40"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") {
                setDraft(title);
                setIsEditing(false);
              }
            }}
            onBlur={() => commit()}
          />
          <button
            type="button"
            data-testid={`rename-save-${columnId}`}
            className="rounded-md bg-purpleSecondary px-3 py-1 text-xs font-semibold text-white/95"
            onClick={commit}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <h2
            data-testid={`column-title-${columnId}`}
            className="text-base font-bold tracking-tight text-darkNavy"
          >
            {title}
          </h2>
          <button
            type="button"
            data-testid={`rename-button-${columnId}`}
            className="rounded-md px-2 py-1 text-xs font-semibold text-purpleSecondary hover:bg-purpleSecondary/10"
            onClick={() => setIsEditing(true)}
          >
            Rename
          </button>
        </>
      )}
    </div>
  );
}

