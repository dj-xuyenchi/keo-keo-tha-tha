import React from "react";
import { useDrop } from "react-dnd";

type Node = {
  id: string;
  type: string;
  props: Record<string, any>;
};

export const Canvas = ({
  items,
  onDrop,
  onSelect,
  selectedId,
}: {
  items: Node[];
  onDrop: (type: string) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) => {
  const [, dropRef] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item: { type: string }) => onDrop(item.type),
  }));

  return (
    <div
      ref={dropRef}
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      {items.map((node) => (
        <div
          key={node.id}
          onClick={() => onSelect(node.id)}
          style={{
            border:
              node.id === selectedId
                ? "2px solid blue"
                : "1px solid transparent",
            padding: 8,
            margin: 4,
            cursor: "pointer",
            backgroundColor: "#fff",
          }}
        >
          {node.type === "Button" ? (
            <button>{node.props.text}</button>
          ) : (
            <input placeholder={node.props.placeholder} />
          )}
        </div>
      ))}
    </div>
  );
};
