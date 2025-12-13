import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const BACKGROUND_COLOR_KEY = "BACKGROUND_COLOR_KEY";
export const BACKGROUND_KEY = "BACKGROUND_KEY";

export const background = {
    key: BACKGROUND_KEY,
    name: "background",
    reactObjectName: "background",
} as StyleHTML;

export const backgroundColor = {
    key: BACKGROUND_COLOR_KEY,
    name: "background-color",
    reactObjectName: "backgroundColor",
} as StyleHTML;
export const backgroundGroupStyle = [background, backgroundColor];
