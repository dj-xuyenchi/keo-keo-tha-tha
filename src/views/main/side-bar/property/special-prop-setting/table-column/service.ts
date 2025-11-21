import { TableColumnValue } from "@/config/defineSpecialProps/define/tableComlumn";
import { TreeDataNode } from "antd";

export const findNodeByKey = (
  nodes: TreeDataNode[],
  key: string
): TableColumnValue | null => {
  for (const node of nodes) {
    if (node.key === key) return node as TableColumnValue;

    if (node.children && node.children.length > 0) {
      const found = findNodeByKey(node.children, key);
      if (found) return found;
    }
  }
  return null;
};
