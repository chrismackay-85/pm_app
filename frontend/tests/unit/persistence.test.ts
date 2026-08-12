import { beforeEach, describe, expect, it } from "vitest";
import { useKanbanStore } from "@/lib/kanbanStore";
import { useRoadmapStore } from "@/lib/roadmapStore";
import { createSeedCardOrder, createSeedCards, seedColumns } from "@/lib/seedKanban";
import { appendices as seedAppendices, appendixHSeed } from "@/lib/seedRoadmap";

beforeEach(() => {
  const cards = createSeedCards();
  useKanbanStore.setState({
    columns: seedColumns,
    cards,
    cardOrder: createSeedCardOrder(cards),
    archivedCardIds: [],
    searchQuery: "",
  });
  useRoadmapStore.setState({ appendices: seedAppendices, appendixH: appendixHSeed });
  localStorage.clear();
});

describe("kanban persistence", () => {
  it("writes state changes to localStorage as JSON", () => {
    useKanbanStore.getState().addCard("backlog", "Persisted card", "details");
    const raw = localStorage.getItem("pattern-pm-kanban");
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    const backlogIds: string[] = parsed.state.cardOrder.backlog;
    const newId = backlogIds[backlogIds.length - 1];
    expect(parsed.state.cards[newId].title).toBe("Persisted card");
  });

  it("rehydrates from a pre-populated localStorage instead of the seed", () => {
    useKanbanStore.getState().renameColumn("backlog", "Icebox");
    const persistedRaw = localStorage.getItem("pattern-pm-kanban")!;

    useKanbanStore.persist.clearStorage();
    localStorage.setItem("pattern-pm-kanban", persistedRaw);
    useKanbanStore.persist.rehydrate();

    const state = useKanbanStore.getState();
    expect(state.columns.find((c) => c.id === "backlog")?.name).toBe("Icebox");
  });
});

describe("roadmap persistence", () => {
  it("writes appendix edits to localStorage as JSON", () => {
    const rowId = useRoadmapStore.getState().appendices.G.rows[0].id;
    useRoadmapStore.getState().updateCell("G", rowId, "status", "Closed");
    const raw = localStorage.getItem("pattern-pm-roadmap");
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    const row = parsed.state.appendices.G.rows.find((r: { id: string }) => r.id === rowId);
    expect(row.status).toBe("Closed");
  });

  it("rehydrates a fresh store instance from persisted localStorage", () => {
    useRoadmapStore.getState().updateSection("retention-policy", "Retain for 7 years.");
    const persistedRaw = localStorage.getItem("pattern-pm-roadmap")!;

    useRoadmapStore.persist.clearStorage();
    localStorage.setItem("pattern-pm-roadmap", persistedRaw);
    useRoadmapStore.persist.rehydrate();

    const state = useRoadmapStore.getState();
    const section = state.appendixH.sections.find((s) => s.id === "retention-policy")!;
    expect(section.body).toBe("Retain for 7 years.");
  });
});
