import React from "react";
import { useDragLayer, XYCoord } from "react-dnd";
import { DATA_TYPE, LAYOUT_TYPE } from "@/config/TypeComponent";
import { ButtonDrop } from "../../../component/control/ButtonDrop";
import { InputDrop } from "../../../component/data/InputDrop";
import { Image } from "antd";
import { TableDrop } from "@/component/data/TableDrop";
import { PanelDrop } from "@/component/data/PanelDrop";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { RowDrop } from "@/component/data/RowDrop";
import { widthKey } from "@/config/defineStyle/styles/width";
import { heightKey, minHeightKey } from "@/config/defineStyle/styles/height";
// Preview của layout (nếu muốn nhẹ hơn, render khung đơn giản)

function getItemStyles(
  clientOffset?: XYCoord | null,
  sourceClientOffset?: XYCoord | null,
  initialClientOffset?: XYCoord | null,
  initialSourceClientOffset?: XYCoord | null,
  isSidebar?: boolean
) {
  if (clientOffset) {
    const { x, y } = clientOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
      // để icon nằm chính giữa trỏ chuột (tùy kích thước icon)
      marginLeft: "-12px",
      marginTop: "-12px",
    };
  }
}

// Tùy biến cách render node trong preview
function renderNodePreview(item: {
  id: string,
  type: string;
  source: string;
  icon: string;
  defaultProps: object;
  node: object;
  componentChildren: ComponentData[];
}) {
  // const n = item?.node;
  // if (!n) return null;
  // if (item.source == "Sidebar") {
  //   return (
  //     <Image src={`/options/${item.icon}`} width={24} height={24} alt="icon" />
  //   );
  // }
  if (item.source === "Canvas") {

    return (
      <PanelDrop
        panel={
          {
            componentChildren: item.componentChildren,
          } as ComponentData
        }
        movePanel={() => { }}
        index={0}
      />
    );
  }
  switch (item.type) {
    case LAYOUT_TYPE.ROW:
      return (
        <RowDrop
          row={
            {
              componentChildren: item.componentChildren,
              inlineStyle: [{
                styleKey: widthKey,
                value: "400px",
              }, {
                styleKey: heightKey,
                value: "100px",
              },]
            } as ComponentData}
          moveRow={() => { }}
          index={0}
        />
      );
    case LAYOUT_TYPE.PANEL:
      return (
        <PanelDrop
          panel={
            {
              componentChildren: [] as ComponentData[],
              inlineStyle: [{
                styleKey: minHeightKey,
                value: "40px",
              }]
            } as ComponentData
          }
          movePanel={() => { }}
          index={0}
        />
      );
    // case DATA_TYPE.TABLE:
    //   return <TableDrop />;
    case DATA_TYPE.INPUT:
      return <InputDrop input={{ id: item.id } as ComponentData} />;

    default:
      return (
        <div className="rounded border bg-white px-3 py-2 shadow">
          {String(item.type)}
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
          initialSourceClientOffset,
          item?.source === "Sidebar"
        )}
      >
        <div className="drop-shadow rounded-2xl">{renderNodePreview(item)}</div>
      </div>
    </div>
  );
}
