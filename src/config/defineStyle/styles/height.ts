import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const HEIGHT_KEY = "HEIGHT";
export const MIN_HEIGHT_KEY = "MIN_HEIGHT";
export const MAX_HEIGHT_KEY = "MAX_HEIGHT";
export const height = {
  key: HEIGHT_KEY,
  name: "height",
  reactObjectName: "height",
} as StyleHTML;

export const minHeight = {
  key: MIN_HEIGHT_KEY,
  name: "min-height",
  reactObjectName: "minHeight",
} as StyleHTML;
export const maxHeight = {
  key: MAX_HEIGHT_KEY,
  name: "max-height",
  reactObjectName: "maxHeight",
} as StyleHTML;

export const heightGroupStyle = [height, minHeight, maxHeight];
