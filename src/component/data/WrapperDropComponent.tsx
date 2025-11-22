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

export interface WrapperDropComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    WrapperBase {
  component: ComponentData | null;
  children: React.ReactNode;
}
export interface WrapperBase {
  widthDefault?: number;
}

export const WrapperDropComponent = ({
  component,
  children,
  style,
  className,
  widthDefault,
  ...restProps
}: WrapperDropComponentProps) => {
  const selectedComponent = useSelector(
    (state: RootState) => state.canvas.selectedComponent
  );
  const { select } = useSelectComponent();
  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: acceptType,
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
        ...(widthDefault ? { width: widthDefault + 2 } : {}),
      }}
      {...restProps} // truyền các prop khác như onClick, draggable, v.v.
    >
      {children}
    </div>
  );
};
