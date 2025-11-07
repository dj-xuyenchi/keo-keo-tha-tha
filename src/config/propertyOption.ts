import { Toolbox } from "@/entity/Toolbox";
import { CONTROL_TYPE, DATA_TYPE, LAYOUT_TYPE } from "./TypeComponent";


export const propertyOptions: Toolbox[] = [
    {
        name: "Thuộc tính",
        option: [
            {
                name: "Panel",
                icon: "button.webp",
                type: LAYOUT_TYPE.PANEL,
            },

        ],
    },
    {
        name: "Nội dung",
        option: [
            {
                name: "Panel",
                icon: "button.webp",
                type: DATA_TYPE.BUTTON,
            },

        ],
    },
    {
        name: "Sự kiện",
        option: [
            {
                name: "Button",
                icon: "button.webp",
                type: DATA_TYPE.BUTTON,
            },
            {
                name: "Button",
                icon: "button.webp",
                type: DATA_TYPE.BUTTON,
            },
            {
                name: "Button",
                icon: "button.webp",
                type: DATA_TYPE.BUTTON,
            },
        ],
    },
];
