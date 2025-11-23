import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const TABLE_NAME_KEY = "TABLE_NAME_KEY";
export const tableName = {
  name: "Tên table",
  key: TABLE_NAME_KEY,
  valueType: "string",
  apply: [DATA_TYPE.TABLE],
  value: null,
} as PropComponent;
export const tableNameValid = (value: number): boolean => {
  return true;
};
export const tableNameTooltip = "Tên bảng dữ liệu";
export const tableNamePlaceHolder = "Tên bảng dữ liệu";
