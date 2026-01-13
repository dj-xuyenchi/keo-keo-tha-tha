import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const OPTION_SELECT_KEY = "OPTION_SELECT_KEY";
export const optionSelect = {
  name: "Danh sách lựa chọn",
  key: OPTION_SELECT_KEY,
  valueType: "flex",
  apply: [DATA_TYPE.SELECT],
  value: null,
} as PropComponent;
export const optionSelectValid = (value: number): boolean => {
  return true;
};
export const optionSelectTooltip = "Cấu hình danh sách lựa chọn của thẻ select";
