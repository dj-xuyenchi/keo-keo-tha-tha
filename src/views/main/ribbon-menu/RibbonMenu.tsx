import { ribbonMenu } from "@/config/menu-config/ribbonMenu";
import { Tabs } from "antd";
import clsx from "clsx";
import styles from "./ribbon.module.scss";
import { useState } from "react";
import { FileTab } from "./FileTab";

export const RibbonMenu = () => {
  const [tab, setTab] = useState("1");
  const onChange = (value: string) => {
    console.error(value);

    setTab(value);
  };

  return (
    <div className={clsx(styles.ribbonMenuContainer, "ribbon-menu")}>
      <Tabs
        activeKey={tab}
        onChange={onChange}
        type="card"
        items={ribbonMenu.map((_, i) => {
          const id = String(i + 1);
          return {
            label: _.title,
            key: id,
            children: <>{tab === "1" && <FileTab />}</>,
          };
        })}
      />
    </div>
  );
};
