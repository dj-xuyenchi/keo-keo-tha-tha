import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const HREF_KEY = "HREF_KEY";
export const href = {
  name: "Điều hướng đến trang",
  key: HREF_KEY,
  valueType: "string",
  apply: [DATA_TYPE.LINK],
  value: null,
} as PropComponent;
export const hrefValid = (value: number): boolean => {
  return true;
};
export const hrefTooltip = "Cấu hình điều hướng router";
