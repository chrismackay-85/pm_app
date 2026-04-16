"use client";

import type { Dispatch } from "react";
import type { Column as KanbanColumn, KanbanAction } from "../../lib/kanban/types";
import CardItem from "./CardItem";
import AddCardForm from "./AddCardForm";
import RenamableTitle from "./RenamableTitle";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function Column(props: {
  column: KanbanColumn;
  dispatch: Dispatch<KanbanAction>;
}) {
  const { column, dispatch } = props;
  const cardIds = column.cards.map((c) => c.id);
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div
      data-testid={`column-${column.id}`}
      className="w-[320px] flex-shrink-0 rounded-xl border border-accentYellow/25 bg-white shadow-sm"
    >
      <div className="border-l-4 border-accentYellow/80 px-4 py-3">
        <RenamableTitle columnId={column.id} title={column.title} dispatch={dispatch} />
      </div>

      <div className="px-4 pb-4 pt-1">
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          <div
            ref={setNodeRef}
            data-testid={`column-drop-${column.id}`}
            className="space-y-3 min-h-[48px]"
          >
            {column.cards.map((card) => (
              <CardItem key={card.id} card={card} dispatch={dispatch} />
            ))}
            {column.cards.length === 0 ? (
              <div className="rounded-lg border border-dashed border-accentYellow/30 bg-[#fdfefe] p-4 text-xs text-grayText">
                Drop cards here
              </div>
            ) : null}
          </div>
        </SortableContext>

        <AddCardForm columnId={column.id} dispatch={dispatch} />
      </div>
    </div>
  );
}

