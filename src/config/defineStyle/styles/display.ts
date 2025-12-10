import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const DISPLAY_KEY = "DISPLAY_KEY";
export const ALIGN_ITEMS_KEY = "ALIGN_ITEMS_KEY";
export const JUSTIFY_CONTENT_KEY = "JUSTIFY_CONTENT_KEY";
export const FLEX_DIRECTION_KEY = "FLEX_DIRECTION_KEY";
export const display = {
  key: DISPLAY_KEY,
  name: "display",
  reactObjectName: "display",
} as StyleHTML;

export const alignItemsTooltip = "CSS này yêu cầu thẻ có display là flex";
export const alignItems = {
  key: ALIGN_ITEMS_KEY,
  name: "align-items",
  reactObjectName: "alignItems",
} as StyleHTML;
export const justifyContentTooltip = "CSS này yêu cầu thẻ có display là flex";
export const justifyContent = {
  key: JUSTIFY_CONTENT_KEY,
  name: "justify-content",
  reactObjectName: "justifyContent",
} as StyleHTML;
export const flexDirection = {
  key: FLEX_DIRECTION_KEY,
  name: "flex-direction",
  reactObjectName: "flexDirection",
} as StyleHTML;

export const displayGroupStyle = [
  display,
  alignItems,
  justifyContent,
  flexDirection,
];
