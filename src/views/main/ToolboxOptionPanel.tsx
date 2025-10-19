import React, { useState } from "react";

import styles from "./sidebar.module.scss";
import { ToolboxOption } from "@/entity/ToolboxOption";
import Image from "next/image";
import { useDrag } from "react-dnd";
import { acceptType } from "@/config/acceptType";

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
  const [, dragRef] = useDrag(() => ({
    type: acceptType,
    item: { type, defaultProps },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return <></>;
};
