import React, { useEffect, useRef } from "react";
import { useDrop, XYCoord } from "react-dnd";

import styles from "./canvas.module.scss";
import clsx from "clsx";
import { NodeComponent } from "@/entity/NodeComponent";
import { acceptType } from "@/config/acceptType";
import { MiddlewareConponentRender } from "./MiddlewareConponentRender";
import { CONTROL_TYPE, DATA_TYPE, LAYOUT_TYPE, TYPE_DROP } from "@/config/TypeComponent";

export interface CanvasProps {
  items: NodeComponent[];
  onDrop: (type: TYPE_DROP, offset: XYCoord | null) => void;
  onMoveNode: (node: NodeComponent, offset: XYCoord | null) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}
export interface NodeDropData {
  type: TYPE_DROP;
  isMoving: boolean;
  node: NodeComponent
}

export const Canvas = ({
  items,
  onDrop,
  onMoveNode,
  onSelect,
  selectedId,
}: CanvasProps
) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop(() => ({
    accept: acceptType,
    drop: (item: NodeDropData, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();

      if (clientOffset && canvasRect) {
        const relativeX = clientOffset.x - canvasRect.left;
        const relativeY = clientOffset.y - canvasRect.top;

        onDrop(item.type, { x: relativeX, y: relativeY });

      }
    },
  }));

  useEffect(() => {
    if (canvasRef.current) {
      drop(canvasRef.current);
    }
  }, [drop]);


  return (
    <div >
      <div className={styles.canvasContainer} >
        <div className={clsx(styles.canvasContent, "hide-scrollbar")} ref={canvasRef}>
          {items.map((node) => (
            <div
              key={node.id}
              onClick={() => onSelect(node.id)}
              className={clsx(styles.node, selectedId === node.id && styles.selectedNode)}
              style={{
                top: node.top,
                left: node.left
              }}
            >
              <MiddlewareConponentRender onMoveNode={onMoveNode} node={node} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
