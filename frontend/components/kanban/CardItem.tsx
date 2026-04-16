"use client";

import type { Dispatch, CSSProperties } from "react";
import { CSS as DndCSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import type { Card, KanbanAction } from "../../lib/kanban/types";

export default function CardItem(props: {
  card: Card;
  dispatch: Dispatch<KanbanAction>;
}) {
  const { card, dispatch } = props;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id
  });

  const style: CSSProperties = {
    transform: DndCSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1
  };

  return (
    <article
      ref={setNodeRef}
      data-testid={`card-${card.id}`}
      style={style}
      className="rounded-lg border border-accentYellow/30 bg-white p-3 shadow-sm active:cursor-grabbing cursor-grab"
      {...attributes}
      {...listeners}
    >
      <div className="text-sm font-semibold text-darkNavy">{card.title}</div>
      <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-grayText">
        {card.details}
      </p>

      <div className="mt-3 flex items-center justify-end">
        <button
          type="button"
          data-testid={`delete-card-${card.id}`}
          className="rounded-md px-2 py-1 text-xs text-purpleSecondary hover:bg-purpleSecondary/10"
          onClick={() => dispatch({ type: "deleteCard", cardId: card.id })}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

