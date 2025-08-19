import React from "react";
import { useDragLayer, XYCoord } from "react-dnd";
import { DATA_TYPE, LAYOUT_TYPE } from "@/config/TypeComponent";
import { ButtonDrop } from "./control/ButtonDrop";
import { InputDrop } from "./data/InputDrop";
import { PanelDrop } from "./layout/PanelDrop";
// Preview của layout (nếu muốn nhẹ hơn, render khung đơn giản)

function getItemStyles(
  clientOffset?: XYCoord | null,
  sourceClientOffset?: XYCoord | null,
  initialClientOffset?: XYCoord | null,
  initialSourceClientOffset?: XYCoord | null
) {
  // Ưu tiên dùng sourceClientOffset nếu có (đã bù chính xác)
  if (sourceClientOffset) {
    const { x, y } = sourceClientOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return { transform, WebkitTransform: transform };
  }

  // Fallback: tự bù offset điểm bấm
  if (!clientOffset || !initialClientOffset || !initialSourceClientOffset)
    return { display: "none" };

  const dx = initialClientOffset.x - initialSourceClientOffset.x;
  const dy = initialClientOffset.y - initialSourceClientOffset.y;

  const x = clientOffset.x - dx;
  const y = clientOffset.y - dy;

  const transform = `translate(${x}px, ${y}px)`;
  return { transform, WebkitTransform: transform };
}

// Tùy biến cách render node trong preview
function renderNodePreview(item: any) {
  const n = item?.node;
  if (!n) return null;

  switch (n.type) {
    case DATA_TYPE.BUTTON:
      return <ButtonDrop />;
    case DATA_TYPE.INPUT:
      return <InputDrop />;
    case LAYOUT_TYPE.PANEL:
    default:
      return (
        <div className="rounded border bg-white px-3 py-2 shadow">
          {String(n.type)}
        </div>
      );
  }
}

export function CustomDragLayer() {
  const {
    isDragging,
    item,
    clientOffset,
    sourceClientOffset, // 👈 lấy top-left hiện tại của source
    initialClientOffset,
    initialSourceClientOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    clientOffset: monitor.getClientOffset(),
    sourceClientOffset: monitor.getSourceClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
    initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
  }));

  if (!isDragging) return null;

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <div
        style={getItemStyles(
          clientOffset,
          sourceClientOffset,
          initialClientOffset,
          initialSourceClientOffset
        )}
      >
        <div className="drop-shadow rounded-2xl">{renderNodePreview(item)}</div>
      </div>
    </div>
  );
}
