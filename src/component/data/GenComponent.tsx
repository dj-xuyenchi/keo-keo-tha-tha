import { GENERAL_TYPE, DATA_TYPE } from "@/config/sidebar/TypeComponent";
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
    case GENERAL_TYPE.ROW: {
      return (
        <>
          <RowDrop row={component} index={1} moveRow={() => {}} />
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
      return <>{/* <TableDrop /> */}</>;
    }
    default: {
      return <></>;
    }
  }
};
