import { describe, expect, it } from "vitest";
import { boardReducer } from "@/lib/boardReducer";
import { initialBoardState } from "@/lib/dummyData";

describe("boardReducer", () => {
  it("renames a column", () => {
    const next = boardReducer(initialBoardState, {
      type: "RENAME_COLUMN",
      columnId: "col-1",
      title: "Ideas",
    });

    expect(next.columns[0].title).toBe("Ideas");
    expect(next.columns).toHaveLength(5);
  });

  it("adds a card to a column", () => {
    const next = boardReducer(initialBoardState, {
      type: "ADD_CARD",
      columnId: "col-2",
      title: "New task",
      details: "Some details",
      cardId: "card-new",
    });

    expect(next.cards["card-new"]).toEqual({
      id: "card-new",
      title: "New task",
      details: "Some details",
    });
    expect(next.columns[1].cardIds).toContain("card-new");
  });

  it("deletes a card from cards and columns", () => {
    const next = boardReducer(initialBoardState, {
      type: "DELETE_CARD",
      cardId: "card-1",
    });

    expect(next.cards["card-1"]).toBeUndefined();
    expect(next.columns[0].cardIds).not.toContain("card-1");
  });

  it("moves a card between columns", () => {
    const next = boardReducer(initialBoardState, {
      type: "MOVE_CARD",
      cardId: "card-1",
      fromColumnId: "col-1",
      toColumnId: "col-2",
      toIndex: 0,
    });

    expect(next.columns[0].cardIds).not.toContain("card-1");
    expect(next.columns[1].cardIds[0]).toBe("card-1");
  });

  it("reorders a card within the same column", () => {
    const next = boardReducer(initialBoardState, {
      type: "MOVE_CARD",
      cardId: "card-1",
      fromColumnId: "col-1",
      toColumnId: "col-1",
      toIndex: 2,
    });

    expect(next.columns[0].cardIds).toEqual(["card-2", "card-3", "card-1"]);
  });

  it("leaves state unchanged for unknown actions", () => {
    const next = boardReducer(initialBoardState, {
      type: "UNKNOWN" as "RENAME_COLUMN",
      columnId: "col-1",
      title: "Ignored",
    });

    expect(next).toEqual(initialBoardState);
  });
});
