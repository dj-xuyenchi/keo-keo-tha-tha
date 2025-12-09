import { defaultCss } from "@/config/defaultCss";
import styles from "./style/pannel.module.scss";
import { useDrag, useDrop } from "react-dnd";
import { acceptType } from "@/config/sidebar/acceptType";
import { GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { useEffect, useRef } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ComponentData } from "@/entity/canvas/ComponentData";

import { getMessageInstance } from "@/config/messageContext";
import { v4 as uuidv4 } from "uuid";
import { GenComponent } from "./GenComponent";
import { DropDragItem } from "@/entity/DropDragItem";
import { buildStyle } from "@/config/defineStyle/styleHTML";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import deleteIcon from "../../../public/options/delete.png";
import {
  addChildren2Component,
  removeComponentById,
} from "@/views/main/canvas/service";
import { useDispatch } from "react-redux";
import { setData2Work } from "@/views/main/canvas/canvasSlice";
import { useSelectComponent } from "@/hook/useSelectComponent";
import clsx from "clsx";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { buildChildren } from "@/views/main/canvas/serviceComponent";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
import cloneDeep from "lodash/cloneDeep";
import { Popconfirm } from "antd";
import Image from "next/image";
import { MARGIN_BOTTOM_KEY } from "@/config/defineStyle/styles/margin";
import { MIN_HEIGHT_KEY } from "@/config/defineStyle/styles/height";
import { WIDTH_KEY } from "@/config/defineStyle/styles/width";
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
  const message = getMessageInstance();
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: acceptType,
      hover(item: DropDragItem, monitor) {},
      canDrop: (item: DropDragItem) => {
        // Row chỉ nhận Col khi thả vào
        return (
          item?.type === GENERAL_TYPE.PANEL || item?.type === GENERAL_TYPE.ROW
        );
      },
      drop: (item: DropDragItem, monitor) => {
        if (!ref.current) {
          return;
        }
        if (item.type === GENERAL_TYPE.PANEL) {
          movePanel(item.id as string, panel.id);
          return;
        }
        if (item.type != GENERAL_TYPE.ROW) {
          message.error("Panel chỉ nhận Row!");
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
  const handleConfirmDelete = () => {
    if (panel?.id) {
      let newTree = cloneDeep(canvas.dataWork);
      newTree = removeComponentById(newTree, panel?.id as string);
      // 4. Cập nhật redux
      dispatch(setData2Work(newTree));
    }
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
      <Popconfirm
        title="Xóa component!"
        description="Bạn có chắc muốn xóa component này?"
        okText="Xóa"
        onConfirm={handleConfirmDelete}
        cancelText="Không"
      >
        <Image
          src={deleteIcon}
          width={12}
          height={12}
          alt="icon"
          style={{
            display: panel?.id != selectedComponent?.id ? "none" : undefined,
          }}
          className={styles.deleteBtn}
        />
      </Popconfirm>
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

export const defaultPanelDropObject = (id: string) => {
  return {
    id: id,
    type: GENERAL_TYPE.PANEL,
    inlineStyle: [
      {
        key: MARGIN_BOTTOM_KEY,
        value: "12px",
      },
      {
        key: MIN_HEIGHT_KEY,
        value: "40px",
      },
    ] as StyleHTML[],
    specialProps: [] as PropComponent[],
  } as ComponentData;
};

export const panelIgnoreStyle = [WIDTH_KEY];
