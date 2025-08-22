import { Button, ButtonProps } from "antd";
import clsx from "clsx";

export interface ButtonPropsCustom extends ButtonProps {
  title?: string;
  height?: number;
}

export const ButtonCustom = ({
  shape,
  style,
  title,
  disabled,
  ...restProps
}: ButtonPropsCustom) => {
  return (
    <Button
      style={{
        borderRadius: shape === "circle" ? "50%" : "0px",
        ...style,
      }}
      disabled={disabled}
      className={clsx(disabled && "abs-disable")}
      {...restProps}
    >
      {title}
    </Button>
  );
};
