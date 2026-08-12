"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import type { KanbanCard, KanbanColumn } from "@/lib/types";
import { SortableCard } from "./SortableCard";

interface ColumnProps {
  column: KanbanColumn;
  cards: KanbanCard[];
  activeId: string | null;
  onRename: (columnId: string, name: string) => void;
  onArchive: (cardId: string) => void;
  onDelete: (cardId: string) => void;
  onAddCard: (columnId: string) => void;
}

export function Column({ column, cards, activeId, onRename, onArchive, onDelete, onAddCard }: ColumnProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(column.name);
  const { setNodeRef } = useDroppable({ id: column.id, data: { type: "column", columnId: column.id } });

  function commitRename() {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed !== column.name) {
      onRename(column.id, trimmed);
    } else {
      setDraft(column.name);
    }
  }

  return (
    <div
      data-column-id={column.id}
      className="flex min-w-[220px] flex-1 flex-col rounded-card bg-light-gray p-3"
    >
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitRename();
            if (e.key === "Escape") {
              setDraft(column.name);
              setEditing(false);
            }
          }}
          className="mb-3 rounded-button border border-muted-gray bg-white px-2 py-1 text-overline text-dark-primary outline-none"
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="mb-3 truncate rounded-button px-2 py-1 text-left text-overline text-dark-primary/70 hover:bg-white"
        >
          {column.name} · {cards.length}
        </button>
      )}

      <div ref={setNodeRef} className="flex min-h-[40px] flex-1 flex-col gap-2">
        <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <SortableCard
              key={card.id}
              card={card}
              columnId={column.id}
              onArchive={onArchive}
              onDelete={onDelete}
              dragging={activeId === card.id}
            />
          ))}
        </SortableContext>
      </div>

      <button
        type="button"
        onClick={() => onAddCard(column.id)}
        className="mt-3 flex items-center justify-center gap-1 rounded-button py-2 text-body-3 text-dark-primary/60 hover:bg-white hover:text-brand-blue"
      >
        <Plus size={14} /> Add card
      </button>
    </div>
  );
}
