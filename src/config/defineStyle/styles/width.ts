import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const widthKey = "WIDTH";
export const width = {
    key: widthKey,
    name: "width",
    reactObjectName: "width",
    valueType: "numberPx",
    validValue: (value: string) => {
        if (!value) {
            throw "Giá trị không hợp lệ!";
        }
        return true;
    },
} as StyleHTML;

export const widthGroupStyle = [width]