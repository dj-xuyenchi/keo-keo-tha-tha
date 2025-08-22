import { Checkbox } from "antd";
import { CheckboxProps } from "antd/es/checkbox";

export interface CheckBoxPropsCustom extends CheckboxProps {
  title?: string;
}

export const CheckBoxCustom = ({
  title,
  ...restProps
}: CheckBoxPropsCustom) => {
  return <Checkbox {...restProps}>{title}</Checkbox>;
};
