"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card as CardType } from "@/lib/types";

type CardProps = {
  card: CardType;
  onDelete: (cardId: string) => void;
};

export function Card({ card, onDelete }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      data-testid={`card-${card.id}`}
      className={`group relative rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md ${
        isDragging ? "z-10 opacity-60 shadow-lg" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          aria-label={`Drag ${card.title}`}
          className="mt-0.5 shrink-0 cursor-grab text-gray active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="4" cy="3" r="1.5" />
            <circle cx="10" cy="3" r="1.5" />
            <circle cx="4" cy="7" r="1.5" />
            <circle cx="10" cy="7" r="1.5" />
            <circle cx="4" cy="11" r="1.5" />
            <circle cx="10" cy="11" r="1.5" />
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-navy">{card.title}</h3>
          {card.details ? (
            <p className="mt-1 text-sm leading-relaxed text-gray">
              {card.details}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          aria-label={`Delete ${card.title}`}
          className="shrink-0 rounded p-1 text-gray opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
          onClick={() => onDelete(card.id)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M2 4h10M5 4V2.5h4V4M5.5 6v4.5M8.5 6v4.5M3.5 4l.5 7.5h6l.5-7.5" />
          </svg>
        </button>
      </div>
    </article>
  );
}
