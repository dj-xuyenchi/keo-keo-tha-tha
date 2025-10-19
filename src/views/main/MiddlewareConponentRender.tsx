import { DATA_TYPE, LAYOUT_TYPE, TYPE_DROP } from "@/config/TypeComponent";
import { NodeComponent } from "@/entity/NodeComponent";
import { ButtonDrop } from "../../component/control/ButtonDrop";
import { useDrag, XYCoord } from "react-dnd";
import { acceptType } from "@/config/acceptType";
import { InputDrop } from "../../component/data/InputDrop";
import { PanelDrop } from "../../component/layout/PanelDrop";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { TableDrop, TablePropsCustom } from "../../component/data/TableDrop";

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
  return <></>;
};
