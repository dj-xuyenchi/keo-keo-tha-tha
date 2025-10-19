import Input from "antd/es/input/Input";
import { defaultCss } from "@/config/defaultCss";

export const InputDrop = ({ ...restProps }) => {
  return (
    <Input
      style={{
        ...defaultCss,
      }}
      {...restProps}
    />
  );
};
