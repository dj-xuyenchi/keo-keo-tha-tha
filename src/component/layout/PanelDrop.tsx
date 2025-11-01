import { useEffect, useRef } from "react";
import styles from "./style/panel.module.scss";
import { useDrop, XYCoord } from "react-dnd";
import { NodeDropData } from "../../views/main/canvas/Canvas";
import { acceptType } from "@/config/acceptType";
import { NodeComponent } from "@/entity/NodeComponent";
import { MiddlewareConponentRender } from "../../views/main/MiddlewareConponentRender";
import clsx from "clsx";
import { TYPE_DROP } from "@/config/TypeComponent";

export interface PanelDropProps {
  node: NodeComponent;
  onDrop: (type: TYPE_DROP, offset: XYCoord | null) => void;
  onMoveNode: (node: NodeComponent) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
  onPutNode2Node: (
    nodeTarget: NodeComponent,
    nodeSource: NodeComponent
  ) => void;
}

export const PanelDrop = ({
  node,
  onDrop,
  onMoveNode,
  onSelect,
  onPutNode2Node,
  selectedId,
}: PanelDropProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop(() => ({
    accept: acceptType,
    drop: (item: NodeDropData, monitor) => {
      const sourceClientOffset = monitor.getSourceClientOffset();

      const clientOffset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();

      if (clientOffset && canvasRect && sourceClientOffset) {
        const relativeX = sourceClientOffset.x - canvasRect.left;
        const relativeY = sourceClientOffset.y - canvasRect.top;

        // if (item.isMoving) {
        //   onMoveNode(item.node)
        // }
        // onDrop(item.type, { x: relativeX, y: relativeY });
      }
    },
  }));
  useEffect(() => {
    if (canvasRef.current) {
      drop(canvasRef.current);
    }
  }, [drop]);
  return (
    <>
      <div className={styles.panel}>
        {node.props?.children?.map((node) => (
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
    </>
  );
};
