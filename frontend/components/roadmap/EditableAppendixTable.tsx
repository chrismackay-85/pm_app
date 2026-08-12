"use client";

import { Plus, Trash2 } from "lucide-react";
import type { AppendixTable } from "@/lib/types";
import { useRoadmapStore } from "@/lib/roadmapStore";
import { TableShell, tableRowClassName } from "@/components/ui/TableShell";
import { EditableCell } from "./EditableCell";
import { Button } from "@/components/ui/Button";

interface EditableAppendixTableProps {
  table: AppendixTable;
}

export function EditableAppendixTable({ table }: EditableAppendixTableProps) {
  const updateCell = useRoadmapStore((s) => s.updateCell);
  const addRow = useRoadmapStore((s) => s.addRow);
  const deleteRow = useRoadmapStore((s) => s.deleteRow);

  return (
    <div className="flex flex-col gap-3">
      <TableShell columns={table.columns} trailingHeaderCell>
        {table.rows.map((row, index) => (
          <tr key={row.id} className={tableRowClassName(index)}>
            {table.columns.map((column) => (
              <td key={column.key} className="px-1 py-1 align-top">
                <EditableCell
                  value={row[column.key] ?? ""}
                  onCommit={(value) => updateCell(table.id, row.id, column.key, value)}
                />
              </td>
            ))}
            <td className="px-2 py-1 text-center align-top">
              <button
                type="button"
                onClick={() => deleteRow(table.id, row.id)}
                aria-label="Delete row"
                className="rounded-button p-1 text-muted-gray hover:bg-white hover:text-brand-purple"
              >
                <Trash2 size={14} />
              </button>
            </td>
          </tr>
        ))}
      </TableShell>
      <Button variant="secondary" onClick={() => addRow(table.id)} className="self-start normal-case">
        <Plus size={14} /> Add row
      </Button>
    </div>
  );
}
