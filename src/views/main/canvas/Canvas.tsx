import React, { Ref } from "react";

import styles from "./canvas.module.scss";
import clsx from "clsx";
import { NodeComponent } from "@/entity/NodeComponent";
import { LAYOUT_TYPE, TYPE_DROP } from "@/config/TypeComponent";
import { GLOBAL_PROP_CONFIG } from "@/entity/configEntry/GlobalPropConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDrop } from "react-dnd";
import { acceptType } from "@/config/acceptType";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { defaultPanelDropObject, PanelDrop } from "@/component/data/PanelDrop";
import { useDispatch } from "react-redux";
import { pushPanel } from "./canvasSlice";

export interface CanvasProps {
  items: NodeComponent[];
}
export interface NodeDropData {
  type: TYPE_DROP;
  isMoving: boolean;
  node: NodeComponent;
  defaultProps?: GLOBAL_PROP_CONFIG;
}

export const Canvas = () => {
  const dispatch = useDispatch();
  const [{ isOver, canDrop, item }, dropRef] = useDrop(() => ({
    accept: acceptType, // 👈 trùng với type của useDrag
    canDrop: (item: { type: string }) => {
      // Main dữ liệu canvas chính chỉ cho thả panel
      return item?.type === LAYOUT_TYPE.PANEL;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(), // 👈 lấy dữ liệu item hiện đang kéo
    }),
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      if (!monitor.canDrop()) {
        return;
      }
      dispatch(pushPanel(defaultPanelDropObject()));
    },
  }));
  const isActive = isOver && canDrop;
  const canvas = useSelector((state: RootState) => state.canvas);
  return (
    <div className={styles.canvasContainer} style={{ overflow: "auto" }}>
      <div className={clsx(styles.canvasZoomWrapper, "zoom-wrapper")}>
        <div
          className={clsx(styles.canvasContent, "hide-scrollbar")}
          ref={dropRef as unknown as Ref<HTMLDivElement> | undefined}
          style={{
            minHeight: "300px",
            border: isActive ? "1px dashed #4caf50" : "",
            backgroundColor: isActive
              ? "#e8f5e9"
              : isOver
              ? "#f0f0f0"
              : "white",
            transition: "background-color 0.2s",
            padding: "10px",
          }}
        >
          {canvas.dataWork.map((component: ComponentData) => {
            return (
              <>
                <PanelDrop panel={component} />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
