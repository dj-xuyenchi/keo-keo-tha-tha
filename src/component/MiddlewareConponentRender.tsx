import { DATA_TYPE } from "@/config/TypeComponent";
import { NodeComponent } from "@/entity/NodeComponent";
import { ButtonDrop } from "./control/ButtonDrop";

export const MiddlewareConponentRender = ({ node }: { node: NodeComponent }) => {
    return <>
        {node.type === DATA_TYPE.BUTTON && <ButtonDrop  />}
    </>
        ;
};
