import { PropComponent } from "@/entity/sidebar/PropComponent";
import {
  TABLE_COLUMN_KEY,
  TableColumnValue,
} from "./define/table/tableComlumn";
import { FORM_KEY, FormValue } from "./define/row/form";
import { FORM_ITEM_KEY, FormItemValue } from "./define/common/formItem";

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
    case FORM_ITEM_KEY:
      const formItemValue = record.value as FormItemValue;
      if (formItemValue) {
        return formItemValue.formVarName + "." + formItemValue.varName;
      } else {
        return "";
      }
    default: {
      return "Giá trị";
    }
  }
};
