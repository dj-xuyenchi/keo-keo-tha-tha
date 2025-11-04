import { defaultCss } from "@/config/defaultCss";
import styles from "./style/pannel.module.scss";
import { Collapse } from "antd";
export const PanelDrop = ({ ...restProps }) => {
  return (
    <div
      className={styles.pannelContainer}
      style={{
        ...defaultCss,
      }}
      {...restProps}
    >
      <Collapse
        {...restProps}
        className={false ? "clearBorderCollapse" : ""}
        items={[
          {
            key: "1",
            label: "Kết quả",
            children: <></>,
          },
        ]}
      />
    </div>
  );
};
