import { DATA_TYPE, LAYOUT_TYPE, TYPE_DROP } from "@/config/TypeComponent";
import { NodeComponent } from "@/entity/NodeComponent";
import { ButtonDrop } from "./control/ButtonDrop";
import { useDrag, XYCoord } from "react-dnd";
import { acceptType } from "@/config/acceptType";
import { InputDrop } from "./data/InputDrop";
import { PanelDrop } from "./layout/PanelDrop";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { TableDrop, TablePropsCustom } from "./data/TableDrop";

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
  
  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
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
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return (
    <>
      <div
        ref={dragRef}
        onDragEnd={() => {}}
        style={{ opacity: isDragging ? 0.35 : 1, transition: "opacity 120ms" }}
      >
        {node.type === DATA_TYPE.BUTTON && <ButtonDrop />}
        {node.type === DATA_TYPE.INPUT && <InputDrop />}
        {node.type === DATA_TYPE.TABLE && <TableDrop {...node.showingProps} />}
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
