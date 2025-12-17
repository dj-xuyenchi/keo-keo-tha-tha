import { PropComponent } from "@/entity/sidebar/PropComponent";

export const SIZE_KEY = "SIZE_KEY";
export const size = {
  name: "Size",
  key: SIZE_KEY,
  valueType: "select",
  apply: [],
  value: "small" as SizeType,
} as PropComponent;

export type SizeType = "small" | "middle" | "large";
export const sizeOptionList = [
  {
    label: "Nhỏ",
    value: "small",
  },
  {
    label: "Vừa",
    value: "middle",
  },
  {
    label: "Lớn",
    value: "large",
  },
];
