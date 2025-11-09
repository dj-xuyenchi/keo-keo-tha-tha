import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const margrinKey = "MARGIN";
export const margrinBottomKey = "MARGIN_BOTTOM";
export const margrin = {
  key: margrinKey,
  name: "margin",
  reactObjectName: "margin",
  valueType: "freeStyle",
  validValue: (value: string) => {
    if (!value) {
      throw "Giá trị không hợp lệ!";
    }
    return true;
  },
} as StyleHTML;

export const margrinBottom = {
  key: margrinBottomKey,
  name: "margin-bottom",
  reactObjectName: "marginBottom",
  valueType: "numberPx",
  validValue: (value: string) => {
    if (!value) {
      throw "Giá trị không hợp lệ!";
    }
    return true;
  },
} as StyleHTML;
