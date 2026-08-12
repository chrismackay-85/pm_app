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
