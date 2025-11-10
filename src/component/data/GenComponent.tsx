import { DATA_TYPE, LAYOUT_TYPE } from "@/config/TypeComponent";
import { InputDrop } from "./InputDrop";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { SelectDrop } from "./SelectDrop";
import { TableDrop } from "./TableDrop";
import { RowDrop } from "./RowDrop";
export interface GenComponentProps {
  component: ComponentData;
}
export const GenComponent = ({
  component,
  ...restProps
}: GenComponentProps) => {

  switch (component.type) {
    case LAYOUT_TYPE.ROW: {
      return (
        <>
          <RowDrop row={component} index={1} moveRow={() => { }} />
        </>
      );
    }
    case DATA_TYPE.INPUT: {
      return (
        <>
          <InputDrop input={component} />
        </>
      );
    }
    case DATA_TYPE.DROP_DOWN: {
      return (
        <>
          <SelectDrop />
        </>
      );
    }
    case DATA_TYPE.TABLE: {
      return (
        <>
          <TableDrop />
        </>
      );
    }
    default: {
      return <></>;
    }
  }
};
