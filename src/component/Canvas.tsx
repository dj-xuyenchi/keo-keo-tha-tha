import React from "react";

import styles from "./canvas.module.scss";
import clsx from "clsx";
import { NodeComponent } from "@/entity/NodeComponent";
import { TYPE_DROP } from "@/config/TypeComponent";
import { GLOBAL_PROP_CONFIG } from "@/entity/configEntry/GlobalPropConfig";

export interface CanvasProps {
  items: NodeComponent[];
}
export interface NodeDropData {
  type: TYPE_DROP;
  isMoving: boolean;
  node: NodeComponent;
  defaultProps?: GLOBAL_PROP_CONFIG;
}

export const Canvas = ({}: CanvasProps) => {
  return (
    <div className={styles.canvasContainer} style={{ overflow: "auto" }}>
      <div className={clsx(styles.canvasZoomWrapper, "zoom-wrapper")}>
        <div className={clsx(styles.canvasContent, "hide-scrollbar")}></div>
      </div>
    </div>
  );
};
