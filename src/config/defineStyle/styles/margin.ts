import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const MARGIN_KEY = "MARGIN";
export const MARGIN_BOTTOM_KEY = "MARGIN_BOTTOM";
export const MARGIN_TOP_KEY = "MARGIN_TOP";
export const MARGIN_LEFT_KEY = "MARGIN_LEFT";
export const MARGIN_RIGHT_KEY = "MARGIN_RIGHT";

export const margrin = {
  key: MARGIN_KEY,
  name: "margin",
  reactObjectName: "margin",
} as StyleHTML;

export const margrinBottom = {
  key: MARGIN_BOTTOM_KEY,
  name: "margin-bottom",
  reactObjectName: "marginBottom",
} as StyleHTML;

export const margrinTop = {
  key: MARGIN_TOP_KEY,
  name: "margin-top",
  reactObjectName: "marginTop",
} as StyleHTML;

export const margrinLeft = {
  key: MARGIN_LEFT_KEY,
  name: "margin-left",
  reactObjectName: "marginTop",
} as StyleHTML;

export const margrinRight = {
  key: MARGIN_RIGHT_KEY,
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
