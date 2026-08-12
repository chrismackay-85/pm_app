import { beforeEach, describe, expect, it } from "vitest";
import { useRoadmapStore } from "@/lib/roadmapStore";
import { appendices as seedAppendices, appendixHSeed } from "@/lib/seedRoadmap";

function resetStore() {
  useRoadmapStore.setState({ appendices: seedAppendices, appendixH: appendixHSeed });
  localStorage.clear();
}

beforeEach(() => {
  resetStore();
});

describe("roadmapStore seed", () => {
  it("seeds the expected row counts per appendix", () => {
    const { appendices } = useRoadmapStore.getState();
    expect(appendices.A.rows).toHaveLength(13);
    expect(appendices.B.rows).toHaveLength(13);
    expect(appendices.C.rows).toHaveLength(9);
    expect(appendices.D.rows).toHaveLength(6);
    expect(appendices.E.rows).toHaveLength(6);
    expect(appendices.F.rows).toHaveLength(6);
    expect(appendices.G.rows).toHaveLength(7);
    expect(appendices.I.rows).toHaveLength(6);
    expect(appendices.J.rows).toHaveLength(4);
  });

  it("seeds 5 fixed Appendix H sections", () => {
    const { appendixH } = useRoadmapStore.getState();
    expect(appendixH.sections).toHaveLength(5);
  });
});

describe("updateCell", () => {
  it("mutates only the targeted row and column", () => {
    const { updateCell } = useRoadmapStore.getState();
    const rowId = useRoadmapStore.getState().appendices.G.rows[0].id;
    updateCell("G", rowId, "status", "Closed");
    const state = useRoadmapStore.getState();
    const row = state.appendices.G.rows.find((r) => r.id === rowId)!;
    expect(row.status).toBe("Closed");
    expect(row.riskId).toBe("R-01");
    expect(state.appendices.G.rows[1]).toEqual(seedAppendices.G.rows[1]);
  });
});

describe("addRow", () => {
  it("appends a row with empty string values for every column", () => {
    const { addRow } = useRoadmapStore.getState();
    addRow("C");
    const state = useRoadmapStore.getState();
    expect(state.appendices.C.rows).toHaveLength(10);
    const newRow = state.appendices.C.rows[state.appendices.C.rows.length - 1];
    for (const column of state.appendices.C.columns) {
      expect(newRow[column.key]).toBe("");
    }
  });
});

describe("deleteRow", () => {
  it("removes exactly the targeted row", () => {
    const { deleteRow } = useRoadmapStore.getState();
    const rowId = useRoadmapStore.getState().appendices.D.rows[0].id;
    deleteRow("D", rowId);
    const state = useRoadmapStore.getState();
    expect(state.appendices.D.rows).toHaveLength(5);
    expect(state.appendices.D.rows.find((r) => r.id === rowId)).toBeUndefined();
  });
});

describe("updateSection", () => {
  it("mutates only the targeted Appendix H section", () => {
    const { updateSection } = useRoadmapStore.getState();
    updateSection("retention-policy", "Retain for 7 years.");
    const state = useRoadmapStore.getState();
    const retention = state.appendixH.sections.find((s) => s.id === "retention-policy")!;
    expect(retention.body).toBe("Retain for 7 years.");
    const classification = state.appendixH.sections.find((s) => s.id === "data-classification")!;
    expect(classification.body).toBe(appendixHSeed.sections[0].body);
  });
});
