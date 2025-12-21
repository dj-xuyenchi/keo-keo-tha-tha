import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const TEXT_VALUE_KEY = "TEXT_VALUE_KEY";
export const textValue = {
  name: "Text value",
  key: TEXT_VALUE_KEY,
  valueType: "string",
  apply: [DATA_TYPE.TEXT, DATA_TYPE.CHECK_BOX, DATA_TYPE.RADIO],
  value: "" as string,
} as PropComponent;

export const textValuemTooltip = "Nội dung hiển thị mặc định";
export const textValuePlaceHolder = "Nhập nội dung text";
