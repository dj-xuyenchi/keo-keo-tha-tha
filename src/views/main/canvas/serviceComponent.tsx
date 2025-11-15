import { defaultColDropObject } from "@/component/data/ColForRow";
import { defaultInputDropObject } from "@/component/data/InputDrop";
import { defaultRowDropObject } from "@/component/data/RowDrop";
import { DATA_TYPE, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { DropDragItem } from "@/entity/DropDragItem";

export const buildChildren = (item: DropDragItem) => {
    switch (item.type) {
        case DATA_TYPE.INPUT: {
            return defaultInputDropObject(item.id as string);
        }
        case GENERAL_TYPE.ROW: {
            return defaultRowDropObject(item.id as string);
        }
        case GENERAL_TYPE.COL: {
            return defaultColDropObject(item.id as string);
        }
    }
    return {
        type: item.type,
        componentChildren: [] as ComponentData[],
    } as ComponentData;
};