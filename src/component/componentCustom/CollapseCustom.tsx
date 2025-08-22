import { Collapse, CollapseProps } from "antd";
import "@/config/styleOverride.css";

export interface CollapsePropsCustom extends CollapseProps {
  noBorder?: boolean;
}

export const CollapseCustom = ({
  noBorder,
  ...restProps
}: CollapsePropsCustom) => {
  return (
    <Collapse
      {...restProps}
      style={{
        ...(noBorder && {
          border: "unset",
          background: "white",
        }),
      }}
      className={noBorder ? "clearBorderCollapse" : ""}
    />
  );
};
