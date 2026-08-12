"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { Archive } from "lucide-react";
import { useKanbanStore, matchesQuery } from "@/lib/kanbanStore";
import { Column } from "./Column";
import { CardContent } from "./CardContent";
import { SearchBox } from "./SearchBox";
import { AddCardDialog } from "./AddCardDialog";
import type { KanbanCard } from "@/lib/types";

function filterColumn(ids: string[], cardMap: Record<string, KanbanCard>, query: string) {
  return ids.map((id) => cardMap[id]).filter((c): c is KanbanCard => !!c && matchesQuery(c, query));
}

export function BoardView() {
  const columns = useKanbanStore((s) => s.columns);
  const cards = useKanbanStore((s) => s.cards);
  const cardOrder = useKanbanStore((s) => s.cardOrder);
  const searchQuery = useKanbanStore((s) => s.searchQuery);
  const setSearchQuery = useKanbanStore((s) => s.setSearchQuery);
  const addCard = useKanbanStore((s) => s.addCard);
  const deleteCard = useKanbanStore((s) => s.deleteCard);
  const archiveCard = useKanbanStore((s) => s.archiveCard);
  const renameColumn = useKanbanStore((s) => s.renameColumn);
  const moveCard = useKanbanStore((s) => s.moveCard);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [addTargetColumn, setAddTargetColumn] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  const cardsByColumn = useMemo(() => {
    const result: Record<string, ReturnType<typeof filterColumn>> = {};
    for (const column of columns) {
      result[column.id] = filterColumn(cardOrder[column.id] ?? [], cards, searchQuery);
    }
    return result;
  }, [columns, cardOrder, cards, searchQuery]);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeData = active.data.current as { columnId: string } | undefined;
    const overData = over.data.current as { type: string; columnId: string } | undefined;
    if (!activeData) return;

    const overColumnId = overData?.columnId ?? (over.id as string);
    if (!overColumnId || !cardOrder[overColumnId]) return;

    let overIndex =
      overData?.type === "card"
        ? cardOrder[overColumnId].indexOf(over.id as string)
        : cardOrder[overColumnId].length;

    if (activeData.columnId === overColumnId) {
      const activeIndex = cardOrder[activeData.columnId].indexOf(active.id as string);
      if (activeIndex !== -1 && activeIndex < overIndex) {
        overIndex -= 1;
      }
    }

    moveCard(active.id as string, overColumnId, overIndex);
  }

  const activeCard = activeId ? cards[activeId] : null;

  return (
    <div className="mx-auto flex max-w-6xl flex-1 flex-col gap-6 px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-h3 text-dark-primary">
          Rollout <span className="font-accent text-bright-blue">board</span>
        </h1>
        <div className="flex items-center gap-3">
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
          <Link
            href="/board/archive"
            className="flex items-center gap-2 rounded-button px-4 py-2 text-body-3 font-medium text-dark-primary hover:bg-light-gray"
          >
            <Archive size={16} /> Archive
          </Link>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-1 gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              cards={cardsByColumn[column.id]}
              activeId={activeId}
              onRename={renameColumn}
              onArchive={archiveCard}
              onDelete={deleteCard}
              onAddCard={setAddTargetColumn}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? <CardContent card={activeCard} overlay /> : null}
        </DragOverlay>
      </DndContext>

      <AddCardDialog
        open={addTargetColumn !== null}
        onOpenChange={(open) => !open && setAddTargetColumn(null)}
        onSubmit={(title, details) => {
          if (addTargetColumn) addCard(addTargetColumn, title, details);
        }}
      />
    </div>
  );
}
