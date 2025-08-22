import { defaultCss } from "@/config/defaultCss";
import { InputNumber, InputNumberProps } from "antd";

export interface InputNumberPropsCustom extends InputNumberProps {
  height?: number;
}

export const InputNumberCustom = ({
  style,
  ...restProps
}: InputNumberPropsCustom) => {
  return (
    <InputNumber
      style={{
        ...defaultCss,
        ...style,
      }}
      {...restProps}
    />
  );
};
