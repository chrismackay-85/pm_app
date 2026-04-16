import { describe, expect, it } from "vitest";
import { kanbanReducer } from "../../lib/kanban/reducer";
import type { KanbanBoardState } from "../../lib/kanban/types";

const baseState: KanbanBoardState = {
  columns: [
    {
      id: "col-1",
      title: "Backlog",
      cards: [
        { id: "card-1", title: "A", details: "a" },
        { id: "card-2", title: "B", details: "b" }
      ]
    },
    {
      id: "col-2",
      title: "Done",
      cards: [{ id: "card-3", title: "C", details: "c" }]
    },
    {
      id: "col-3",
      title: "In Progress",
      cards: []
    },
    { id: "col-4", title: "Review", cards: [] },
    { id: "col-5", title: "Testing", cards: [] }
  ]
};

describe("kanbanReducer", () => {
  it("renames only the targeted column", () => {
    const next = kanbanReducer(baseState, {
      type: "renameColumn",
      columnId: "col-2",
      title: "Completed"
    });

    expect(next.columns.find((c) => c.id === "col-1")?.title).toBe("Backlog");
    expect(next.columns.find((c) => c.id === "col-2")?.title).toBe("Completed");
    expect(next.columns.find((c) => c.id === "col-3")?.title).toBe("In Progress");
  });

  it("adds a card to the specified column", () => {
    const next = kanbanReducer(baseState, {
      type: "addCard",
      columnId: "col-3",
      card: { id: "card-4", title: "D", details: "d" }
    });

    const col3 = next.columns.find((c) => c.id === "col-3")!;
    expect(col3.cards).toHaveLength(1);
    expect(col3.cards[0]).toEqual({ id: "card-4", title: "D", details: "d" });
  });

  it("deletes a card by id (wherever it is)", () => {
    const next = kanbanReducer(baseState, {
      type: "deleteCard",
      cardId: "card-2"
    });

    const col1 = next.columns.find((c) => c.id === "col-1")!;
    expect(col1.cards.map((c) => c.id)).toEqual(["card-1"]);
    const stillThere = next.columns.flatMap((c) => c.cards).some((c) => c.id === "card-2");
    expect(stillThere).toBe(false);
  });

  it("moves a card to another column (appended at the end)", () => {
    const next = kanbanReducer(baseState, {
      type: "moveCard",
      cardId: "card-1",
      toColumnId: "col-2"
    });

    const fromCol = next.columns.find((c) => c.id === "col-1")!;
    const toCol = next.columns.find((c) => c.id === "col-2")!;

    expect(fromCol.cards.map((c) => c.id)).toEqual(["card-2"]);
    expect(toCol.cards.map((c) => c.id)).toEqual(["card-3", "card-1"]);
  });

  it("does nothing when moving a card to its current column", () => {
    const next = kanbanReducer(baseState, {
      type: "moveCard",
      cardId: "card-2",
      toColumnId: "col-1"
    });

    expect(next).toEqual(baseState);
  });
});

