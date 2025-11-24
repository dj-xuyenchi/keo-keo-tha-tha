import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const heightKey = "HEIGHT";
export const minHeightKey = "MIN_HEIGHT";
export const maxHeightKey = "MAX_HEIGHT";
export const height = {
  key: heightKey,
  name: "height",
  reactObjectName: "height",
} as StyleHTML;

export const minHeight = {
  key: minHeightKey,
  name: "min-height",
  reactObjectName: "minHeight",
} as StyleHTML;
export const maxHeight = {
  key: maxHeightKey,
  name: "max-height",
  reactObjectName: "maxHeight",
} as StyleHTML;

export const heightGroupStyle = [height, minHeight, maxHeight];
