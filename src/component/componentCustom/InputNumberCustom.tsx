import { defaultCss } from "@/config/defaultCss";
import { InputNumber, InputNumberProps } from "antd";

export interface InputNumberPropsCustom extends InputNumberProps {
  exempple?: string;
}

export const InputNumberCustom = ({
  style,
  ...restProps
}: InputNumberPropsCustom) => {
  return (
    <InputNumber
      className="input-number-custom"
      style={{
        ...defaultCss,
        ...style,
      }}
      {...restProps}
    />
  );
};
