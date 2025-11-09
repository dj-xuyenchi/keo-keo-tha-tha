import { DATA_TYPE, LAYOUT_TYPE } from "@/config/TypeComponent";
import { Row } from "antd";
import { InputDrop } from "./InputDrop";
import { ComponentData } from "@/entity/canvas/ComponentData";
export interface GenComponentProps {
  component: ComponentData;
}
export const GenComponent = ({
  component,
  ...restProps
}: GenComponentProps) => {
  console.error(component);

  switch (component.type) {
    case LAYOUT_TYPE.ROW: {
      return (
        <>
          <Row></Row>
        </>
      );
    }
    case DATA_TYPE.INPUT: {
      console.error(123);

      return (
        <>
          <InputDrop />
        </>
      );
    }

    default: {
      return <></>;
    }
  }
};
