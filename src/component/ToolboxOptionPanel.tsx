import React from "react";

import styles from "./sidebar.module.scss";
import { ToolboxOption } from "@/entity/ToolboxOption";
import Image from "next/image";
import { useDrag } from "react-dnd";
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
            />
          );
        })}
    </div>
  );
};

const SidebarItem = ({ type, name, icon }: ToolboxOption) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "COMPONENT",
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={styles.option}
      ref={dragRef}
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData("component-type", "Button");
      }}
    >
      <div className={styles.icon}>
        <Image alt="option" height={14} width={14} src={`/options/${icon}`} />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};
