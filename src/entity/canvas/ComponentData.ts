import { TYPE_DROP } from "@/config/sidebar/TypeComponent";
import { InlineStyle } from "./InlineStyle";
import { PropComponent } from "../sidebar/PropComponent";
import { TreeDataNode } from "antd";
import { getComponentIcon } from "@/views/main/solution/service";

export interface ComponentData {
  id: string;
  type: TYPE_DROP;

  // Can thiệp sâu -> class
  classes: string[];
  // Sự kiện
  events: [];

  // Setting binding data
  bindingProps: PropComponent[];
  // Setting thuộc tính đặc thù
  specialProps: PropComponent[];
  // Style CSS
  inlineStyle: InlineStyle[];

  componentChildren: ComponentData[];
}

export const findComponentById = (
  nodes: ComponentData[],
  id: string
): ComponentData | null => {
  for (const node of nodes) {
    if (node.id === id) {
      return node; // trả về **tham chiếu gốc**
    }
    if (node.componentChildren?.length) {
      const found = findComponentById(node.componentChildren, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};
export const convertToTreeNode = (node: ComponentData): TreeDataNode => {
  return {
    title: node.type, // hoặc dùng node.id nếu bạn muốn
    key: node.id,
    icon: getComponentIcon(node.type),
    children: node.componentChildren?.map(convertToTreeNode) || [],
  } as TreeDataNode;
};
