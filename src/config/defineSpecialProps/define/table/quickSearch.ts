import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const QUICK_SEARCH_KEY = "QUICK_SEARCH_KEY";
export const quickSearch = {
  name: "Tìm kiếm nhanh",
  key: QUICK_SEARCH_KEY,
  valueType: "switch",
  apply: [DATA_TYPE.TABLE],
  value: null,
} as PropComponent;
export const quickSearcheValid = (value: number): boolean => {
  return true;
};
export const quickSearchTooltip = "Bật/tắt ô tìm kiếm nhanh";
