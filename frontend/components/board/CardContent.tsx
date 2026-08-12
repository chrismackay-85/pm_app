import { Archive, Trash2 } from "lucide-react";
import type { KanbanCard } from "@/lib/types";
import { cn } from "@/lib/cn";

interface CardContentProps {
  card: KanbanCard;
  onArchive?: (cardId: string) => void;
  onDelete?: (cardId: string) => void;
  dimmed?: boolean;
  overlay?: boolean;
}

export function CardContent({ card, onArchive, onDelete, dimmed, overlay }: CardContentProps) {
  return (
    <div
      className={cn(
        "group rounded-card bg-white p-4 shadow-brand transition-opacity",
        dimmed && "opacity-40",
        overlay && "shadow-brand-lg"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-body-2 font-medium text-dark-primary">{card.title}</h4>
        {onArchive && onDelete ? (
          <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => onArchive(card.id)}
              aria-label="Archive card"
              className="rounded-button p-1 text-muted-gray hover:bg-light-gray hover:text-brand-blue"
            >
              <Archive size={14} />
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => onDelete(card.id)}
              aria-label="Delete card"
              className="rounded-button p-1 text-muted-gray hover:bg-light-gray hover:text-brand-purple"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ) : null}
      </div>
      {card.details ? (
        <p className="mt-2 text-body-3 text-dark-primary/70">{card.details}</p>
      ) : null}
    </div>
  );
}
