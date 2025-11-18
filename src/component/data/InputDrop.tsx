import Input, { InputProps } from "antd/es/input/Input";
import { defaultCss } from "@/config/defaultCss";
import { WrapperDropComponent } from "./WrapperDropComponent";
import styles from "./style/input.module.scss";

import { ComponentData } from "@/entity/canvas/ComponentData";
import { InlineStyle } from "@/entity/canvas/InlineStyle";
import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
export interface InputDropProps extends InputProps {
  input: ComponentData | null;
}
export const InputDrop = ({ input, ...restProps }: InputDropProps) => {
  return (
    <WrapperDropComponent component={input}>
      <Input
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
    inlineStyle: [] as InlineStyle[],
  } as ComponentData;
};

export const inputIgnoreStyle = [];
