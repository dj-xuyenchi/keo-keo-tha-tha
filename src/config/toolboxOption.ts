import { Toolbox } from "@/entity/Toolbox";
import { DATA_TYPE } from './TypeComponent';


export const toolBoxOption: Toolbox[] = [
  {
    name: "Layout",
    option: [
      {
        name: "Panel",
        icon: "button.webp",
        type: DATA_TYPE.BUTTON,
      },
      {
        name: "Hàng",
        icon: "button.webp",
        type: DATA_TYPE.BUTTON,
      },
      {
        name: "Form",
        icon: "button.webp",
        type: DATA_TYPE.BUTTON,
      },
    ],
  },
  {
    name: "Điều khiển",
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
  {
    name: "Dữ liệu",
    option: [
      {
        name: "Input",
        icon: "text-input.jpg",
        type: DATA_TYPE.INPUT,
      },
      {
        name: "InputNumber",
        icon: "button.webp",
        type: DATA_TYPE.BUTTON,
      },
      {
        name: "RichText",
        icon: "button.webp",
        type: DATA_TYPE.BUTTON,
      },
      {
        name: "Checkbox",
        icon: "button.webp",
        type: DATA_TYPE.BUTTON,
      },
      {
        name: "Radio",
        icon: "button.webp",
        type: DATA_TYPE.BUTTON,
      },
      {
        name: "DatePicker",
        icon: "button.webp",
        type: DATA_TYPE.BUTTON,
      },
      {
        name: "Table",
        icon: "button.webp",
        type: DATA_TYPE.BUTTON,
      },
    ],
  },
];
