import { DATA_TYPE, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const SIZE_KEY = "SIZE_KEY";
export const size = {
  name: "Size",
  key: SIZE_KEY,
  valueType: "select",
  apply: [DATA_TYPE.CHECK_BOX],
  value: "small" as SizeType,
} as PropComponent;


export type SizeType = "small" | "large";
