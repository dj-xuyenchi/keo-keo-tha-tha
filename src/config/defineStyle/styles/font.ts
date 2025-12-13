import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const FONT_SIZE_KEY = "FONT_SIZE_KEY";
export const FONT_KEY = "FONT_KEY";
export const FONT_WEIGHT_KEY = "FONT_WEIGHT_KEY";

export const font = {
  key: FONT_KEY,
  name: "font",
  reactObjectName: "font",
} as StyleHTML;

export const fontSize = {
  key: FONT_SIZE_KEY,
  name: "font-size",
  reactObjectName: "fontSize",
} as StyleHTML;

export const fontWeight = {
  key: FONT_WEIGHT_KEY,
  name: "fontWeight",
  reactObjectName: "fontWeight",
} as StyleHTML;
export const fontGroupStyle = [font, fontSize, fontWeight];
