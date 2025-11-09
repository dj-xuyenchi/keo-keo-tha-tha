import { defaultCss } from "@/config/defaultCss";
import styles from "./style/pannel.module.scss";
import { useDrag, useDrop } from "react-dnd";
import { acceptType } from "@/config/acceptType";
import { LAYOUT_TYPE } from "@/config/TypeComponent";
import { useEffect, useRef } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ComponentData } from "@/entity/canvas/ComponentData";

import { v4 as uuidv4 } from "uuid";
import { GenComponent } from "./GenComponent";
import { DropDragItem } from "@/entity/DropDragItem";
import { InlineStyle } from "@/entity/canvas/InlineStyle";
import { margrinBottomKey } from "@/config/defineStyle/styles/margin";
import { buildStyle } from "@/config/defineStyle/styleHTML";
export interface PanelDropProps {
  index: number;
  movePanel: (fromIndex: number, toIndex: number) => void;
  panel: ComponentData;
}

export const PanelDrop = ({
  panel,
  index,
  movePanel,
  ...restProps
}: PanelDropProps) => {
  const inlineStyle = buildStyle(panel.inlineStyle);
  console.info(inlineStyle);

  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: acceptType,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const rect = ref.current.getBoundingClientRect();
      const middleY = (rect.bottom - rect.top) / 2;
      const clientY = monitor.getClientOffset()?.y ?? 0;

      // Nếu kéo qua nửa trên hoặc nửa dưới panel khác thì swap
      if (dragIndex < hoverIndex && clientY < rect.top + middleY) return;
      if (dragIndex > hoverIndex && clientY > rect.top + middleY) return;

      movePanel(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop: (item: DropDragItem, monitor) => {
      console.error(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }));
  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: acceptType,
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
  console.error(panel);
  
  return (
    <div
      ref={ref}
      className={styles.pannelContainer}
      style={{
        ...inlineStyle,
        ...defaultCss,
        opacity: isDragging ? 0 : 1, // 👈 Ẩn phần tử gốc khi đang kéo
      }}
      {...restProps}
    >
      
      {panel.componentChildren &&
        panel.componentChildren.map((component: ComponentData) => {
          return (
            <>
              <GenComponent key={component.id} component={component} />
            </>
          );
        })}
    </div>
  );
};

export const defaultPanelDropObject = () => {
  return {
    id: uuidv4(),
    inlineStyle: [
      {
        styleKey: margrinBottomKey,
        value: "12px",
      },
    ] as InlineStyle[],
  } as ComponentData;
};
