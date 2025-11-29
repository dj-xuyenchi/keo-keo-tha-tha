import { GENERAL_TYPE, TYPE_DROP } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "../sidebar/PropComponent";
import { TreeDataNode } from "antd";
import { getComponentIcon } from "@/views/main/solution/service";
import { StyleHTML } from "./StyleHTML";

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
  inlineStyle: StyleHTML[];

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

export const findParentRowById = (
  tree: ComponentData[],
  targetId: string
): ComponentData | null => {
  function dfs(
    node: ComponentData,
    parent: ComponentData | null
  ): ComponentData | null {
    // Nếu tìm thấy node
    if (node.id === targetId) {
      // Trả về cha nếu cha là ROW
      if (parent && parent.type === GENERAL_TYPE.ROW) {
        return parent;
      }
      return null;
    }
    if (!node.componentChildren || node.componentChildren.length === 0) {
      return null;
    }
    // Duyệt children
    for (const child of node.componentChildren) {
      const result = dfs(child, node);
      if (result) {
        return result;
      }
    }

    return null;
  }

  for (const root of tree) {
    const found = dfs(root, null);
    if (found) {
      return found;
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
