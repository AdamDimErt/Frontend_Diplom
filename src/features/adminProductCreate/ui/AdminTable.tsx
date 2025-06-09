/**
 * src/features/admin/ui/AdminTable.tsx
 *
 * @format
 */

import React from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (value: T[keyof T], row: T) => React.ReactNode;
};

type AdminTableProps<T> = {
  columns: Column<T>[];
  data: readonly T[];
};

export function AdminTable<T>({
  columns,
  data,
}: AdminTableProps<T>) {
  return (
    <table
      style={{ width: "100%", borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={String(c.accessor)}
              style={{
                borderBottom: "1px solid #ccc",
                textAlign: "left",
                padding: "8px",
              }}
            >
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((c) => {
              // raw может быть любого типа
              const raw = row[c.accessor];
              // если есть кастомная ячейка — используем её, иначе приводим к строке
              const content = c.cell
                ? c.cell(raw, row)
                : raw == null
                ? ""
                : String(raw);

              return (
                <td
                  key={String(c.accessor)}
                  style={{
                    borderBottom: "1px solid #eee",
                    padding: "8px",
                    verticalAlign: "top",
                  }}
                >
                  {content}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
