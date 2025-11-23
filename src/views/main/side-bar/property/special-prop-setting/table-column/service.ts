import { TableColumnValue } from "@/config/defineSpecialProps/define/table/tableComlumn";
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

export const deleteColRecursive = (
  cols: TableColumnValue[],
  keyToDelete: string
) => {
  return cols
    .map((col) => ({ ...col })) // clone tránh mutate
    .filter((col) => col.key !== keyToDelete) // xoá ở cấp này
    .map((col) => {
      if (col.children && col.children.length > 0) {
        col.children = deleteColRecursive(col.children, keyToDelete);
      }
      return col;
    });
};
