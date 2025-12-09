import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const WIDTH_KEY = "WIDTH";
export const MIN_WIDTH_KEY = "MIN_WIDTH";
export const MAX_WIDTH_KEY = "MAX_WIDTH";
export const width = {
  key: WIDTH_KEY,
  name: "width",
  reactObjectName: "width",
} as StyleHTML;
export const minWidth = {
  key: MIN_WIDTH_KEY,
  name: "min-width",
  reactObjectName: "minWidth",
} as StyleHTML;
export const maxWidth = {
  key: MAX_WIDTH_KEY,
  name: "max-width",
  reactObjectName: "maxWidth",
} as StyleHTML;
export const widthGroupStyle = [width, minWidth, maxWidth];
