import Input from "antd/es/input/Input";
import { InputProps } from "antd";
import { defaultCss } from "@/config/defaultCss";

export interface InputPropsCustom extends InputProps {}

export const InputDrop = ({ style, ...restProps }: InputPropsCustom) => {
  return (
    <Input
      style={{
        ...defaultCss,
        ...style, // nếu người dùng truyền style bên ngoài
      }}
      {...restProps}
    />
  );
};
