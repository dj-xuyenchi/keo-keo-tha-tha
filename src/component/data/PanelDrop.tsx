import { defaultCss } from "@/config/defaultCss";
import styles from "./style/pannel.module.scss";
import { useDrag, useDrop } from "react-dnd";
import { acceptType } from "@/config/sidebar/acceptType";
import { DATA_TYPE, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { useEffect, useRef } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ComponentData } from "@/entity/canvas/ComponentData";

import { v4 as uuidv4 } from "uuid";
import { GenComponent } from "./GenComponent";
import { DropDragItem } from "@/entity/DropDragItem";
import { InlineStyle } from "@/entity/canvas/InlineStyle";
import { margrinBottomKey } from "@/config/defineStyle/styles/margin";
import { buildStyle } from "@/config/defineStyle/styleHTML";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addChildren2Component } from "@/views/main/canvas/service";
import { useDispatch } from "react-redux";
import { setData2Work } from "@/views/main/canvas/canvasSlice";
import { widthKey } from "@/config/defineStyle/styles/width";
import { minHeightKey } from "@/config/defineStyle/styles/height";
import { defaultInputDropObject } from "./InputDrop";
import { useSelectComponent } from "@/hook/useSelectComponent";
import clsx from "clsx";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { defaultRowDropObject } from "./RowDrop";
export interface PanelDropProps {
  index: number;
  movePanel: (fromIndex: string, toIndex: string) => void;
  panel: ComponentData;
}

export const PanelDrop = ({
  panel,
  index,
  movePanel,
  ...restProps
}: PanelDropProps) => {
  const inlineStyle = buildStyle(panel);
  console.info(inlineStyle);

  const canvas = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: acceptType,
      // canDrop: (item: DropDragItem) => {
      //   // Main dữ liệu canvas chính chỉ cho thả panel
      //   return item?.type !== LAYOUT_TYPE.PANEL;
      // },
      hover(item: DropDragItem, monitor) {},
      drop: (item: DropDragItem, monitor) => {
        if (!ref.current) {
          return;
        }
        if (item.type === GENERAL_TYPE.PANEL) {
          movePanel(item.id as string, panel.id);
          return;
        }
        const res = addChildren2Component(
          panel.id,
          buildChildren(item),
          canvas.dataWork
        );
        dispatch(setData2Work(res));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [canvas, panel.id]
  );
  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: acceptType,
      item: {
        type: GENERAL_TYPE.PANEL,
        defaultProps: {},
        source: "Canvas",
        icon: "",
        componentChildren: panel.componentChildren,
        index: index,
        id: panel.id,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [canvas, panel.id]
  );
  dragRef(dropRef(ref));

  const isActive = isOver && canDrop;

  const selectedComponent = useSelector(
    (state: RootState) => state.canvas.selectedComponent
  );
  const { select } = useSelectComponent(); //
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    select(panel);
  };
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`${clsx(
        styles.pannelContainer,
        panel.id && panel.id === selectedComponent?.id && "selectedComponent"
      )}`}
      style={{
        ...inlineStyle,
        ...defaultCss,
        opacity: isDragging ? 0 : 1, // 👈 Ẩn phần tử gốc khi đang kéo
        border: isActive ? "1px dashed #4caf50" : "",
        backgroundColor: isActive ? "#e8f5e9" : isOver ? "#f0f0f0" : "white",
        transition: "background-color 0.2s",
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

const buildChildren = (item: DropDragItem) => {
  switch (item.type) {
    case DATA_TYPE.INPUT: {
      return defaultInputDropObject(item.id as string);
    }
    case GENERAL_TYPE.ROW: {
      return defaultRowDropObject(item.id as string);
    }
  }
  return {
    type: item.type,
    componentChildren: [] as ComponentData[],
  } as ComponentData;
};

export const defaultPanelDropObject = (id: string) => {
  return {
    id: id,
    type: GENERAL_TYPE.PANEL,
    inlineStyle: [
      {
        styleKey: margrinBottomKey,
        value: "12px",
      },
      {
        styleKey: minHeightKey,
        value: "40px",
      },
    ] as InlineStyle[],
    specialProps: [] as PropComponent[],
  } as ComponentData;
};

export const panelIgnoreStyle = [widthKey];
