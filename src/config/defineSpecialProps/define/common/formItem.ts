import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const FORM_ITEM_KEY = "FORM_ITEM_KEY";
export const formItem = {
  name: "Form item",
  key: FORM_ITEM_KEY,
  valueType: "flex",
  apply: [
    DATA_TYPE.TEXT,
    DATA_TYPE.INPUT,
    DATA_TYPE.INPUT_NUMBER,
    DATA_TYPE.CHECK_BOX,
    DATA_TYPE.RADIO,
    DATA_TYPE.DROP_DOWN,
    DATA_TYPE.DATE_PICKER,
    DATA_TYPE.RANGE_PICKER,
    DATA_TYPE.SWITCH,
    DATA_TYPE.COLOR_PICKER,
    DATA_TYPE.RATE,
    DATA_TYPE.UPLOAD,
    DATA_TYPE.TREE,
  ],
  value: {} as FormItemValue,
} as PropComponent;

export const formItemTooltip = "Cấu hình field dữ liệu cho Form";
export const formItemPlaceHolder = "Kết hợp với Form";

export interface FormItemValue {
  formVarName: string;
  varName: string;
  requird: boolean;
  valid: [];
}
