import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { DataDictionaryRow, MeetingNoteEntry } from "./types";
import { seedDataDictionary, seedMeetingNotes } from "./seedNotes";

function makeMeetingNoteId() {
  return `meeting-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function makeDictionaryRowId() {
  return `dict-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

interface NotesState {
  meetingNotes: MeetingNoteEntry[];
  dataDictionary: DataDictionaryRow[];

  addMeetingNote: () => void;
  updateMeetingNote: (id: string, field: "date" | "title" | "notes", value: string) => void;
  deleteMeetingNote: (id: string) => void;

  updateDictionaryCell: (
    rowId: string,
    field: keyof Omit<DataDictionaryRow, "id" | "piiSensitive">,
    value: string
  ) => void;
  toggleDictionaryPii: (rowId: string) => void;
  addDictionaryRow: () => void;
  deleteDictionaryRow: (rowId: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      meetingNotes: seedMeetingNotes,
      dataDictionary: seedDataDictionary,

      addMeetingNote: () =>
        set((state) => ({
          meetingNotes: [
            { id: makeMeetingNoteId(), date: todayIso(), title: "", notes: "" },
            ...state.meetingNotes,
          ],
        })),

      updateMeetingNote: (id, field, value) =>
        set((state) => ({
          meetingNotes: state.meetingNotes.map((entry) =>
            entry.id === id ? { ...entry, [field]: value } : entry
          ),
        })),

      deleteMeetingNote: (id) =>
        set((state) => ({
          meetingNotes: state.meetingNotes.filter((entry) => entry.id !== id),
        })),

      updateDictionaryCell: (rowId, field, value) =>
        set((state) => ({
          dataDictionary: state.dataDictionary.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row
          ),
        })),

      toggleDictionaryPii: (rowId) =>
        set((state) => ({
          dataDictionary: state.dataDictionary.map((row) =>
            row.id === rowId ? { ...row, piiSensitive: !row.piiSensitive } : row
          ),
        })),

      addDictionaryRow: () =>
        set((state) => ({
          dataDictionary: [
            ...state.dataDictionary,
            {
              id: makeDictionaryRowId(),
              fieldName: "",
              description: "",
              dataType: "",
              sourceSystem: "",
              owner: "",
              piiSensitive: false,
              lastUpdated: "",
              tableOrDatabase: "",
            },
          ],
        })),

      deleteDictionaryRow: (rowId) =>
        set((state) => ({
          dataDictionary: state.dataDictionary.filter((row) => row.id !== rowId),
        })),
    }),
    {
      name: "pattern-pm-notes",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
