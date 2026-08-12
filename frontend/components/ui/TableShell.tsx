import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TableColumnDef {
  key: string;
  label: string;
}

interface TableShellProps {
  columns: TableColumnDef[];
  children: ReactNode;
  trailingHeaderCell?: ReactNode;
  className?: string;
}

export function TableShell({ columns, children, trailingHeaderCell, className }: TableShellProps) {
  return (
    <div className={cn("overflow-x-auto rounded-card shadow-brand", className)}>
      <table className="w-full border-collapse text-body-3">
        <thead>
          <tr className="bg-dark-primary">
            {columns.map((column) => (
              <th
                key={column.key}
                className="whitespace-nowrap px-4 py-3 text-left text-overline text-white"
              >
                {column.label}
              </th>
            ))}
            {trailingHeaderCell ? (
              <th className="w-10 bg-dark-primary px-2 py-3" />
            ) : null}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function tableRowClassName(index: number) {
  return cn(
    "border-b border-muted-gray/50",
    index % 2 === 0 ? "bg-white" : "bg-light-gray"
  );
}
