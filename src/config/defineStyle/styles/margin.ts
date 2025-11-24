import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const margrinKey = "MARGIN";
export const margrinBottomKey = "MARGIN_BOTTOM";
export const margrinTopKey = "MARGIN_TOP";
export const margrinLeftKey = "MARGIN_LEFT";
export const margrinRightKey = "MARGIN_RIGHT";

export const margrin = {
  key: margrinKey,
  name: "margin",
  reactObjectName: "margin",
} as StyleHTML;

export const margrinBottom = {
  key: margrinBottomKey,
  name: "margin-bottom",
  reactObjectName: "marginBottom",
} as StyleHTML;

export const margrinTop = {
  key: margrinTopKey,
  name: "margin-top",
  reactObjectName: "marginTop",
} as StyleHTML;

export const margrinLeft = {
  key: margrinLeftKey,
  name: "margin-left",
  reactObjectName: "marginTop",
} as StyleHTML;

export const margrinRight = {
  key: margrinRightKey,
  name: "margin-right",
  reactObjectName: "marginRight",
} as StyleHTML;
export const marginGroupStyle = [
  margrin,
  margrinBottom,
  margrinTop,
  margrinLeft,
  margrinRight,
];
