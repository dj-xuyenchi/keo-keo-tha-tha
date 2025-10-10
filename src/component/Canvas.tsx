import React, { useEffect, useRef, useState } from "react";
import { useDrop, XYCoord } from "react-dnd";

import styles from "./canvas.module.scss";
import clsx from "clsx";
import { NodeComponent } from "@/entity/NodeComponent";
import { acceptType } from "@/config/acceptType";
import { MiddlewareConponentRender } from "./MiddlewareConponentRender";
import { TYPE_DROP } from "@/config/TypeComponent";
import {
  getDefaultProps,
  GLOBAL_PROP_CONFIG,
} from "@/entity/configEntry/GlobalPropConfig";

export interface CanvasProps {
  items: NodeComponent[];
  onDrop: (node: NodeDropData, offset: XYCoord | null) => void;
  onMoveNode: (node: NodeComponent) => void;
  onSelect: (id: string) => void;
  onPutNode2Node: (
    nodeTarget: NodeComponent,
    nodeSource: NodeComponent
  ) => void;
  selectedId: string | null;
}
export interface NodeDropData {
  type: TYPE_DROP;
  isMoving: boolean;
  node: NodeComponent;
  defaultProps?: GLOBAL_PROP_CONFIG;
}

export const Canvas = ({
  items,
  onDrop,
  onMoveNode,
  onSelect,
  onPutNode2Node,
  selectedId,
}: CanvasProps) => {
  const [scale, setScale] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const zoomWrapperRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: acceptType,
    drop: (item: NodeDropData, monitor) => {
      const sourceClientOffset = monitor.getSourceClientOffset();
      const clientOffset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();

      if (clientOffset && canvasRect && sourceClientOffset) {
        const relativeX = sourceClientOffset.x - canvasRect.left;
        const relativeY = sourceClientOffset.y - canvasRect.top;

        if (item.isMoving) {
          onMoveNode(item.node);
        }
        item.defaultProps = getDefaultProps(item);

        onDrop(item, { x: relativeX, y: relativeY });
      }
    },
  }));

  useEffect(() => {
    if (canvasRef.current) {
      drop(canvasRef.current);
    }
  }, [drop]);

  // 🧭 Zoom logic
  useEffect(() => {
    const el = zoomWrapperRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      setScale((prev) => {
        let next = prev + (e.deltaY < 0 ? 0.1 : -0.1);
        if (next < 0.5) next = 0.5;
        if (next > 3) next = 3;
        return next;
      });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // 🧩 Cập nhật transform và kích thước
  useEffect(() => {
    const wrapper = zoomWrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    // Lấy kích thước thật của canvasContent
    const rect = canvas.getBoundingClientRect();
    wrapper.style.transform = `scale(${scale})`;
    wrapper.style.transformOrigin = "0 0";

    // Tính lại vùng chứa theo scale để có scroll
    wrapper.style.width = `${rect.width * scale}px`;
    wrapper.style.height = `${rect.height * scale}px`;
  }, [scale, items.length]);

  return (
    <div className={styles.canvasContainer} style={{ overflow: "auto" }}>
      <div
        ref={zoomWrapperRef}
        className={clsx(styles.canvasZoomWrapper, "zoom-wrapper")}
      >
        <div
          ref={canvasRef}
          className={clsx(styles.canvasContent, "hide-scrollbar")}
        >
          {items.map((node) => (
            <div
              key={node.id}
              onClick={() => onSelect(node.id)}
              className={clsx(
                styles.node,
                selectedId === node.id && styles.selectedNode
              )}
              style={{
                top: node.top,
                left: node.left,
              }}
            >
              <MiddlewareConponentRender
                onDrop={onDrop}
                onSelect={onSelect}
                selectedId={selectedId}
                onPutNode2Node={onPutNode2Node}
                onMoveNode={onMoveNode}
                node={node}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
