import { beforeEach, describe, expect, it } from "vitest";
import { useKanbanStore, matchesQuery } from "@/lib/kanbanStore";
import { createSeedCardOrder, createSeedCards, seedColumns } from "@/lib/seedKanban";

function resetStore() {
  const cards = createSeedCards();
  useKanbanStore.setState({
    columns: seedColumns,
    cards,
    cardOrder: createSeedCardOrder(cards),
    archivedCardIds: [],
    searchQuery: "",
  });
  localStorage.clear();
}

beforeEach(() => {
  resetStore();
});

describe("kanbanStore seed", () => {
  it("seeds 5 columns and 13 cards with none archived", () => {
    const state = useKanbanStore.getState();
    expect(state.columns).toHaveLength(5);
    expect(Object.keys(state.cards)).toHaveLength(13);
    expect(state.archivedCardIds).toHaveLength(0);
  });
});

describe("addCard", () => {
  it("appends a new card to the target column's order", () => {
    const { addCard } = useKanbanStore.getState();
    addCard("backlog", "New task", "Some details");
    const state = useKanbanStore.getState();
    const backlogIds = state.cardOrder.backlog;
    const newId = backlogIds[backlogIds.length - 1];
    expect(state.cards[newId]).toMatchObject({
      title: "New task",
      details: "Some details",
      columnId: "backlog",
      archived: false,
    });
  });
});

describe("deleteCard", () => {
  it("removes the card from cards and its column order", () => {
    const { deleteCard } = useKanbanStore.getState();
    deleteCard("card-1");
    const state = useKanbanStore.getState();
    expect(state.cards["card-1"]).toBeUndefined();
    expect(state.cardOrder.done).not.toContain("card-1");
  });
});

describe("moveCard", () => {
  it("reorders a card within the same column", () => {
    const { moveCard } = useKanbanStore.getState();
    const before = useKanbanStore.getState().cardOrder.backlog;
    expect(before).toEqual(["card-10", "card-11", "card-12", "card-13"]);
    moveCard("card-13", "backlog", 0);
    const after = useKanbanStore.getState().cardOrder.backlog;
    expect(after).toEqual(["card-13", "card-10", "card-11", "card-12"]);
  });

  it("moves a card to a different column and updates its columnId", () => {
    const { moveCard } = useKanbanStore.getState();
    moveCard("card-1", "backlog", 0);
    const state = useKanbanStore.getState();
    expect(state.cardOrder.done).not.toContain("card-1");
    expect(state.cardOrder.backlog[0]).toBe("card-1");
    expect(state.cards["card-1"].columnId).toBe("backlog");
  });
});

describe("archiveCard / unarchiveCard", () => {
  it("archives a card: removes from order, adds to archivedCardIds, flags archived", () => {
    const { archiveCard } = useKanbanStore.getState();
    archiveCard("card-1");
    const state = useKanbanStore.getState();
    expect(state.cardOrder.done).not.toContain("card-1");
    expect(state.archivedCardIds).toContain("card-1");
    expect(state.cards["card-1"].archived).toBe(true);
  });

  it("unarchives a card back to the end of its original column", () => {
    const { archiveCard, unarchiveCard } = useKanbanStore.getState();
    archiveCard("card-1");
    unarchiveCard("card-1");
    const state = useKanbanStore.getState();
    expect(state.archivedCardIds).not.toContain("card-1");
    expect(state.cards["card-1"].archived).toBe(false);
    expect(state.cardOrder.done[state.cardOrder.done.length - 1]).toBe("card-1");
  });
});

describe("renameColumn", () => {
  it("updates only the target column's name", () => {
    const { renameColumn } = useKanbanStore.getState();
    renameColumn("backlog", "Icebox");
    const state = useKanbanStore.getState();
    expect(state.columns.find((c) => c.id === "backlog")?.name).toBe("Icebox");
    expect(state.columns.find((c) => c.id === "done")?.name).toBe("Done");
  });
});

describe("addColumn", () => {
  it("appends a new column with an empty card order", () => {
    const { addColumn } = useKanbanStore.getState();
    addColumn("Icebox");
    const state = useKanbanStore.getState();
    expect(state.columns).toHaveLength(6);
    const newColumn = state.columns[state.columns.length - 1];
    expect(newColumn.name).toBe("Icebox");
    expect(state.cardOrder[newColumn.id]).toEqual([]);
  });
});

describe("setSearchQuery / matchesQuery", () => {
  it("filters cards by title or details, case-insensitively", () => {
    const { setSearchQuery } = useKanbanStore.getState();
    setSearchQuery("api");
    const state = useKanbanStore.getState();
    expect(state.searchQuery).toBe("api");
    expect(matchesQuery(state.cards["card-4"], "api")).toBe(true);
    expect(matchesQuery(state.cards["card-2"], "api")).toBe(false);
  });

  it("treats an empty query as matching everything", () => {
    expect(matchesQuery(useKanbanStore.getState().cards["card-2"], "")).toBe(true);
  });
});
