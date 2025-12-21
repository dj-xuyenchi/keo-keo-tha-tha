import { defaultButtonDropObject } from "@/component/data/ButtonDrop";
import { defaultCheckBoxDropObject } from "@/component/data/CheckBoxDrop";
import { defaultColDropObject } from "@/component/data/ColForRow";
import { defaultInputDropObject } from "@/component/data/InputDrop";
import { defaultInputNumberDropObject } from "@/component/data/InputNumberDrop";
import { defaultRadioDropObject } from "@/component/data/RadioDrop";
import { defaultRowDropObject } from "@/component/data/RowDrop";
import { defaultSwitchDropObject } from "@/component/data/SwitchDrop";
import { defaultTableDropObject } from "@/component/data/TableDrop";
import { defaultTextDropObject } from "@/component/data/TextDrop";
import { DATA_TYPE, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { DropDragItem } from "@/entity/DropDragItem";

export const buildChildren = (item: DropDragItem) => {
  switch (item.type) {
    case DATA_TYPE.INPUT: {
      return defaultInputDropObject(item.id as string);
    }
    case DATA_TYPE.INPUT_NUMBER: {
      return defaultInputNumberDropObject(item.id as string);
    }
    case DATA_TYPE.TEXT: {
      return defaultTextDropObject(item.id as string);
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
    default: {
      return {
        type: item.type,
        componentChildren: [] as ComponentData[],
      } as ComponentData;
    }
  }
};
