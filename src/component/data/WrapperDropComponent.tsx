import "@/config/styleOverride.css";
import styles from "./style/wrapperDropComponent.module.scss";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useSelectComponent } from "@/hook/useSelectComponent";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { getSessionCacheValueByKey } from "@/views/main/solution/service";
import { IS_SHOW_BORDER } from "@/config/folder-data/sessionCachingKey";

export interface WrapperDropComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  component: ComponentData | null;
  children: React.ReactNode;
}

export const WrapperDropComponent = ({
  component,
  children,
  style,
  className,
  ...restProps
}: WrapperDropComponentProps) => {
  const selectedComponent = useSelector(
    (state: RootState) => state.canvas.selectedComponent
  );
  const { select } = useSelectComponent();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.error(component);

    e.stopPropagation();
    select(component);
  };
  return (
    <div
      onClick={handleClick}
      className={`${clsx(
        styles.wrapperContainer,
        component && component.id === selectedComponent?.id
          ? "selectedComponent"
          : className
      )}`}
      style={style}
      {...restProps} // truyền các prop khác như onClick, draggable, v.v.
    >
      {children}
    </div>
  );
};
