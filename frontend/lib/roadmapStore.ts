import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AppendixTable, FreeformSection } from "./types";
import { appendices as seedAppendices, appendixHSeed } from "./seedRoadmap";

function makeRowId() {
  return `row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

interface RoadmapState {
  appendices: Record<string, AppendixTable>;
  appendixH: { title: string; sections: FreeformSection[] };

  updateCell: (appendixId: string, rowId: string, columnKey: string, value: string) => void;
  addRow: (appendixId: string) => void;
  deleteRow: (appendixId: string, rowId: string) => void;
  updateSection: (sectionId: string, body: string) => void;
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set) => ({
      appendices: seedAppendices,
      appendixH: appendixHSeed,

      updateCell: (appendixId, rowId, columnKey, value) =>
        set((state) => {
          const table = state.appendices[appendixId];
          if (!table) return state;
          return {
            appendices: {
              ...state.appendices,
              [appendixId]: {
                ...table,
                rows: table.rows.map((row) =>
                  row.id === rowId ? { ...row, [columnKey]: value } : row
                ),
              },
            },
          };
        }),

      addRow: (appendixId) =>
        set((state) => {
          const table = state.appendices[appendixId];
          if (!table) return state;
          const blankRow: AppendixTable["rows"][number] = { id: makeRowId() };
          table.columns.forEach((column) => {
            blankRow[column.key] = "";
          });
          return {
            appendices: {
              ...state.appendices,
              [appendixId]: { ...table, rows: [...table.rows, blankRow] },
            },
          };
        }),

      deleteRow: (appendixId, rowId) =>
        set((state) => {
          const table = state.appendices[appendixId];
          if (!table) return state;
          return {
            appendices: {
              ...state.appendices,
              [appendixId]: { ...table, rows: table.rows.filter((row) => row.id !== rowId) },
            },
          };
        }),

      updateSection: (sectionId, body) =>
        set((state) => ({
          appendixH: {
            ...state.appendixH,
            sections: state.appendixH.sections.map((section) =>
              section.id === sectionId ? { ...section, body } : section
            ),
          },
        })),
    }),
    {
      name: "pattern-pm-roadmap",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
