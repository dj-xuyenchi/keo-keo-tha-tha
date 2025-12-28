import { Dropdown, DropdownProps } from "antd";
import "@/config/styleOverride.css";

export interface DropdownPropsCustom extends DropdownProps {
  noBorder?: boolean;
}

export const DropdownCustom = ({
  noBorder,
  ...restProps
}: DropdownPropsCustom) => {
  return (
    // Chưa sử lý được do chưa hiểu
    <Dropdown
      {...restProps}
      className={noBorder ? "clearBorderCollapse" : ""}
    />
  );
};
