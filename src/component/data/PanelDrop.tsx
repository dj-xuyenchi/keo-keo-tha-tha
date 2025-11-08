import { defaultCss } from "@/config/defaultCss";
import styles from "./style/pannel.module.scss";
import { useDrag, useDrop } from "react-dnd";
import { acceptType } from "@/config/acceptType";
import { LAYOUT_TYPE } from "@/config/TypeComponent";
import { Ref, useEffect, useRef } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ComponentData } from "@/entity/canvas/ComponentData";

import { v4 as uuidv4 } from "uuid";
import { GenComponent } from "./GenComponent";
export interface PanelDropProps {
  panel: ComponentData;
}

export const PanelDrop = ({ panel, ...restProps }: PanelDropProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // 1️⃣ DROP - nhận item thả vào
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: acceptType,
    drop: (item: any, monitor) => {},
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }));
  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: acceptType, // hoặc acceptType của bạn
    item: {
      type: LAYOUT_TYPE.PANEL,
      defaultProps: {},
      source: "Canvas",
      icon: "",
      componentChildren: panel.componentChildren,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  dragRef(dropRef(ref));
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return (
    <div
      ref={ref}
      className={styles.pannelContainer}
      style={{
        ...defaultCss,
      }}
      {...restProps}
    >
      {panel.componentChildren &&
        panel.componentChildren.map((component: ComponentData) => {
          return (
            <>
              <GenComponent type={component.type} />
            </>
          );
        })}
    </div>
  );
};

export const defaultPanelDropObject = () => {
  return {
    id: uuidv4(),
  } as ComponentData;
};
