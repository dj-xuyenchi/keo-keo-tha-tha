import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const BORDER_KEY = "BORDER_KEY";
export const BORDER_RADIUS_KEY = "BORDER_RADIUS_KEY";

export const border = {
  key: BORDER_KEY,
  name: "border",
  reactObjectName: "border",
} as StyleHTML;
export const borderRadius = {
  key: BORDER_RADIUS_KEY,
  name: "border-radius",
  reactObjectName: "borderRadius",
} as StyleHTML;
export const borderGroupStyle = [border, borderRadius];
