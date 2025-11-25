import { PropComponent } from "@/entity/sidebar/PropComponent";
import {
  TABLE_COLUMN_KEY,
  TableColumnValue,
} from "./define/table/tableComlumn";
import { FORM_KEY, FormValue } from "./define/row/form";

export const getValueFlex = (record: PropComponent): string => {
  if (!record) {
    return "";
  }
  switch (record.key) {
    case TABLE_COLUMN_KEY:
      return (record.value as TableColumnValue[]).length > 0
        ? "Chỉnh sửa"
        : "Cấu hình";
    case FORM_KEY:
      return (record.value as FormValue).formVarName;
    default: {
      return "Giá trị";
    }
  }
};
