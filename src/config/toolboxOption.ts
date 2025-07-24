import { Toolbox } from "@/entity/Toolbox";
import { BUTTON } from "@/entity/ToolboxOption";

export const toolBoxOption: Toolbox[] = [
  {
    name: "Layout",
    option: [
      {
        name: "Panel",
        icon: "button.webp",
        type: BUTTON,
      },
      {
        name: "Hàng",
        icon: "button.webp",
        type: BUTTON,
      },
      {
        name: "Form",
        icon: "button.webp",
        type: BUTTON,
      },
    ],
  },
  {
    name: "Điều khiển",
    option: [
      {
        name: "Button",
        icon: "button.webp",
        type: BUTTON,
      },
      {
        name: "Button",
        icon: "button.webp",
        type: BUTTON,
      },
      {
        name: "Button",
        icon: "button.webp",
        type: BUTTON,
      },
    ],
  },
  {
    name: "Dữ liệu",
    option: [
      {
        name: "Input",
        icon: "button.webp",
        type: BUTTON,
      },
      {
        name: "InputNumber",
        icon: "button.webp",
        type: BUTTON,
      },
      {
        name: "RichText",
        icon: "button.webp",
        type: BUTTON,
      },
      {
        name: "Checkbox",
        icon: "button.webp",
        type: BUTTON,
      },
      {
        name: "Radio",
        icon: "button.webp",
        type: BUTTON,
      },
      {
        name: "DatePicker",
        icon: "button.webp",
        type: BUTTON,
      },
      {
        name: "Table",
        icon: "button.webp",
        type: BUTTON,
      },
    ],
  },
];
