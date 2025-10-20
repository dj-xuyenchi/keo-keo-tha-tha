import { defaultCss } from "@/config/defaultCss";
import { Select, SelectProps } from "antd";
import "@/config/styleOverride.css";
export interface SelectPropsCustom extends SelectProps {
  height?: number;
  width?: number;
}

export const SelectCustom = ({ style, ...restProps }: SelectPropsCustom) => {
  return (
    <Select
      className="select-custom"
      style={{
        ...defaultCss,
        ...style, // nếu người dùng truyền style bên ngoài
      }}
      {...restProps}
    />
  );
};
