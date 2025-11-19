import { TreeDataNode } from "antd";

export const findNodeByKey = (
  nodes: TreeDataNode[],
  key: string
): TreeDataNode | null => {
  for (const node of nodes) {
    if (node.key === key) return node;

    if (node.children && node.children.length > 0) {
      const found = findNodeByKey(node.children, key);
      if (found) return found;
    }
  }
  return null;
};
