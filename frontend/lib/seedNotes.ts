import type { DataDictionaryRow, MeetingNoteEntry } from "./types";

export const seedMeetingNotes: MeetingNoteEntry[] = [
  {
    id: "meeting-1",
    date: "2026-08-11",
    title: "Kickoff Sync",
    notes: "Reviewed the rollout roadmap with the steering committee. Next step: confirm executive sponsor and lock Discovery baseline metrics.",
  },
];

function blankDictionaryRow(id: string): DataDictionaryRow {
  return {
    id,
    fieldName: "",
    description: "",
    dataType: "",
    sourceSystem: "",
    owner: "",
    piiSensitive: false,
    lastUpdated: "",
    tableOrDatabase: "",
  };
}

export const seedDataDictionary: DataDictionaryRow[] = [
  {
    id: "dict-1",
    fieldName: "customer_email",
    description: "Customer's email address used for account login and notifications.",
    dataType: "string",
    sourceSystem: "CRM Database",
    owner: "Data Eng",
    piiSensitive: true,
    lastUpdated: "2026-08-11",
    tableOrDatabase: "customers",
  },
  blankDictionaryRow("dict-2"),
  blankDictionaryRow("dict-3"),
  blankDictionaryRow("dict-4"),
  blankDictionaryRow("dict-5"),
];
