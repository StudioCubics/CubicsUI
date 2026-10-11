import type { DataTableDataType, RowData, CellData } from "./Table.types";

/**
 * Checks if array of arrays:-
 *
 * ```ts
 * const aoaData: TableData = [
 *   ["name", "email", "age"],
 *   ["pumpernickel", "pump@nick.com", 420],
 *   ["rumpelstiltskin", "rump@stilt.com", 96],
 * ];
 * ```
 */
export function isAOA(data: DataTableDataType): data is RowData[] {
  if (!Array.isArray(data) || data.length === 0) return false;

  if (!Array.isArray(data[0])) return false;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row === null || (typeof row !== "object" && !Array.isArray(row))) {
      return false;
    }
  }
  return true;
}

/*
 * Checks if array of objects:-
 *
 * ```ts
 * const aooData: TableData = [
 *   { name: "pumpernickel", email: "pump@nick.com", age: 420 },
 *   { name: "rumpelstiltskin", email: "rump@stilt.com", age: 96 },
 * ];
 * ```
 */
export function isAOO(
  data: DataTableDataType,
): data is { [column: string]: CellData }[] {
  if (!Array.isArray(data) || data.length === 0) return false;

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (row === null || typeof row !== "object" || Array.isArray(row)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if object of arrays:-
 *
 * ```ts
 * const ooaData: TableData = {
 *   name: ["pumpernickel", "rumpelstiltskin"],
 *   email: ["pump@nick.com", "rump@stilt.com"],
 *   age: [420, 96],
 * };
 * ```
 */
export function isOOA(
  data: DataTableDataType,
): data is { [column: string]: CellData[] } {
  if (
    data === null ||
    typeof data !== "object" ||
    Array.isArray(data) ||
    "columns" in data
  ) {
    return false;
  }

  for (const value of Object.values(data)) {
    if (!Array.isArray(value)) return false;
  }
  return true;
}

/**
 * Checks if explicit schema + rows:-
 *
 * ```ts
 * const ocrData: TableData = {
 *   columns: ["name", "email", "age"],
 *   rows: [
 *     ["pumpernickel", "pump@nick.com", 420],
 *     ["rumpelstiltskin", "rump@stilt.com", 96],
 *   ],
 * };
 * ```
 */
export function isOCR(
  data: DataTableDataType,
): data is { columns: CellData[]; rows: CellData[][] } {
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return false;
  }

  const d = data as any;

  if (!Array.isArray(d.columns) || !Array.isArray(d.rows)) {
    return false;
  }

  for (let i = 0; i < d.rows.length; i++) {
    if (!Array.isArray(d.rows[i])) return false;
  }

  return true;
}

/**
 * Returns the column count for any supported TableData shape.
 * Assumes the data has already been validated with the appropriate is* guard.
 */
export function getColumnCount(data: DataTableDataType): number {
  // Array of arrays (AOA)
  if (isAOA(data)) {
    const firstRow = data[0];
    return Array.isArray(firstRow) ? firstRow.length : 0;
  }

  // Array of objects (AOO)
  if (isAOO(data)) {
    return Object.keys(data[0] ?? {}).length;
  }

  // Explicit columns + rows (OCR)
  if (isOCR(data)) {
    return data.columns.length;
  }

  // Object of arrays (OOA)
  if (isOOA(data)) {
    return Object.keys(data).length;
  }

  // Object of objects (OOR)
  if (isOOR(data)) {
    const rowHeaders = Object.keys(data);

    const nestedColumns = new Set(
      rowHeaders.flatMap((row) => Object.keys(data[row] ?? {})),
    );

    // +1 for row header column
    return nestedColumns.size + 1;
  }

  return 0;
}

/**
 * Top level keys are row headers
 * Nested object keys are column headers
 * ```
 * const oorData = {
 *  time: {
 *    type: "Date",
 *    required: true,
 *  },
 *  client: {
 *    type: "Client",
 *    required: true,
 *  },
 * };
 * ```
 */
export function isOOR(
  data: DataTableDataType,
): data is { [row: string]: { [column: string]: CellData } } {
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;

  const values = Object.values(data);

  if (values.length === 0) return false;

  return values.every((v) => v && typeof v === "object" && !Array.isArray(v));
}
