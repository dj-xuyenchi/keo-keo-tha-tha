import Image, { StaticImageData } from "next/image";

import pannelIcon from "../../../../public/options/layout/panel.png";
import rowIcon from "../../../../public/options/layout/row.png";
import buttonIcon from "../../../../public/options/control/button.png";
import tab2Icon from "../../../../public/options/control/tab2.png";
import tableIcon from "../../../../public/options/data/table.png";
import textInlineIcon from "../../../../public/options/data/text-line.png";
import checkboxIcon from "../../../../public/options/data/checkbox.png";
import radioIcon from "../../../../public/options/data/radio.png";
import switchIcon from "../../../../public/options/data/switch.png";
import inputIcon from "../../../../public/options/data/input.png";
import inputNumberIcon from "../../../../public/options/data/input-number.png";
import textIcon from "../../../../public/options/data/text.png";
import dropdownIcon from "../../../../public/options/data/dropdown.png";
import treeIcon from "../../../../public/options/data/tree.png";
import datePickerIcon from "../../../../public/options/data/date-picker.png";
import rangePickerIcon from "../../../../public/options/data/range-picker.png";
import colorPickerIcon from "../../../../public/options/data/color-picker.png";
import imageIcon from "../../../../public/options/data/image.png";
import rateIcon from "../../../../public/options/data/rate.png";
import uploadIcon from "../../../../public/options/data/upload.png";
import qrIcon from "../../../../public/options/data/qr.png";
import chartIcon from "../../../../public/options/data/chart.png";
import colIcon from "../../../../public/options/layout/col.png";
import { DATA_TYPE, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
export interface IconTreeCustom {
  type: string;
  height: number;
  width: number;
}

export const IconTree = ({ type, height, width }: IconTreeCustom) => {
  const iconMap: Record<string, StaticImageData> = {
    [GENERAL_TYPE.PANEL]: pannelIcon,
    [GENERAL_TYPE.COL]: colIcon,
    [GENERAL_TYPE.ROW]: rowIcon,
    [DATA_TYPE.TABLE]: tableIcon,
    [DATA_TYPE.TEXT]: textInlineIcon,
    [DATA_TYPE.INPUT]: inputIcon,
  };

  const iconSrc = iconMap[type];
  return (
    <>
      <Image alt="icon" height={height} width={width} src={iconSrc} />
    </>
  );
};
