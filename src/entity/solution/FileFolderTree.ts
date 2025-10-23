import { IconFileFolder } from "./../../component/icon-foulder/IconFileFolder";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TreeDataNode } from "antd";
import React, { ReactNode } from "react";

export interface FileFolderTree extends TreeDataNode {
  isOpen: boolean;
  isRoot: boolean;
  fileType: TypeFileFolder;
  title: string;
  key: string;
  icon: string | ReactNode;
  children: FileFolderTree[];
  isLeaf: boolean;
}

export type TypeFileFolder =
  | "folder"
  | "typescript"
  | "react"
  | "css"
  | "sass"
  | "react";
// 2️⃣ Hàm đệ quy để duyệt qua toàn bộ cây
export const transformTreeIcons = (node: FileFolderTree): FileFolderTree => {
  return {
    ...node,
    isLeaf: node.fileType != "folder",
    icon:
      node.icon && typeof node.icon === "string"
        ? mapIcon(node.icon)
        : node.icon,
    children: node.children?.map(transformTreeIcons) ?? [],
  };
};

// 3️⃣ Nếu dữ liệu là mảng (nhiều root nodes)
export const transformTreeListIcons = (
  treeList: FileFolderTree[]
): FileFolderTree[] => {
  return treeList.map(transformTreeIcons);
};

const mapIcon = (icon: string) => {
  return React.createElement(IconFileFolder, {
    icon: icon || "folder1",
    height: 20,
    width: 20,
  });
};
export const getAllKeys = (nodes: FileFolderTree[]): string[] => {
  let keys: string[] = [];
  for (const node of nodes) {
    keys.push(node.key);
    if (node.children) {
      keys = keys.concat(getAllKeys(node.children));
    }
  }
  return keys;
};

export const toJSONData = (input: FileFolderTree[]): string => {
  const buildTree = (nodes: FileFolderTree[]): any[] =>
    nodes.map(({ fileType, title, key, icon, children, isLeaf }) => ({
      fileType,
      title,
      key,
      icon: fileType != "folder" ? fileType : null,
      isLeaf,
      children: children ? buildTree(children) : [],
    }));

  return JSON.stringify(buildTree(input));
};
export const addChildToNode = (
  nodes: FileFolderTree[],
  parentKey: string,
  newChild: FileFolderTree
): FileFolderTree[] => {
  return nodes.map((node) => {
    if (node.key === parentKey) {
      // thêm vào node.children
      return {
        ...node,
        children: [...(node.children || []), newChild],
      };
    }

    // nếu có children, đệ quy tiếp
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: addChildToNode(node.children, parentKey, newChild),
      };
    }

    return node;
  });
};

/**
 * Tìm node trong cây file/folder theo key
 * @param nodes  - danh sách các node gốc
 * @param key    - key cần tìm
 * @returns      - node tìm thấy hoặc undefined nếu không có
 */
export const findNodeFromTreeFileFolder = (
  nodes: FileFolderTree[],
  key: string
): FileFolderTree | null => {
  for (const node of nodes) {
    if (node.key === key) {
      return node;
    }

    if (node.children && node.children.length > 0) {
      const found = findNodeFromTreeFileFolder(node.children, key);
      if (found) return found;
    }
  }

  return null;
};
