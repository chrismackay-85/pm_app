"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useNotesStore } from "@/lib/notesStore";
import { TableShell, tableRowClassName } from "@/components/ui/TableShell";
import { AutocompleteCell } from "@/components/notes/AutocompleteCell";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import type { DataDictionaryRow } from "@/lib/types";

type TextField = "fieldName" | "description" | "dataType" | "sourceSystem" | "owner" | "tableOrDatabase";

const textFieldOrder: TextField[] = [
  "fieldName",
  "description",
  "dataType",
  "sourceSystem",
  "owner",
  "tableOrDatabase",
];

const columns: { key: TextField; label: string }[] = [
  { key: "fieldName", label: "Field Name" },
  { key: "description", label: "Description" },
  { key: "dataType", label: "Data Type" },
  { key: "sourceSystem", label: "Source System" },
  { key: "owner", label: "Owner" },
];

const headerColumns = [
  ...columns,
  { key: "piiSensitive", label: "PII/Sensitive" },
  { key: "lastUpdated", label: "Last Updated" },
  { key: "tableOrDatabase", label: "Table/Database" },
];

interface CellRef {
  rowId: string;
  field: TextField;
}

export function DataDictionaryView() {
  const dataDictionary = useNotesStore((s) => s.dataDictionary);
  const updateDictionaryCell = useNotesStore((s) => s.updateDictionaryCell);
  const toggleDictionaryPii = useNotesStore((s) => s.toggleDictionaryPii);
  const addDictionaryRow = useNotesStore((s) => s.addDictionaryRow);
  const deleteDictionaryRow = useNotesStore((s) => s.deleteDictionaryRow);

  const [rowPendingDelete, setRowPendingDelete] = useState<DataDictionaryRow | null>(null);
  const [editingCell, setEditingCell] = useState<CellRef | null>(null);

  const suggestionsByField = useMemo(() => {
    const result: Record<TextField, string[]> = {
      fieldName: [],
      description: [],
      dataType: [],
      sourceSystem: [],
      owner: [],
      tableOrDatabase: [],
    };
    for (const field of textFieldOrder) {
      result[field] = Array.from(
        new Set(dataDictionary.map((row) => row[field]).filter((v) => v.trim() !== ""))
      );
    }
    return result;
  }, [dataDictionary]);

  const tabSequence = useMemo(() => {
    const sequence: CellRef[] = [];
    for (const row of dataDictionary) {
      for (const field of textFieldOrder) {
        sequence.push({ rowId: row.id, field });
      }
    }
    return sequence;
  }, [dataDictionary]);

  function advanceFrom(current: CellRef) {
    const index = tabSequence.findIndex(
      (cell) => cell.rowId === current.rowId && cell.field === current.field
    );
    const next = index >= 0 ? tabSequence[index + 1] : undefined;
    setEditingCell(next ?? null);
  }

  return (
    <div className="flex flex-col gap-3">
      <TableShell columns={headerColumns} trailingHeaderCell>
        {dataDictionary.map((row, index) => (
          <tr key={row.id} className={tableRowClassName(index)}>
            {columns.map((column) => (
              <td key={column.key} className="px-1 py-1 align-top">
                <AutocompleteCell
                  value={row[column.key]}
                  suggestions={suggestionsByField[column.key].filter((v) => v !== row[column.key])}
                  isEditing={editingCell?.rowId === row.id && editingCell.field === column.key}
                  onStartEdit={() => setEditingCell({ rowId: row.id, field: column.key })}
                  onCommit={(value) => updateDictionaryCell(row.id, column.key, value)}
                  onTabNext={() => advanceFrom({ rowId: row.id, field: column.key })}
                  onExitEdit={() => setEditingCell(null)}
                />
              </td>
            ))}
            <td className="px-2 py-1 text-center align-top">
              <input
                type="checkbox"
                checked={row.piiSensitive}
                onChange={() => toggleDictionaryPii(row.id)}
                aria-label={`PII/Sensitive for ${row.fieldName || "row " + (index + 1)}`}
                className="h-4 w-4 accent-brand-blue"
              />
            </td>
            <td className="px-2 py-1 align-top">
              <input
                type="date"
                value={row.lastUpdated}
                onChange={(e) => updateDictionaryCell(row.id, "lastUpdated", e.target.value)}
                aria-label={`Last updated for ${row.fieldName || "row " + (index + 1)}`}
                className="w-full rounded-button border border-transparent px-2 py-1 text-body-3 text-dark-primary outline-none hover:border-muted-gray/60 focus:border-brand-blue"
              />
            </td>
            <td className="px-1 py-1 align-top">
              <AutocompleteCell
                value={row.tableOrDatabase}
                suggestions={suggestionsByField.tableOrDatabase.filter((v) => v !== row.tableOrDatabase)}
                isEditing={editingCell?.rowId === row.id && editingCell.field === "tableOrDatabase"}
                onStartEdit={() => setEditingCell({ rowId: row.id, field: "tableOrDatabase" })}
                onCommit={(value) => updateDictionaryCell(row.id, "tableOrDatabase", value)}
                onTabNext={() => advanceFrom({ rowId: row.id, field: "tableOrDatabase" })}
                onExitEdit={() => setEditingCell(null)}
              />
            </td>
            <td className="px-2 py-1 text-center align-top">
              <button
                type="button"
                onClick={() => setRowPendingDelete(row)}
                aria-label="Delete row"
                className="rounded-button p-1 text-muted-gray hover:bg-white hover:text-brand-purple"
              >
                <Trash2 size={14} />
              </button>
            </td>
          </tr>
        ))}
      </TableShell>
      <Button variant="secondary" onClick={addDictionaryRow} className="self-start normal-case">
        <Plus size={14} /> Add row
      </Button>

      <ConfirmDialog
        open={rowPendingDelete !== null}
        onOpenChange={(open) => !open && setRowPendingDelete(null)}
        title="Delete row"
        description={
          rowPendingDelete?.fieldName
            ? `Are you sure you want to delete "${rowPendingDelete.fieldName}"? This can't be undone.`
            : "Are you sure you want to delete this row? This can't be undone."
        }
        onConfirm={() => {
          if (!rowPendingDelete) return;
          if (editingCell?.rowId === rowPendingDelete.id) setEditingCell(null);
          deleteDictionaryRow(rowPendingDelete.id);
        }}
      />
    </div>
  );
}
