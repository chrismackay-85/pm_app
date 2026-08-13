export interface KanbanColumn {
  id: string;
  name: string;
}

export interface KanbanCard {
  id: string;
  title: string;
  details: string;
  columnId: string;
  archived: boolean;
}

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableRow {
  id: string;
  [columnKey: string]: string;
}

export interface AppendixTable {
  id: string;
  letter: string;
  title: string;
  description: string;
  columns: TableColumn[];
  rows: TableRow[];
}

export interface FreeformSection {
  id: string;
  heading: string;
  body: string;
}

export interface MeetingNoteEntry {
  id: string;
  date: string;
  title: string;
  notes: string;
}

export interface DataDictionaryRow {
  id: string;
  fieldName: string;
  description: string;
  dataType: string;
  sourceSystem: string;
  owner: string;
  piiSensitive: boolean;
  lastUpdated: string;
  tableOrDatabase: string;
}
