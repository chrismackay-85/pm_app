"use client";

import { useReducer, useState } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { initialBoardState } from "@/lib/dummyData";
import { boardReducer } from "@/lib/boardReducer";
import { Column } from "./Column";
import { Card } from "./Card";

function findColumnIdByCardId(
  columns: typeof initialBoardState.columns,
  cardId: string,
) {
  return columns.find((column) => column.cardIds.includes(cardId))?.id;
}

export function Board() {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(MouseSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const activeCard = activeCardId ? state.cards[activeCardId] : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCardId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCardId(null);

    if (!over) {
      return;
    }

    const cardId = String(active.id);
    const fromColumnId = findColumnIdByCardId(state.columns, cardId);
    if (!fromColumnId) {
      return;
    }

    const overId = String(over.id);
    const toColumnId =
      state.columns.find((column) => column.id === overId)?.id ??
      findColumnIdByCardId(state.columns, overId);

    if (!toColumnId) {
      return;
    }

    const targetColumn = state.columns.find((column) => column.id === toColumnId);
    if (!targetColumn) {
      return;
    }

    let toIndex = targetColumn.cardIds.length;

    if (state.cards[overId]) {
      toIndex = targetColumn.cardIds.indexOf(overId);
    } else if (overId === toColumnId) {
      toIndex = targetColumn.cardIds.length;
    }

    if (toIndex === -1) {
      toIndex = targetColumn.cardIds.length;
    }

    if (fromColumnId === toColumnId) {
      const oldIndex = targetColumn.cardIds.indexOf(cardId);
      if (oldIndex === toIndex || oldIndex === -1) {
        return;
      }
    }

    dispatch({
      type: "MOVE_CARD",
      cardId,
      fromColumnId,
      toColumnId,
      toIndex,
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="border-b-4 border-accent bg-white px-6 py-5 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-navy">
          Project Board
        </h1>
        <p className="mt-1 text-sm text-gray">
          Drag cards between columns to track progress
        </p>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-1 gap-4 overflow-x-auto p-6">
          {state.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              cards={column.cardIds
                .map((cardId) => state.cards[cardId])
                .filter(Boolean)}
              onRename={(columnId, title) =>
                dispatch({ type: "RENAME_COLUMN", columnId, title })
              }
              onAddCard={(columnId, title, details) =>
                dispatch({
                  type: "ADD_CARD",
                  columnId,
                  title,
                  details,
                  cardId: `card-${crypto.randomUUID()}`,
                })
              }
              onDeleteCard={(cardId) =>
                dispatch({ type: "DELETE_CARD", cardId })
              }
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="w-[248px] rotate-2 opacity-95">
              <Card card={activeCard} onDelete={() => undefined} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
