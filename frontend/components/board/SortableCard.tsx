"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { KanbanCard } from "@/lib/types";
import { CardContent } from "./CardContent";

interface SortableCardProps {
  card: KanbanCard;
  columnId: string;
  onArchive: (cardId: string) => void;
  onDelete: (cardId: string) => void;
  dragging?: boolean;
}

export function SortableCard({ card, columnId, onArchive, onDelete, dragging }: SortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { type: "card", columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardContent card={card} onArchive={onArchive} onDelete={onDelete} dimmed={isDragging || dragging} />
    </div>
  );
}
