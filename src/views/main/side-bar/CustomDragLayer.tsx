import { useDragLayer, XYCoord } from "react-dnd";
import { DATA_TYPE, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { InputDrop } from "../../../component/data/InputDrop";
import { TableDrop } from "@/component/data/TableDrop";
import { PanelDrop } from "@/component/data/PanelDrop";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { RowDrop } from "@/component/data/RowDrop";
import { ColForRow } from "@/component/data/ColForRow";
import { TextDrop } from "@/component/data/TextDrop";
import { ButtonDrop } from "@/component/data/ButtonDrop";
import { WIDTH_KEY } from "@/config/defineStyle/styles/width";
import { HEIGHT_KEY, MIN_HEIGHT_KEY } from "@/config/defineStyle/styles/height";
import { CheckBoxDrop } from "@/component/data/CheckBoxDrop";
// Preview của layout (nếu muốn nhẹ hơn, render khung đơn giản)

function getItemStyles(clientOffset?: XYCoord | null) {
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
  id: string;
  type: string;
  source: string;
  icon: string;
  defaultProps: object;
  node: object;
  componentChildren: ComponentData[];
}) {
  // if (item) {
  //   item.source = 'Canvas'
  // }
  // const n = item?.node;
  // if (!n) return null;
  // if (item.source == "Sidebar") {
  //   return (
  //     <Image src={`/options/${item.icon}`} width={24} height={24} alt="icon" />
  //   );
  // }
  switch (item.type) {
    case GENERAL_TYPE.ROW:
      return (
        <RowDrop
          widthDefault={400}
          heightDefault={40}
          row={
            {
              ...(item as unknown as ComponentData),
              inlineStyle: [
                {
                  key: WIDTH_KEY,
                  value: "400px",
                },
                {
                  styleKey: HEIGHT_KEY,
                  value: "100px",
                },
              ],
            } as ComponentData
          }
        />
      );
    case DATA_TYPE.TEXT:
      return (
        <TextDrop
          widthDefault={40}
          heightDefault={20}
          text={
            {
              ...(item as unknown as ComponentData),
            } as ComponentData
          }
        />
      );
    case DATA_TYPE.CHECK_BOX:
      return (
        <CheckBoxDrop
          checkBox={
            {
              ...(item as unknown as ComponentData),
            } as ComponentData
          }
        />
      );
    case GENERAL_TYPE.COL:
      return (
        <ColForRow
          isFromSideBar={true}
          col={item as unknown as ComponentData}
        />
      );
    case GENERAL_TYPE.BUTTON:
      return <ButtonDrop button={item as unknown as ComponentData} />;
    case GENERAL_TYPE.PANEL:
      return (
        <PanelDrop
          panel={
            {
              componentChildren: item.componentChildren,
              inlineStyle: [
                {
                  key: MIN_HEIGHT_KEY,
                  value: "40px",
                },
              ],
            } as ComponentData
          }
          movePanel={() => {}}
          index={0}
        />
      );
    case DATA_TYPE.INPUT:
      return (
        <InputDrop
          widthDefault={240}
          input={item as unknown as ComponentData}
        />
      );
    case DATA_TYPE.TABLE:
      return (
        <TableDrop
          widthDefault={800}
          table={item as unknown as ComponentData}
        />
      );
    default:
      return (
        <div className="rounded border bg-white px-3 py-2 shadow">
          {String(item.type)}
        </div>
      );
  }
}

export function CustomDragLayer() {
  const { isDragging, item, clientOffset } = useDragLayer((monitor) => ({
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
      <div style={getItemStyles(clientOffset)}>
        <div className="drop-shadow rounded-2xl">{renderNodePreview(item)}</div>
      </div>
    </div>
  );
}
