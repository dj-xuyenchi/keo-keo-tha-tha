import { StyleHTML } from "@/entity/canvas/StyleHTML";
export const paddingKey = "PADDING";
export const padding = {
    key: paddingKey,
    name: "padding",
    reactObjectName: "padding",
    valueType: "freeStyle",
    validValue: (value: string) => {
        if (!value) {
            throw "Giá trị không hợp lệ!";
        }
        return true;
    },
} as StyleHTML;

export const paddingGroupStyle = [padding]