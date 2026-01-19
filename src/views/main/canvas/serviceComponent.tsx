import { defaultButtonDropObject } from "@/component/data/ButtonDrop";
import { defaultCheckBoxDropObject } from "@/component/data/CheckBoxDrop";
import { defaultColDropObject } from "@/component/data/ColForRow";
import { defaultDatetimePickerDropObject } from "@/component/data/DateTimePickerDrop";
import { defaultDropdownDropObject } from "@/component/data/DropdownDrop";
import { defaultImageDropObject } from "@/component/data/ImageDrop";
import { defaultInputDropObject } from "@/component/data/InputDrop";
import { defaultInputNumberDropObject } from "@/component/data/InputNumberDrop";
import { defaultLinkDropObject } from "@/component/data/LinkDrop";
import { defaultRadioDropObject } from "@/component/data/RadioDrop";
import { defaultRowDropObject } from "@/component/data/RowDrop";
import { defaultSelectDropObject } from "@/component/data/SelectDrop";
import { defaultSwitchDropObject } from "@/component/data/SwitchDrop";
import { defaultTableDropObject } from "@/component/data/TableDrop";
import { defaultTextAreaDropObject } from "@/component/data/TextAreaDrop";
import { defaultTextDropObject } from "@/component/data/TextDrop";
import { DATA_TYPE, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { DropDragItem } from "@/entity/DropDragItem";
// Add build function
export const buildChildren = (item: DropDragItem) => {
  switch (item.type) {
    case DATA_TYPE.INPUT: {
      return defaultInputDropObject(item.id as string);
    }
    case DATA_TYPE.RICH_TEXT: {
      return defaultTextAreaDropObject(item.id as string);
    }
    case DATA_TYPE.INPUT_NUMBER: {
      return defaultInputNumberDropObject(item.id as string);
    }
    case DATA_TYPE.TEXT: {
      return defaultTextDropObject(item.id as string);
    }
    case DATA_TYPE.LINK: {
      return defaultLinkDropObject(item.id as string);
    }
    case DATA_TYPE.DROP_DOWN: {
      return defaultDropdownDropObject(item.id as string);
    }
    case DATA_TYPE.SELECT: {
      return defaultSelectDropObject(item.id as string);
    }
    case DATA_TYPE.DATE_PICKER: {
      return defaultDatetimePickerDropObject(item.id as string);
    }
    case DATA_TYPE.CHECK_BOX: {
      return defaultCheckBoxDropObject(item.id as string);
    }
    case DATA_TYPE.RADIO: {
      return defaultRadioDropObject(item.id as string);
    }
    case DATA_TYPE.SWITCH: {
      return defaultSwitchDropObject(item.id as string);
    }
    case GENERAL_TYPE.ROW: {
      return defaultRowDropObject(item.id as string);
    }
    case GENERAL_TYPE.COL: {
      return defaultColDropObject(item.id as string);
    }
    case DATA_TYPE.TABLE: {
      return defaultTableDropObject(item.id as string);
    }
    case GENERAL_TYPE.BUTTON: {
      return defaultButtonDropObject(item.id as string);
    }
    case DATA_TYPE.IMAGE: {
      return defaultImageDropObject(item.id as string);
    }
    default: {
      return {
        type: item.type,
        componentChildren: [] as ComponentData[],
      } as ComponentData;
    }
  }
};
