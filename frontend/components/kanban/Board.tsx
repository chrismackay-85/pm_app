"use client";

import type { Dispatch } from "react";
import type { KanbanAction, KanbanBoardState } from "../../lib/kanban/types";
import Column from "./Column";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";

export default function Board(props: {
  state: KanbanBoardState;
  dispatch: Dispatch<KanbanAction>;
}) {
  const { state, dispatch } = props;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    })
  );

  const getColumnIdForCardId = (cardId: string) =>
    state.columns.find((col) => col.cards.some((c) => c.id === cardId))?.id;

  const handleDragEnd = (event: DragEndEvent) => {
    const activeCardId = String(event.active.id);
    const overId = event.over ? String(event.over.id) : null;
    if (!overId) return;

    const sourceColumnId = getColumnIdForCardId(activeCardId);
    if (!sourceColumnId) return;

    const destinationColumnId = state.columns.some((c) => c.id === overId)
      ? overId
      : getColumnIdForCardId(overId);

    if (!destinationColumnId) return;
    if (destinationColumnId === sourceColumnId) return;

    dispatch({ type: "moveCard", cardId: activeCardId, toColumnId: destinationColumnId });
  };

  return (
    <main className="min-h-screen bg-[#f7f9fb] p-6">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-darkNavy">
            Kanban Board
          </h1>
          <p className="mt-1 text-grayText">Single-board MVP with 5 renameable columns.</p>
        </header>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <section className="flex gap-4 overflow-x-auto pb-3">
            {state.columns.map((col) => (
              <Column key={col.id} column={col} dispatch={dispatch} />
            ))}
          </section>
        </DndContext>
      </div>
    </main>
  );
}

