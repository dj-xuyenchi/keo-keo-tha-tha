import { DATA_TYPE, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const LOADING_KEY = "LOADING_KEY";
export const loading = {
  name: "State loading",
  key: LOADING_KEY,
  valueType: "string",
  apply: [
    DATA_TYPE.INPUT,
    DATA_TYPE.INPUT_NUMBER,
    GENERAL_TYPE.BUTTON,
  ],
  value: "" as string,
} as PropComponent;

export const loadingTooltip =
  "Cấu hình state kiểm soát trạng thái loading của đối tượng";
