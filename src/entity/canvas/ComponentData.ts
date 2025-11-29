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
  const dfs = (
    node: ComponentData,
    ancestors: ComponentData[]
  ): ComponentData | null => {
    // nếu node là target -> tìm trong ancestors từ gần nhất về xa nhất
    if (node.id === targetId) {
      for (let i = ancestors.length - 1; i >= 0; i--) {
        if (ancestors[i].type === "ROW") return ancestors[i];
      }
      return null;
    }

    // tiếp tục duyệt children với ancestors đã có node hiện tại appended
    if (node.componentChildren && node.componentChildren.length) {
      const nextAncestors = ancestors.concat(node);
      for (const child of node.componentChildren) {
        const found = dfs(child, nextAncestors);
        if (found) return found;
      }
    }

    return null;
  };

  for (const root of tree) {
    const res = dfs(root, []);
    if (res) return res;
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
