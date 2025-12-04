import "@/config/styleOverride.css";
import styles from "./style/wrapperDropComponent.module.scss";
import React, { Ref, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useSelectComponent } from "@/hook/useSelectComponent";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { useDrag } from "react-dnd";
import { acceptType } from "@/config/sidebar/acceptType";
import { getEmptyImage } from "react-dnd-html5-backend";
import { GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import deleteIcon from "../../../public/options/delete.png";
import Image from "next/image";
import { Popconfirm } from "antd";
import cloneDeep from "lodash/cloneDeep";
import { removeComponentById } from "@/views/main/canvas/service";
import { setData2Work } from "@/views/main/canvas/canvasSlice";
import { useDispatch } from "react-redux";

export interface WrapperDropComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
  WrapperBase {
  component: ComponentData | null;
  children?: React.ReactNode;
}
export interface WrapperBase {
  widthDefault?: number;
  heightDefault?: number;
}

export const WrapperDropComponent = ({
  component,
  children,
  style,
  className,
  widthDefault,
  heightDefault,
  ...restProps
}: WrapperDropComponentProps) => {
  const selectedComponent = useSelector(
    (state: RootState) => state.canvas.selectedComponent
  );
  const canvas = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();
  const { select } = useSelectComponent();
  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: acceptType,
      canDrag: () => {
        return (
          component?.type !== GENERAL_TYPE.COL &&
          component?.type !== GENERAL_TYPE.ROW
        );
      },
      item: {
        ...component,
        type: component?.type,
        defaultProps: {},
        source: "Canvas",
        icon: "",
        componentChildren: [],
        index: component?.id,
        id: component?.id,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    select(component);
  };
  const handleConfirmDelete = () => {
    if (component?.id) {
      let newTree = cloneDeep(canvas.dataWork);
      newTree = removeComponentById(newTree, component?.id as string);
      // 4. Cập nhật redux
      dispatch(setData2Work(newTree));
    }
  };
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div
      ref={dragRef as unknown as Ref<HTMLDivElement> | undefined}
      onClick={handleClick}
      className={`${clsx(
        styles.wrapperContainer,
        component && component.id && component.id === selectedComponent?.id
          ? "selectedComponent"
          : className
      )}`}
      style={{
        ...style,
        ...(isDragging && { opacity: 0 }),
        ...(widthDefault ? { width: widthDefault + 2 } : {}),
        ...(heightDefault ? { height: heightDefault } : {}),
      }}
      {...restProps} // truyền các prop khác như onClick, draggable, v.v.
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
            display:
              component?.id != selectedComponent?.id ? "none" : undefined,
          }}
          className={styles.deleteBtn}
        />
      </Popconfirm>
      {children}
    </div>
  );
};
