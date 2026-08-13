import { beforeEach, describe, expect, it } from "vitest";
import { useNotesStore } from "@/lib/notesStore";
import { seedDataDictionary, seedMeetingNotes } from "@/lib/seedNotes";

function resetStore() {
  useNotesStore.setState({ meetingNotes: seedMeetingNotes, dataDictionary: seedDataDictionary });
  localStorage.clear();
}

beforeEach(() => {
  resetStore();
});

describe("notesStore seed", () => {
  it("seeds one example meeting note", () => {
    expect(useNotesStore.getState().meetingNotes).toHaveLength(1);
  });

  it("seeds one filled and four blank data dictionary rows", () => {
    const rows = useNotesStore.getState().dataDictionary;
    expect(rows).toHaveLength(5);
    expect(rows[0].fieldName).toBe("customer_email");
    expect(rows[0].piiSensitive).toBe(true);
    expect(rows[1].fieldName).toBe("");
    expect(rows[1].piiSensitive).toBe(false);
  });
});

describe("meeting notes", () => {
  it("addMeetingNote prepends a new blank entry", () => {
    const { addMeetingNote } = useNotesStore.getState();
    addMeetingNote();
    const state = useNotesStore.getState();
    expect(state.meetingNotes).toHaveLength(2);
    expect(state.meetingNotes[0].title).toBe("");
    expect(state.meetingNotes[0].notes).toBe("");
    expect(state.meetingNotes[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(state.meetingNotes[1].title).toBe("Kickoff Sync");
  });

  it("updateMeetingNote mutates only the targeted field on the targeted entry", () => {
    const { updateMeetingNote } = useNotesStore.getState();
    const id = useNotesStore.getState().meetingNotes[0].id;
    updateMeetingNote(id, "title", "Updated title");
    const entry = useNotesStore.getState().meetingNotes[0];
    expect(entry.title).toBe("Updated title");
    expect(entry.notes).toBe(seedMeetingNotes[0].notes);
  });

  it("deleteMeetingNote removes exactly the targeted entry", () => {
    const { addMeetingNote, deleteMeetingNote } = useNotesStore.getState();
    addMeetingNote();
    const idToDelete = useNotesStore.getState().meetingNotes[0].id;
    deleteMeetingNote(idToDelete);
    const state = useNotesStore.getState();
    expect(state.meetingNotes).toHaveLength(1);
    expect(state.meetingNotes.find((e) => e.id === idToDelete)).toBeUndefined();
  });
});

describe("data dictionary", () => {
  it("updateDictionaryCell mutates only the targeted field on the targeted row", () => {
    const { updateDictionaryCell } = useNotesStore.getState();
    const id = useNotesStore.getState().dataDictionary[0].id;
    updateDictionaryCell(id, "owner", "Analytics");
    const row = useNotesStore.getState().dataDictionary[0];
    expect(row.owner).toBe("Analytics");
    expect(row.fieldName).toBe("customer_email");
  });

  it("toggleDictionaryPii flips only the targeted row's flag", () => {
    const { toggleDictionaryPii } = useNotesStore.getState();
    const id = useNotesStore.getState().dataDictionary[0].id;
    toggleDictionaryPii(id);
    const state = useNotesStore.getState();
    expect(state.dataDictionary[0].piiSensitive).toBe(false);
    expect(state.dataDictionary[1].piiSensitive).toBe(false);
  });

  it("addDictionaryRow appends a blank, non-PII row", () => {
    const { addDictionaryRow } = useNotesStore.getState();
    addDictionaryRow();
    const rows = useNotesStore.getState().dataDictionary;
    expect(rows).toHaveLength(6);
    const newRow = rows[rows.length - 1];
    expect(newRow.fieldName).toBe("");
    expect(newRow.piiSensitive).toBe(false);
  });

  it("deleteDictionaryRow removes exactly the targeted row", () => {
    const { deleteDictionaryRow } = useNotesStore.getState();
    const id = useNotesStore.getState().dataDictionary[0].id;
    deleteDictionaryRow(id);
    const rows = useNotesStore.getState().dataDictionary;
    expect(rows).toHaveLength(4);
    expect(rows.find((r) => r.id === id)).toBeUndefined();
  });
});
