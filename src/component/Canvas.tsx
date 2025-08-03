import React, { useEffect, useRef } from "react";
import { useDrop, XYCoord } from "react-dnd";

import styles from "./canvas.module.scss";
import clsx from "clsx";
import { NodeComponent } from "@/entity/NodeComponent";
import { acceptType } from "@/config/acceptType";
import { MiddlewareConponentRender } from "./MiddlewareConponentRender";
import { CONTROL_TYPE, DATA_TYPE, LAYOUT_TYPE } from "@/config/TypeComponent";

export const Canvas = ({
  items,
  onDrop,
  onSelect,
  selectedId,
}: {
  items: NodeComponent[];
  onDrop: (type: DATA_TYPE | CONTROL_TYPE | LAYOUT_TYPE, offset: XYCoord | null) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop(() => ({
    accept: acceptType,
    drop: (item: { type: DATA_TYPE | CONTROL_TYPE | LAYOUT_TYPE }, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();

      if (clientOffset && canvasRect) {
        const relativeX = clientOffset.x - canvasRect.left;
        const relativeY = clientOffset.y - canvasRect.top;

        console.log("📍 Relative drop at:", relativeX, relativeY);

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
              <MiddlewareConponentRender node={node} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
