import { DATA_TYPE, LAYOUT_TYPE, TYPE_DROP } from "@/config/TypeComponent";
import { NodeComponent } from "@/entity/NodeComponent";
import { ButtonDrop } from "./control/ButtonDrop";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { acceptType } from "@/config/acceptType";
import { InputDrop } from "./data/InputDrop";
import { PanelDrop } from "./layout/PanelDrop";

export interface MiddlewareConponentRenderProps {
  node: NodeComponent;
  onDrop: (type: TYPE_DROP, offset: XYCoord | null) => void;
  onSelect: (id: string) => void;
  onMoveNode: (node: NodeComponent) => void;
  onPutNode2Node: (
    nodeTarget: NodeComponent,
    nodeSource: NodeComponent
  ) => void;
  selectedId: string | null;
}

export const MiddlewareConponentRender = ({
  node,
  onDrop,
  onMoveNode,
  onSelect,
  selectedId,
  onPutNode2Node,
}: MiddlewareConponentRenderProps) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: acceptType,
    item: {
      type: node.type,
      node: node,
      isMoving: true,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div
        ref={dragRef}
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("component-type", node.type as string);
          e.dataTransfer.setData("node-data", JSON.stringify(node));
          e.dataTransfer.setData("isMoving", JSON.stringify(true));
        }}
        onDragEnd={() => {}}
      >
        {node.type === DATA_TYPE.BUTTON && <ButtonDrop />}
        {node.type === DATA_TYPE.INPUT && <InputDrop />}
        {node.type === LAYOUT_TYPE.PANEL && (
          <PanelDrop
            onDrop={onDrop}
            onMoveNode={onMoveNode}
            onSelect={onSelect}
            selectedId={selectedId}
            node={node}
            onPutNode2Node={onPutNode2Node}
          />
        )}
      </div>
    </>
  );
};
