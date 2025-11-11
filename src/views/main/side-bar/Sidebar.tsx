// Sidebar.tsx

import styles from "./sidebar.module.scss";
import { Tabs } from "antd";
import { toolBoxOption } from "@/config/sidebar/toolboxOption";
import { ToolboxOptionPanel } from "./ToolboxOptionPanel";
import { settingOption } from "@/config/sidebar/propertyOption";
import { NodeComponent } from "@/entity/NodeComponent";
import { NodePropsSetting } from "./NodePropsSetting";
export interface SidebarProps {
  onUpdateNode: (node: NodeComponent) => void;
}

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
          type="card"
          items={settingOption.map((_, i) => {
            const id = String(i + 1);
            return {
              label: `${_.name}`,
              key: id,
              children: <NodePropsSetting option={_} />,
            };
          })}
        />
      </div>
    </div>
  );
};
