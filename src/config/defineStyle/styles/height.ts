import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const heightKey = "HEIGHT";
export const minHeightKey = "MIN_HEIGHT";
export const height = {
    key: heightKey,
    name: "height",
    reactObjectName: "height",
    valueType: "numberPx",
    validValue: (value: string) => {
        if (!value) {
            throw "Giá trị không hợp lệ!";
        }
        return true;
    },
} as StyleHTML;

export const minHeight = {
    key: minHeightKey,
    name: "min-height",
    reactObjectName: "minHeight",
    valueType: "numberPx",
    validValue: (value: string) => {
        if (!value) {
            throw "Giá trị không hợp lệ!";
        }
        return true;
    },
} as StyleHTML;


export const heightGroupStyle = [height, minHeight]