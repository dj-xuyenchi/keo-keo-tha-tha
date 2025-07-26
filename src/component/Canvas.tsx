import React from "react";
import { useDrop } from "react-dnd";

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
  onDrop: (type: DATA_TYPE | CONTROL_TYPE | LAYOUT_TYPE) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) => {
  const [, dropRef] = useDrop(() => ({
    accept: acceptType,
    drop: (item: { type: DATA_TYPE | CONTROL_TYPE | LAYOUT_TYPE }) => onDrop(item.type),
  }));

  return (
    <div ref={dropRef}>
      <div className={styles.canvasContainer}>
        <div className={clsx(styles.canvasContent, "hide-scrollbar")}>
          {items.map((node) => (
            <div
              key={node.id}
              onClick={() => onSelect(node.id)}
              className={clsx(styles.node, selectedId === node.id && styles.selectedNode)}

            >
              <MiddlewareConponentRender node={node} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
