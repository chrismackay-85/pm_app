"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import type { Column as ColumnType, Card as CardType } from "@/lib/types";
import { Card } from "./Card";
import { ColumnHeader } from "./ColumnHeader";
import { AddCardForm } from "./AddCardForm";

type ColumnProps = {
  column: ColumnType;
  cards: CardType[];
  onRename: (columnId: string, title: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
};

export function Column({
  column,
  cards,
  onRename,
  onAddCard,
  onDeleteCard,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <section
      data-testid={`column-${column.id}`}
      className="flex w-[280px] shrink-0 flex-col rounded-xl bg-slate-50 p-3 shadow-sm ring-1 ring-gray-100"
    >
      <ColumnHeader
        title={column.title}
        onRename={(title) => onRename(column.id, title)}
      />
      <div
        ref={setNodeRef}
        data-testid={`column-drop-${column.id}`}
        className={`mt-3 flex min-h-[120px] flex-1 flex-col gap-2 rounded-lg p-1 transition ${
          isOver ? "bg-primary/5 ring-2 ring-primary/20" : ""
        }`}
      >
        <SortableContext
          items={column.cardIds}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} onDelete={onDeleteCard} />
          ))}
        </SortableContext>
      </div>
      <AddCardForm
        onAdd={(title, details) => onAddCard(column.id, title, details)}
      />
    </section>
  );
}
