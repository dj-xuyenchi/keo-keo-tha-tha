import { IconFileFolder } from "@/component/icon-foulder/IconFileFolder";
import { TreeNodeProps } from "antd";
import React from "react";
export const getNodeOpenIcon = (node: TreeNodeProps) => {
  const open = node.expanded;
  switch (node.data.key) {
    case "0-0-0":
      return open
        ? React.createElement(IconFileFolder, {
            icon: "uiOpen",
            height: 18,
            width: 18,
          })
        : React.createElement(IconFileFolder, {
            icon: "ui",
            height: 18,
            width: 18,
          });
    case "1-0-0":
      return open
        ? React.createElement(IconFileFolder, {
            icon: "utilOpen",
            height: 18,
            width: 18,
          })
        : React.createElement(IconFileFolder, {
            icon: "util",
            height: 18,
            width: 18,
          });

    case "2-0-0":
      return open
        ? React.createElement(IconFileFolder, {
            icon: "settingOpen",
            height: 18,
            width: 18,
          })
        : React.createElement(IconFileFolder, {
            icon: "setting",
            height: 18,
            width: 18,
          });

    default:
      return open
        ? React.createElement(IconFileFolder, {
            icon: "openFolder",
            height: 18,
            width: 18,
          })
        : React.createElement(IconFileFolder, {
            icon: "folder1",
            height: 18,
            width: 18,
          });
  }
};
