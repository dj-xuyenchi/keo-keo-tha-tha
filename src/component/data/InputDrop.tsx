import { InputProps } from "antd/es/input/Input";
import { defaultCss } from "@/config/defaultCss";
import { WrapperBase, WrapperDropComponent } from "./WrapperDropComponent";
import styles from "./style/input.module.scss";

import { ComponentData } from "@/entity/canvas/ComponentData";
import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { InputCustom } from "../componentCustom/InputCustom";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
export interface InputDropProps extends InputProps, WrapperBase {
  input: ComponentData | null;
}
export const InputDrop = ({
  input,
  widthDefault,
  ...restProps
}: InputDropProps) => {
  return (
    <WrapperDropComponent component={input} widthDefault={widthDefault}>
      <InputCustom
        style={{
          ...defaultCss,
          pointerEvents: "none",
          cursor: "default",
        }}
        size="small"
        {...restProps}
      />
    </WrapperDropComponent>
  );
};
export const defaultInputDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.INPUT,
    inlineStyle: [] as StyleHTML[],
  } as ComponentData;
};

export const inputIgnoreStyle = [];
