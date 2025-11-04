import React, { Ref, useEffect, useState } from "react";

import styles from "./sidebar.module.scss";
import { ToolboxOption } from "@/entity/ToolboxOption";
import Image from "next/image";
import { useDrag, useDragLayer } from "react-dnd";
import { acceptType } from "@/config/acceptType";
import { getEmptyImage } from "react-dnd-html5-backend";

type ToolboxOptionPanelProps = {
  listOption: ToolboxOption[];
};

export const ToolboxOptionPanel = ({ listOption }: ToolboxOptionPanelProps) => {
  return (
    <div className={styles.optionContainer}>
      {listOption &&
        listOption.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              type={option.type}
              name={option.name}
              icon={option.icon}
              defaultProps={option.defaultProps}
            />
          );
        })}
    </div>
  );
};

const SidebarItem = ({ type, name, icon, defaultProps }: ToolboxOption) => {
  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: acceptType, // hoặc acceptType của bạn
    item: { type, defaultProps, source: "Sidebar", icon },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // 👉 Ẩn preview mặc định (để dùng custom preview)
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <>
      <div
        ref={dragRef as unknown as Ref<HTMLDivElement> | undefined}
        className={styles.sidebarItem}
      >
        <Image src={`/options/${icon}`} width={24} height={24} alt="icon" />
        <span
          style={{
            marginLeft: "8px",
          }}
        >
          {name}
        </span>
      </div>
    </>
  );
};
