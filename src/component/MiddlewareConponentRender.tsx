import { DATA_TYPE } from "@/config/TypeComponent";
import { NodeComponent } from "@/entity/NodeComponent";
import { ButtonDrop } from "./control/ButtonDrop";
import { useDrag, XYCoord } from "react-dnd";
import { acceptType } from "@/config/acceptType";

export interface MiddlewareConponentRenderProps {
    node: NodeComponent;
    onMoveNode: (node: NodeComponent, offset: XYCoord | null) => void;
}

export const MiddlewareConponentRender = ({ node }: MiddlewareConponentRenderProps) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: acceptType,
        item: { type: "BUTTON" },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    return <>
        <div
            ref={dragRef}
            draggable={true}
            onDragStart={(e) => {
                e.dataTransfer.setData("component-type", "BUTTON");
                e.dataTransfer.setData("node-data", JSON.stringify(node));
                e.dataTransfer.setData("isMoving", JSON.stringify(true));
            }}
            onDragEnd={() => {

            }}
        >
            {node.type === DATA_TYPE.BUTTON && <ButtonDrop />}
        </div>
    </>
        ;
};
