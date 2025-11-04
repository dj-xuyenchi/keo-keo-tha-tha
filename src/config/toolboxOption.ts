import { Toolbox } from "@/entity/Toolbox";
import { CONTROL_TYPE, DATA_TYPE, LAYOUT_TYPE } from "./TypeComponent";

export const toolBoxOption: Toolbox[] = [
  {
    name: "Layout",
    option: [
      {
        name: "Panel",
        icon: "layout/panel.png",
        type: LAYOUT_TYPE.PANEL,
      },
    ],
  },
  {
    name: "Điều khiển",
    option: [
      {
        name: "Nút bấm",
        icon: "control/button.png",
        type: CONTROL_TYPE.BUTTON,
      },
      {
        name: "Switch",
        icon: "control/switch.png",
        type: CONTROL_TYPE.SWITCH,
      },
    ],
  },
  {
    name: "Dữ liệu",
    option: [
      {
        name: "Table",
        icon: "data/table.png",
        type: DATA_TYPE.TABLE,
      },
      {
        name: "Input",
        icon: "data/input.png",
        type: DATA_TYPE.INPUT,
      },
      {
        name: "InputNumber",
        icon: "data/input-number.png",
        type: DATA_TYPE.INPUT_NUMBER,
      },
      {
        name: "Text area",
        icon: "data/text.png",
        type: DATA_TYPE.RICH_TEXT,
      },
      {
        name: "Date picker",
        icon: "data/date-picker.png",
        type: DATA_TYPE.DATE_PICKER,
      },
    ],
  },
];
