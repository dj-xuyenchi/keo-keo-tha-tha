import React from "react";
import { useDrag } from "react-dnd";

const SidebarItem = ({ type }: { type: string }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "COMPONENT",
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: "1px solid #aaa",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "#f9f9f9",
        cursor: "move",
      }}
    >
      {type}
    </div>
  );
};

export const Sidebar = () => (
  <div
    style={{
      width: 200,
      borderRight: "1px solid #ddd",
      padding: 16,
    }}
  >
    <SidebarItem type="Button" />
    <SidebarItem type="Input" />
  </div>
);
