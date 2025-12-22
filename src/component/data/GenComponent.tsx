import { GENERAL_TYPE, DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { InputDrop } from "./InputDrop";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { SelectDrop } from "./SelectDrop";
import { TableDrop } from "./TableDrop";
import { RowDrop } from "./RowDrop";
import { ColForRow } from "./ColForRow";
import { TextDrop } from "./TextDrop";
import { ButtonDrop } from "./ButtonDrop";
import { CheckBoxDrop } from "./CheckBoxDrop";
import { RadioDrop } from "./RadioDrop";
import { SwitchDrop } from "./SwitchDrop";
import { InputNumberDrop } from "./InputNumberDrop";
import { TextAreaDrop } from "./TextAreaDrop";
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
          <RowDrop row={component} key={component.id} />
        </>
      );
    }
    case GENERAL_TYPE.COL: {
      return (
        <>
          <ColForRow col={component} isFromSideBar={false} key={component.id} />
        </>
      );
    }
    case DATA_TYPE.INPUT: {
      return (
        <>
          <InputDrop input={component} key={component.id} />
        </>
      );
    }
    case DATA_TYPE.RICH_TEXT: {
      return (
        <>
          <TextAreaDrop textArea={component} key={component.id} />
        </>
      );
    }
    case DATA_TYPE.INPUT_NUMBER: {
      return (
        <>
          <InputNumberDrop inputNumber={component} key={component.id} />
        </>
      );
    }
    case DATA_TYPE.TEXT: {
      return (
        <>
          <TextDrop text={component} key={component.id} />
        </>
      );
    }
    case DATA_TYPE.CHECK_BOX: {
      return (
        <>
          <CheckBoxDrop checkBox={component} key={component.id} />
        </>
      );
    }
    case DATA_TYPE.RADIO: {
      return (
        <>
          <RadioDrop radio={component} key={component.id} />
        </>
      );
    }
    case DATA_TYPE.SWITCH: {
      return (
        <>
          <SwitchDrop switchComponent={component} key={component.id} />
        </>
      );
    }
    case DATA_TYPE.DROP_DOWN: {
      return (
        <>
          <SelectDrop key={component.id} />
        </>
      );
    }
    case DATA_TYPE.TABLE: {
      return (
        <>
          <TableDrop table={component} />
        </>
      );
    }
    case GENERAL_TYPE.BUTTON: {
      return (
        <>
          <ButtonDrop button={component} />
        </>
      );
    }
    default: {
      return <></>;
    }
  }
};
