import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const BORDER_KEY = "BORDER_KEY";
export const BORDER_RADIUS_KEY = "BORDER_RADIUS_KEY";

export const border = {
  key: BORDER_KEY,
  name: "border",
  reactObjectName: "border",
} as StyleHTML;
export const borderTooltip = "Thiết lập đường viền cho component";
export const borderRadius = {
  key: BORDER_RADIUS_KEY,
  name: "border-radius",
  reactObjectName: "borderRadius",
} as StyleHTML;
export const borderRadiusTooltip = "Thiết lập độ tròn đường viền cho component";
export const borderGroupStyle = [border, borderRadius];
