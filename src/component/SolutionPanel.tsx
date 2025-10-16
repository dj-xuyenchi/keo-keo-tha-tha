import React from "react";

import styles from "./solution.module.scss";
import clsx from "clsx";
import { Tabs, TabsProps, Tree, TreeDataNode } from "antd";
import {
  CarryOutOutlined,
  CheckOutlined,
  FormOutlined,
} from "@ant-design/icons";

import "../config/styleOverride.css";
export interface SolutionPanelProps {
  selected: number;
}
const treeData: TreeDataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    icon: <CarryOutOutlined />,
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        icon: <CarryOutOutlined />,
        children: [
          { title: "leaf", key: "0-0-0-0", icon: <CarryOutOutlined /> },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: "0-0-0-1",
            icon: <CarryOutOutlined />,
          },
          { title: "leaf", key: "0-0-0-2", icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        icon: <CarryOutOutlined />,
        children: [
          { title: "leaf", key: "0-0-1-0", icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: "parent 1-2",
        key: "0-0-2",
        icon: <CarryOutOutlined />,
        children: [
          { title: "leaf", key: "0-0-2-0", icon: <CarryOutOutlined /> },
          {
            title: "leaf",
            key: "0-0-2-1",
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
];
export const SolutionPanel = ({ selected }: SolutionPanelProps) => {
  return (
    <div className={styles.solutionContainer}>
      <div className={styles.fileTree}>
        <Tabs
          type="card"
          defaultActiveKey="1"
          items={[{}].map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Solution`,
              key: id,
              children: (
                <Tree
                  showLine={true}
                  showIcon={false}
                  defaultExpandedKeys={["0-0-0"]}
                  onSelect={() => {}}
                  treeData={treeData}
                />
              ),
            };
          })}
        />
      </div>
      <div className={styles.componentList}></div>
    </div>
  );
};
