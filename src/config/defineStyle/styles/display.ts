import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const DISPLAY_KEY = "DISPLAY_KEY";
export const ALIGN_ITEMS_KEY = "ALIGN_ITEMS_KEY";
export const JUSTIFY_CONTENT_KEY = "JUSTIFY_CONTENT_KEY";
export const display = {
  key: DISPLAY_KEY,
  name: "display",
  reactObjectName: "display",
} as StyleHTML;
export const alignItems = {
  key: ALIGN_ITEMS_KEY,
  name: "align-items",
  reactObjectName: "alignItems",
} as StyleHTML;
export const justifyContent = {
  key: JUSTIFY_CONTENT_KEY,
  name: "justify-content",
  reactObjectName: "justifyContent",
} as StyleHTML;
export const displayGroupStyle = [display, alignItems, justifyContent];
