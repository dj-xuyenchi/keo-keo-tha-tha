import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const widthKey = "WIDTH";
export const minWidthKey = "MIN_WIDTH";
export const maxWidthKey = "MAX_WIDTH";
export const width = {
  key: widthKey,
  name: "width",
  reactObjectName: "width",
} as StyleHTML;
export const minWidth = {
  key: minWidthKey,
  name: "min-width",
  reactObjectName: "minWidth",
} as StyleHTML;
export const maxWidth = {
  key: maxWidthKey,
  name: "max-width",
  reactObjectName: "maxWidth",
} as StyleHTML;
export const widthGroupStyle = [width, minWidth, maxWidth];
