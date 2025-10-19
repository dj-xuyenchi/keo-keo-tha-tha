import { Button, ButtonProps } from "antd";
import clsx from "clsx";

export interface ButtonPropsCustom extends ButtonProps {
  title?: string;
  height?: number;
  isIconBtn?: boolean;
}

export const ButtonCustom = ({
  shape,
  style,
  title,
  disabled,
  children,
  isIconBtn,
  ...restProps
}: ButtonPropsCustom) => {
  return (
    <Button
      style={{
        borderRadius: shape === "circle" ? "50%" : "0px",
        ...style,
      }}
      disabled={disabled}
      className={clsx(disabled && "abs-disable", isIconBtn && "icon-btn")}
      title={title}
      {...restProps}
    >
      {children}
    </Button>
  );
};
