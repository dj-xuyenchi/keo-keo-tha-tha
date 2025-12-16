import { Toolbox } from "@/entity/Toolbox";
import { DATA_TYPE, GENERAL_TYPE } from "./TypeComponent";
import pannelIcon from "../../../public/options/layout/panel.png";
import rowIcon from "../../../public/options/layout/row.png";
import buttonIcon from "../../../public/options/control/button.png";
import tab2Icon from "../../../public/options/control/tab2.png";
import tableIcon from "../../../public/options/data/table.png";
import checkboxIcon from "../../../public/options/data/checkbox.png";
import radioIcon from "../../../public/options/data/radio.png";
import switchIcon from "../../../public/options/data/switch.png";
import inputIcon from "../../../public/options/data/input.png";
import inputNumberIcon from "../../../public/options/data/input-number.png";
import textIcon from "../../../public/options/data/text.png";
import dropdownIcon from "../../../public/options/data/dropdown.png";
import treeIcon from "../../../public/options/data/tree.png";
import datePickerIcon from "../../../public/options/data/date-picker.png";
import rangePickerIcon from "../../../public/options/data/range-picker.png";
import colorPickerIcon from "../../../public/options/data/color-picker.png";
import imageIcon from "../../../public/options/data/image.png";
import rateIcon from "../../../public/options/data/rate.png";
import uploadIcon from "../../../public/options/data/upload.png";
import qrIcon from "../../../public/options/data/qr.png";
import chartIcon from "../../../public/options/data/chart.png";
import textLine from "../../../public/options/data/text-line.png";
import colIcon from "../../../public/options/layout/col.png";

export const toolBoxOption: Toolbox[] = [
  {
    name: "Dữ liệu",
    option: [
      {
        name: "Table",
        icon: tableIcon,
        type: DATA_TYPE.TABLE,
      },
      {
        name: "Text",
        icon: textLine,
        type: DATA_TYPE.TEXT,
      },
      {
        name: "Checkbox",
        icon: checkboxIcon,
        type: DATA_TYPE.CHECK_BOX,
      },
      {
        name: "Radio",
        icon: radioIcon,
        type: DATA_TYPE.RADIO,
      },
      {
        name: "Switch",
        icon: switchIcon,
        type: DATA_TYPE.SWITCH,
      },
      {
        name: "Input",
        icon: inputIcon,
        type: DATA_TYPE.INPUT,
      },
      {
        name: "InputNumber",
        icon: inputNumberIcon,
        type: DATA_TYPE.INPUT_NUMBER,
      },
      {
        name: "Text area",
        icon: textIcon,
        type: DATA_TYPE.RICH_TEXT,
      },
      {
        name: "Dropdown",
        icon: dropdownIcon,
        type: DATA_TYPE.DROP_DOWN,
      },
      {
        name: "Tree",
        icon: treeIcon,
        type: DATA_TYPE.TREE,
      },
      {
        name: "Date picker",
        icon: datePickerIcon,
        type: DATA_TYPE.DATE_PICKER,
      },
      {
        name: "Range picker",
        icon: rangePickerIcon,
        type: DATA_TYPE.RANGE_PICKER,
      },
      {
        name: "Color picker",
        icon: colorPickerIcon,
        type: DATA_TYPE.DATE_PICKER,
      },
      {
        name: "Image",
        icon: imageIcon,
        type: DATA_TYPE.IMAGE,
      },
      {
        name: "Rate",
        icon: rateIcon,
        type: DATA_TYPE.RATE,
      },
      {
        name: "Upload",
        icon: uploadIcon,
        type: DATA_TYPE.UPLOAD,
      },
      {
        name: "QR",
        icon: qrIcon,
        type: DATA_TYPE.QR,
      },
      {
        name: "Chart",
        icon: chartIcon,
        type: DATA_TYPE.CHART,
      },
    ],
  },
  {
    name: "Khung & điều khiển",
    option: [
      {
        name: "Panel",
        icon: pannelIcon,
        type: GENERAL_TYPE.PANEL,
      },
      {
        name: "Row (Form place)",
        icon: rowIcon,
        type: GENERAL_TYPE.ROW,
      },
      {
        name: "Col",
        icon: colIcon,
        type: GENERAL_TYPE.COL,
      },
      {
        name: "Nút bấm",
        icon: buttonIcon,
        type: GENERAL_TYPE.BUTTON,
      },
      {
        name: "Tab",
        icon: tab2Icon,
        type: GENERAL_TYPE.TAB,
      },
    ],
  },
];
