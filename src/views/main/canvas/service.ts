import { ComponentData } from "@/entity/canvas/ComponentData";
import { v4 as uuidv4 } from "uuid";

/**
 * Thêm một node con vào component có id = componentId trong cây componentDataWork
 * @param componentId id của component cha
 * @param children node con cần thêm
 * @param componentDataWork cây component
 * @returns cây component mới (copy, không mutate)
 */
export const addChildren2Component = (componentId: string, children: ComponentData, componentDataWork: ComponentData[]): ComponentData[] => {
    const newChildren = { ...children, id: uuidv4() };
    const addRecursively = (nodes: ComponentData[]): ComponentData[] => {
        return nodes.map((node) => {
            if (node.id === componentId) {
                // ✅ Thêm vào component cha
                const updatedChildren = [...(node.componentChildren || []), newChildren];
                return {
                    ...node,
                    componentChildren: updatedChildren,
                };
            }

            // ✅ Nếu node có con thì đệ quy tiếp
            if (node.componentChildren && node.componentChildren.length > 0) {
                return {
                    ...node,
                    componentChildren: addRecursively(node.componentChildren),
                };
            }

            return node;
        });

    }
    const res = addRecursively(componentDataWork)
    return res
}