import { DATA_TYPE, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const TABLE_COLUMN_KEY = "TABLE_COLUMN_KEY";
export const tableComlumn = {
  name: "Cột table",
  key: TABLE_COLUMN_KEY,
  valueType: "flex",
  apply: [DATA_TYPE.TABLE],
  value: {} as TableColumnValue,
  tooltip: "Cấu hình cột cho bảng dữ liệu",
} as PropComponent;
export const tableComlumnValid = (value: number): boolean => {
 
  return true;
};
export interface TableColumnValue {}

