"use client";

import {
  createContext,
  isValidElement,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  getColumnCount,
  isAOA,
  isAOO,
  isOCR,
  isOOA,
  isOOR,
} from "./Table.utils";
import styles from "./Table.module.css";
import type {
  CellData,
  DataTableContextProps,
  DataTableProps,
} from "./Table.types";
import { TableCell } from "./TableCell/TableCell";

const DataTableContext = createContext<DataTableContextProps | null>(null);

export function useDataTable(): DataTableContextProps {
  const c = useContext(DataTableContext);
  if (!c) throw new Error("Components must be wrapped in <DataTable/>");
  return c;
}

/**
 * Works for data of five types
 *
 * **Array of arrays:-**
 *
 * ```ts
 * const aoaData: TableData = [
    ["name", "email", "age"], // column headers are always 0th element
    ["pumpernickel", "pump@nick.com", 420],
    ["rumpelstiltskin", "rump@stilt.com", 96],
  ];
 * ```
 * **Array of objects:-**
 * 
 * ```ts
 * const aooData: TableData = [
    { name: "pumpernickel", email: "pump@nick.com", age: 420 }, // keys are column headers
    { name: "rumpelstiltskin", email: "rump@stilt.com", age: 96 },
  ]; 
 * ``` 
 * **Object of arrays:-**
 * 
 * ```ts
 * const ooaData: TableData = {
    name: ["pumpernickel", "rumpelstiltskin"], // keys are column headers
    email: ["pump@nick.com", "rump@stilt.com"],
    age: [420, 96],
  }; 
 * ``` 
 * **Explicit schema + rows:-**
 * 
 * ```ts
 * const ocrData: TableData = {
    columns: ["name", "email", "age"], // column headers are defined in a seperate columns array
    rows: [
      ["pumpernickel", "pump@nick.com", 420],
      ["rumpelstiltskin", "rump@stilt.com", 96],
    ],
  }; 
 * ``` 
 */
export function DataTable({ data }: DataTableProps): ReactElement {
  const [selectedCell, setSelectedCell] = useState<HTMLElement | null>(null);

  const columnCount = getColumnCount(data);
  function renderRows() {
    // AOA (array of arrays)
    if (isAOA(data)) {
      return (
        <tbody>
          {data.map((row, r) =>
            Array.isArray(row) ? (
              <tr key={r}>
                {row.map((cell, c) => (
                  <TableCell
                    id={`${r},${c}`}
                    key={`${r},${c}`}
                    // selected={selectedCell[0] === r && selectedCell[1] === c}
                  >
                    {renderCell(cell)}
                  </TableCell>
                ))}
              </tr>
            ) : null,
          )}
        </tbody>
      );
    }

    // AOO (array of objects)
    if (isAOO(data)) {
      const columns = Object.keys(data[0]);

      return (
        <>
          <thead>
            <tr>
              {columns.map((ch) => {
                return (
                  <TableCell as="th" key={ch}>
                    {ch}
                  </TableCell>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, r) => (
              <tr key={`${r},row`}>
                {columns.map((col, c) => (
                  <TableCell
                    id={`${r},${c}`}
                    key={`${r},${c}`}
                    // selected={selectedCell[0] === r && selectedCell[1] === c}
                  >
                    {renderCell(row[col])}
                  </TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </>
      );
    }

    // OOA (object of arrays)
    if (isOOA(data)) {
      const columns = Object.keys(data);
      const rowCount = data[columns[0]]?.length ?? 0;

      return (
        <tbody>
          {Array.from({ length: rowCount }, (_, r) => (
            <tr key={`${r},row`}>
              {columns.map((col, c) => (
                <TableCell
                  id={`${r},${c}`}
                  key={`${r},${c}`}
                  // selected={selectedCell[0] === r && selectedCell[1] === c}
                >
                  {renderCell(data[col][r])}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      );
    }

    // Object of objects (OOR)
    if (isOOR(data)) {
      const rowHeaders = Object.keys(data);

      const columnHeaders = Array.from(
        new Set(rowHeaders.flatMap((row) => Object.keys(data[row] ?? {}))),
      );

      return (
        <>
          <thead>
            <tr>
              <TableCell as="th"></TableCell>
              {columnHeaders.map((ch) => {
                return (
                  <TableCell as="th" key={ch}>
                    {ch}
                  </TableCell>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rowHeaders.map((rowHeader, r) => {
              const row = data[rowHeader];

              return (
                <tr key={`${r},row`}>
                  {[
                    <TableCell as="th" id={`${r},0`} key={`${r},0`}>
                      {renderCell(rowHeader)}
                    </TableCell>,

                    ...columnHeaders.map((col, c) => (
                      <TableCell id={`${r},${c + 1}`} key={`${r},${c + 1}`}>
                        {renderCell(row[col])}
                      </TableCell>
                    )),
                  ]}
                </tr>
              );
            })}
          </tbody>
        </>
      );
    }

    // OCR (columns + rows)
    if (isOCR(data)) {
      return data.rows.map((row, r) => {
        return (
          <tr key={`${r},row`}>
            {row.map((cell, c) => (
              <TableCell
                id={`${r},${c}`}
                key={`${r},${c}`}
                // selected={selectedCell[0] === r && selectedCell[1] === c}
              >
                {renderCell(cell)}
              </TableCell>
            ))}
          </tr>
        );
      });
    }

    return null;
  }

  return (
    <DataTableContext.Provider
      value={{ selectedCell, setSelectedCell, columnCount }}
    >
      <div className={styles.root}>
        <table className={styles.table}>{renderRows()}</table>
      </div>
    </DataTableContext.Provider>
  );
}

export function renderCell(cell: CellData): ReactNode {
  if (typeof cell === "boolean") return cell ? "✔" : "❌";
  if (!cell) return;
  if (typeof cell === "string" || isValidElement(cell)) return cell;
  if (typeof cell === "object" && "type" in cell && "value" in cell) {
    switch (cell.type) {
      case "boolean":
        return cell.value ? "✔" : "❌";
      case "timestamp":
        return cell.value.toLocaleString();
      case "array":
        return JSON.stringify(cell.value);
      case "image":
        return <img src={cell.value} alt={cell.alt} />;
      default:
        return cell.value;
    }
  }
}
