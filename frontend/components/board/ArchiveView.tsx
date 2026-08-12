"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useKanbanStore } from "@/lib/kanbanStore";

export function ArchiveView() {
  const cards = useKanbanStore((s) => s.cards);
  const archivedCardIds = useKanbanStore((s) => s.archivedCardIds);
  const unarchiveCard = useKanbanStore((s) => s.unarchiveCard);

  const archivedCards = archivedCardIds.map((id) => cards[id]).filter(Boolean);

  return (
    <div className="mx-auto flex max-w-6xl flex-1 flex-col gap-6 px-6 py-8">
      <div className="flex items-center gap-3">
        <Link
          href="/board"
          className="flex items-center gap-1 rounded-button px-2 py-1 text-body-3 text-dark-primary/60 hover:bg-light-gray"
        >
          <ArrowLeft size={16} /> Board
        </Link>
      </div>
      <h1 className="text-h3 text-dark-primary">Archived cards</h1>

      {archivedCards.length === 0 ? (
        <p className="text-body-3 text-dark-primary/60">No archived cards yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {archivedCards.map((card) => (
            <div
              key={card.id}
              className="flex items-start justify-between gap-4 rounded-card bg-white p-4 shadow-brand"
            >
              <div>
                <h4 className="text-body-2 font-medium text-dark-primary">{card.title}</h4>
                {card.details ? (
                  <p className="mt-1 text-body-3 text-dark-primary/70">{card.details}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => unarchiveCard(card.id)}
                className="flex shrink-0 items-center gap-1 rounded-button px-3 py-1.5 text-body-3 text-brand-blue hover:bg-light-gray"
              >
                <RotateCcw size={14} /> Unarchive
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
