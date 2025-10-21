import { TYPE_DROP } from "@/config/TypeComponent";
import { NodeComponent } from "@/entity/NodeComponent";
import { useDrag, XYCoord } from "react-dnd";
import { acceptType } from "@/config/acceptType";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";

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
