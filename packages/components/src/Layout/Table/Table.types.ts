import type { SetState } from "@cubicsui/types";
import type { ReactNode } from "react";
export type RowData = { [column: string]: CellData } | CellData[];
export type ITableCell = {
  defaultSelected?: boolean;
} & (
  | {
      value: Date;
      type: "timestamp";
    }
  | {
      value: (string | number)[];
      type: "array";
    }
  | {
      value: string;
      type: "string";
    }
  | {
      value: number;
      type: "number";
    }
  | {
      alt: string;
      value: string;
      type: "image";
    }
  | {
      value: boolean;
      type: "boolean";
    }
);
export type CellData = ITableCell | ReactNode;
export type DataTableDataType =
  | RowData[]
  | { columns: CellData[]; rows: CellData[][] }
  | { [column: string]: CellData[] }
  | { [row: string]: { [column: string]: CellData } };
export interface DataTableContextProps {
  selectedCell: HTMLElement | null;
  setSelectedCell: SetState<HTMLElement | null>;
  columnCount: number;
}
export interface DataTableProps {
  data: DataTableDataType;
  showMarker?: boolean;
}
