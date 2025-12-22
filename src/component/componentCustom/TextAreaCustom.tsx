import { defaultCss } from "@/config/defaultCss";
import TextArea, { TextAreaProps } from "antd/es/input/TextArea";

export interface TextAreaPropsCustom extends TextAreaProps {
  test?: string;
  //
}

export const TextAreaCustom = ({
  style,
  ...restProps
}: TextAreaPropsCustom) => {
  return (
    <TextArea
      style={{
        ...defaultCss,
        ...style, // nếu người dùng truyền style bên ngoài
      }}
      {...restProps}
    />
  );
};
