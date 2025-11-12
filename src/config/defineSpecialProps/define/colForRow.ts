import { GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const COL_FOR_ROW_KEY = "COL_FOR_ROW_KEY";
export const colForRow = {
  name: "Cột",
  key: COL_FOR_ROW_KEY,
  valueType: "flex",
  apply: [GENERAL_TYPE.ROW],
  valid: (value: string) => {
    if (!value) {
      return false;
    }

    return true;
  },
  value: {
    formName: "2",
  },
} as PropComponent;
