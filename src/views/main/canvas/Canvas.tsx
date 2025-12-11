import React, { Ref } from "react";

import styles from "./canvas.module.scss";
import clsx from "clsx";
import { NodeComponent } from "@/entity/NodeComponent";
import { TYPE_DROP, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { GLOBAL_PROP_CONFIG } from "@/entity/configEntry/GlobalPropConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDrop } from "react-dnd";
import { acceptType } from "@/config/sidebar/acceptType";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { defaultPanelDropObject, PanelDrop } from "@/component/data/PanelDrop";
import { useDispatch } from "react-redux";
import { pushPanel, setData2Work } from "./canvasSlice";
import { DropDragItem } from "@/entity/DropDragItem";

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
  const canvas = useSelector((state: RootState) => state.canvas);

  const [{ isOver, canDrop, item }, dropRef] = useDrop(() => ({
    accept: acceptType, // 👈 trùng với type của useDrag
    canDrop: (item: DropDragItem) => {
      // Main dữ liệu canvas chính chỉ cho thả panel
      return item?.type === GENERAL_TYPE.PANEL;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(), // 👈 lấy dữ liệu item hiện đang kéo
    }),
    drop: (item: DropDragItem, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      if (!monitor.canDrop()) {
        return;
      }

      if (item.source != "Canvas") {
        dispatch(pushPanel(defaultPanelDropObject(item.id as string)));
      }
    },
  }));

  const movePanel = (fromId: string, toId: string) => {
    const updated = [...canvas.dataWork];

    // 🔍 Tìm index dựa theo id
    const fromIndex = updated.findIndex((p) => p.id === fromId);
    const toIndex = updated.findIndex((p) => p.id === toId);

    // Nếu không tìm thấy thì bỏ qua
    if (fromIndex === -1 || toIndex === -1) {
      return;
    }

    const fromOb = updated[fromIndex];
    const toOb = updated[toIndex];
    updated[fromIndex] = toOb;
    updated[toIndex] = fromOb;

    dispatch(setData2Work(updated));
  };

  const isActive = isOver && canDrop;
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
          {canvas.dataWork.map((panel: ComponentData, index) => {
            return (
              <>
                <PanelDrop
                  key={panel.id}
                  index={index}
                  panel={panel}
                  movePanel={movePanel}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
