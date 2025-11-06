import { defaultCss } from "@/config/defaultCss";
import styles from "./style/pannel.module.scss";
import { Collapse } from "antd";
import { useDrag, useDrop } from "react-dnd";
import { acceptType } from "@/config/acceptType";
import { LAYOUT_TYPE } from "@/config/TypeComponent";
import { Ref, useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { InputDrop } from "./InputDrop";

import { v4 as uuidv4 } from "uuid";
export interface PanelDropProps {
  panel: ComponentData;
}

export const PanelDrop = ({ panel, ...restProps }: PanelDropProps) => {
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
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return (
    <div
      ref={dragRef as unknown as Ref<HTMLDivElement> | undefined}
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
              <InputDrop />
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
