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
      {
        name: "Row",
        icon: "layout/row.png",
        type: LAYOUT_TYPE.ROW,
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
        name: "Tab",
        icon: "control/tab2.png",
        type: CONTROL_TYPE.TAB,
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
        name: "Checkbox",
        icon: "data/checkbox.png",
        type: DATA_TYPE.RICH_TEXT,
      },
      {
        name: "Radio",
        icon: "data/radio.png",
        type: DATA_TYPE.RICH_TEXT,
      },
      {
        name: "Switch",
        icon: "data/switch.png",
        type: DATA_TYPE.SWITCH,
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
        name: "Dropdown",
        icon: "data/dropdown.png",
        type: DATA_TYPE.DROP_DOWN,
      },
      {
        name: "Tree",
        icon: "data/tree.png",
        type: DATA_TYPE.TREE,
      },
      {
        name: "Date picker",
        icon: "data/date-picker.png",
        type: DATA_TYPE.DATE_PICKER,
      },
      {
        name: "Range picker",
        icon: "data/range-picker.png",
        type: DATA_TYPE.RANGE_PICKER,
      },
      {
        name: "Color picker",
        icon: "data/color-picker.png",
        type: DATA_TYPE.DATE_PICKER,
      },
      {
        name: "Image",
        icon: "data/image.png",
        type: DATA_TYPE.IMAGE,
      },
      {
        name: "Rate",
        icon: "data/rate.png",
        type: DATA_TYPE.RATE,
      },
      {
        name: "Upload",
        icon: "data/upload.png",
        type: DATA_TYPE.UPLOAD,
      },
    ],
  },
];
