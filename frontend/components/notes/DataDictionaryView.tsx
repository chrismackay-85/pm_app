"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useNotesStore } from "@/lib/notesStore";
import { TableShell, tableRowClassName } from "@/components/ui/TableShell";
import { EditableCell } from "@/components/roadmap/EditableCell";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import type { DataDictionaryRow } from "@/lib/types";

const columns: { key: keyof Omit<DataDictionaryRow, "id" | "piiSensitive">; label: string }[] = [
  { key: "fieldName", label: "Field Name" },
  { key: "description", label: "Description" },
  { key: "dataType", label: "Data Type" },
  { key: "sourceSystem", label: "Source System" },
  { key: "owner", label: "Owner" },
];

const trailingColumns: { key: keyof Omit<DataDictionaryRow, "id" | "piiSensitive">; label: string }[] = [
  { key: "lastUpdated", label: "Last Updated" },
  { key: "tableOrDatabase", label: "Table/Database" },
];

const headerColumns = [
  ...columns,
  { key: "piiSensitive", label: "PII/Sensitive" },
  ...trailingColumns,
];

export function DataDictionaryView() {
  const dataDictionary = useNotesStore((s) => s.dataDictionary);
  const updateDictionaryCell = useNotesStore((s) => s.updateDictionaryCell);
  const toggleDictionaryPii = useNotesStore((s) => s.toggleDictionaryPii);
  const addDictionaryRow = useNotesStore((s) => s.addDictionaryRow);
  const deleteDictionaryRow = useNotesStore((s) => s.deleteDictionaryRow);

  const [rowPendingDelete, setRowPendingDelete] = useState<DataDictionaryRow | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <TableShell columns={headerColumns} trailingHeaderCell>
        {dataDictionary.map((row, index) => (
          <tr key={row.id} className={tableRowClassName(index)}>
            {columns.map((column) => (
              <td key={column.key} className="px-1 py-1 align-top">
                <EditableCell
                  value={row[column.key]}
                  onCommit={(value) => updateDictionaryCell(row.id, column.key, value)}
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
            {trailingColumns.map((column) => (
              <td key={column.key} className="px-1 py-1 align-top">
                <EditableCell
                  value={row[column.key]}
                  onCommit={(value) => updateDictionaryCell(row.id, column.key, value)}
                />
              </td>
            ))}
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
          if (rowPendingDelete) deleteDictionaryRow(rowPendingDelete.id);
        }}
      />
    </div>
  );
}
