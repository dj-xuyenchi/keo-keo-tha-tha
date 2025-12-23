import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const POSITION_KEY = "POSITION_KEY";
export const TOP_KEY = "TOP_KEY";
export const BOTTOM_KEY = "BOTTOM_KEY";
export const RIGHT_KEY = "RIGHT_KEY";
export const LEFT_KEY = "LEFT_KEY";
export const position = {
  key: POSITION_KEY,
  name: "position",
  reactObjectName: "position",
} as StyleHTML;

export const positionTooltip = "Thiết lập cách quyết định vị trí của component";
export const top = {
  key: TOP_KEY,
  name: "top",
  reactObjectName: "top",
} as StyleHTML;
export const bottom = {
  key: BOTTOM_KEY,
  name: "bottom",
  reactObjectName: "bottom",
} as StyleHTML;
export const right = {
  key: RIGHT_KEY,
  name: "right",
  reactObjectName: "right",
} as StyleHTML;
export const left = {
  key: LEFT_KEY,
  name: "left",
  reactObjectName: "left",
} as StyleHTML;

export const positionGroupStyle = [position, top, bottom, right, left];
