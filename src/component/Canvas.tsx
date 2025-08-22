import React, { useEffect, useRef } from "react";
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
  const canvasRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop(() => ({
    accept: acceptType,
    drop: (item: NodeDropData, monitor) => {
      const sourceClientOffset = monitor.getSourceClientOffset();
      console.error(item);

      const clientOffset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();

      if (clientOffset && canvasRect && sourceClientOffset) {
        const relativeX = sourceClientOffset.x - canvasRect.left;
        const relativeY = sourceClientOffset.y - canvasRect.top;

        if (item.isMoving) {
          onMoveNode(item.node);
        }
        item.defaultProps = getDefaultProps(item);
        console.error(item);

        onDrop(item, { x: relativeX, y: relativeY });
      }
    },
  }));

  useEffect(() => {
    if (canvasRef.current) {
      drop(canvasRef.current);
    }
  }, [drop]);

  return (
    <div>
      <div className={styles.canvasContainer}>
        <div
          className={clsx(styles.canvasContent, "hide-scrollbar")}
          ref={canvasRef}
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
