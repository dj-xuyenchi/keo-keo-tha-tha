import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const OPEN_NEW_PAGE_KEY = "OPEN_NEW_PAGE_KEY";
export const openNewPage = {
  name: "Mở tab mới khi ấn",
  key: OPEN_NEW_PAGE_KEY,
  valueType: "switch",
  apply: [DATA_TYPE.LINK],
  value: null,
} as PropComponent;
export const openNewPageValid = (value: number): boolean => {
  return true;
};
export const openNewPageTooltip = "Cấu hình có mở tab mới khi nhấn không";
