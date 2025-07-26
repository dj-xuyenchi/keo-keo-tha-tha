// Sidebar.tsx
import React from "react";
import { useDrag } from "react-dnd";

import styles from "./sidebar.module.scss";
import { Tabs } from "antd";
import { toolBoxOption } from "@/config/toolboxOption";
import { ToolboxOptionPanel } from "./ToolboxOptionPanel";
import { propertyOptions } from "@/config/propertyOption";


export const Sidebar = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.toolbox}>
        <Tabs
          onChange={onChange}
          type="card"
          items={toolBoxOption.map((_, i) => {
            const id = String(i + 1);
            return {
              label: `${_.name}`,
              key: id,
              children: <ToolboxOptionPanel listOption={_.option} />,
            };
          })}
        />
      </div>
      <div className={styles.properties}>
        <Tabs
          onChange={onChange}
          type="card"
          items={propertyOptions.map((_, i) => {
            const id = String(i + 1);
            return {
              label: `${_.name}`,
              key: id,
              children: <ToolboxOptionPanel listOption={_.option} />,
            };
          })}
        />
      </div>
    </div>
  );
};
