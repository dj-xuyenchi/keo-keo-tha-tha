import Input from "antd/es/input/Input";
import { defaultCss } from "@/config/defaultCss";
import { WrapperDropComponent } from "./WrapperDropComponent";
import styles from './style/input.module.scss'

import { v4 as uuidv4 } from "uuid";
import { UserOutlined } from '@ant-design/icons';
import { ComponentData } from "@/entity/canvas/ComponentData";
import { InlineStyle } from "@/entity/canvas/InlineStyle";
import { DATA_TYPE } from "@/config/TypeComponent";
export interface InputDropProps {
  input: ComponentData
}
export const InputDrop = ({ input, ...restProps }: InputDropProps) => {
  return (
    <WrapperDropComponent id={input.id} >
      <Input
        style={{
          ...defaultCss,
          pointerEvents: "none",
          cursor: "default",
        }}
        prefix={<UserOutlined />}
        {...restProps}
      />
    </WrapperDropComponent>

  );
};
export const defaultInputDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.INPUT,
    inlineStyle: [
    ] as InlineStyle[],
  } as ComponentData;
};

export const inputIgnoreStyle = []