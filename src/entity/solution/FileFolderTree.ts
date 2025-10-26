import { IconFileFolder } from "./../../component/icon-foulder/IconFileFolder";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TreeDataNode } from "antd";
import { EventDataNode } from "antd/es/tree";
import { NodeDragEventParams } from "rc-tree/lib/contextTypes";
import React, { Key, ReactNode } from "react";

import { v4 as uuidv4 } from "uuid";
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

// ----------------------------------------------------
// HÀM TÌM KIẾM VÀ CẬP NHẬT CẤU TRÚC CÂY
// ----------------------------------------------------
/**
 * Hàm đệ quy tìm kiếm một node theo key và thực hiện callback.
 * @param list Dữ liệu cây hiện tại (FileFolderTree[]).
 * @param key Key của node cần tìm.
 * @param callback Hàm sẽ được gọi khi tìm thấy node.
 * @returns Node đã tìm thấy hoặc undefined.
 */
const updateTreeData = (
  list: FileFolderTree[],
  key: Key,
  callback: (item: FileFolderTree, index: number, arr: FileFolderTree[]) => void
): FileFolderTree | undefined => {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.key === key) {
      callback(item, i, list);
      return item;
    }
    if (item.children) {
      const result = updateTreeData(
        item.children as FileFolderTree[],
        key,
        callback
      );
      if (result) {
        return result;
      }
    }
  }
  return undefined;
};
const generateUniqueName = (
  name: string,
  siblings: FileFolderTree[]
): string => {
  let newName = name;
  let counter = 1;

  const existingNames = new Set(siblings.map((s) => s.title.toLowerCase()));

  while (existingNames.has(newName.toLowerCase())) {
    const match = name.match(/^(.*?)(\s\(\d+\))?$/);
    const baseName = match ? match[1] : name;
    newName = `${baseName} (${counter++})`;
  }

  return newName;
};
// ----------------------------------------------------
// HÀM XỬ LÝ SỰ KIỆN DROP (KÉO VÀ THẢ)
// ----------------------------------------------------
export const onTreeDropService = (
  info: NodeDragEventParams<FileFolderTree> & {
    dragNode: EventDataNode<FileFolderTree>;
    dragNodesKeys: Key[];
    dropPosition: number;
  },
  treeData: FileFolderTree[]
) => {
  const targetNode = info.node as FileFolderTree;
  const dragNode = info.dragNode as FileFolderTree;

  if (targetNode.fileType !== "folder") {
    return;
  }

  let dragObj: FileFolderTree | null = null;
  updateTreeData(treeData, dragNode.key, (item, index, arr) => {
    arr.splice(index, 1);
    dragObj = item;
  });

  if (!dragObj) {
    return;
  }

  updateTreeData(treeData, targetNode.key, (item) => {
    if (item.isLeaf) return;

    const children = (item.children || []) as FileFolderTree[];

    // ✅ Nếu trùng tên → đổi tên
    const newTitle = generateUniqueName(dragObj!.title, children);

    const newNode = {
      ...dragObj!,
      title: newTitle,
    };

    item.children = [...children, newNode];
    item.isOpen = true;
  });
};
/**
 * Hàm đệ quy tìm kiếm node và thực hiện xóa node con.
 * (Đây là phiên bản đơn giản hóa của updateTreeData cho mục đích xóa)
 *
 * @param list Dữ liệu cây hiện tại (FileFolderTree[]).
 * @param key Key của node cần xóa.
 * @returns Mảng FileFolderTree[] đã được cập nhật.
 */
const deleteNodeRecursive = (
  list: FileFolderTree[],
  key: Key
): FileFolderTree[] => {
  const updatedList = list.filter((node) => node.key !== key);

  return updatedList.map((node) => {
    if (node.children) {
      const newChildren = deleteNodeRecursive(node.children, key);

      return {
        ...node,
        children: newChildren, // newChildren luôn là FileFolderTree[]
      };
    }
    return {
      ...node,
      children: node.children || [], // Đảm bảo children luôn là mảng
    };
  });
};
export const deleteNode = (key: string, treeData: FileFolderTree[]) => {
  if (!key) return treeData;

  // Tạo bản sao dữ liệu cây để tránh thay đổi trực tiếp state cũ
  const updatedTree = [...treeData];

  // Gọi hàm đệ quy để xóa node
  const newTreeData = deleteNodeRecursive(updatedTree, key);

  return newTreeData;
};

/**
 * Gán key mới cho node và toàn bộ children (đệ quy)
 */
const cloneWithNewKeys = (node: FileFolderTree): FileFolderTree => {
  const newNode: FileFolderTree = {
    ...node,
    key: uuidv4(), // ✅ sinh key mới
    children: node.children
      ? node.children.map((child) => cloneWithNewKeys(child))
      : [],
  };
  return newNode;
};
/**
 * Hàm đổi tên nếu trùng
 * Nếu trong children có trùng tên → thêm (1), (2), ...
 */
const getUniqueName = (name: string, existingNames: string[]): string => {
  if (!existingNames.includes(name)) return name;

  let index = 1;
  let newName = `${name} (${index})`;
  while (existingNames.includes(newName)) {
    index++;
    newName = `${name} (${index})`;
  }
  return newName;
};
/**
 * Thêm node vào trong target node có key = key
 */
export const putNodeToNode = (
  node: FileFolderTree,
  key: string,
  treeData: FileFolderTree[]
): FileFolderTree[] => {
  const clonedNode = cloneWithNewKeys(node);

  const insertNode = (list: FileFolderTree[]): FileFolderTree[] => {
    return list.map((item) => {
      if (item.key === key) {
        const children = item.children ? [...item.children] : [];

        // ✅ kiểm tra trùng tên
        const existingNames = children.map((c) => c.title);
        const uniqueTitle = getUniqueName(clonedNode.title, existingNames);

        const newChild = { ...clonedNode, title: uniqueTitle };

        return { ...item, children: [...children, newChild] };
      } else if (item.children && item.children.length > 0) {
        return { ...item, children: insertNode(item.children) };
      }
      return item;
    });
  };

  return insertNode(treeData);
};

export const folderGoFisrt = (treeData: FileFolderTree[]): FileFolderTree[] => {
  const sortRecursively = (nodes: FileFolderTree[]): FileFolderTree[] => {
    return nodes
      .map((node) => ({
        ...node,
        children: sortRecursively(node.children),
      }))
      .sort((a, b) => {
        // 🔝 Folder trước file
        if (a.fileType === "folder" && b.fileType !== "folder") return -1;
        if (a.fileType !== "folder" && b.fileType === "folder") return 1;
        // Giữ nguyên thứ tự khác (hoặc có thể sort theo title nếu muốn)
        return 0;
      });
  };

  return sortRecursively(treeData);
};

export const getFatherNode = (
  key: string,
  treeData: FileFolderTree[]
): FileFolderTree | null => {
  for (const node of treeData) {
    if (node.children && node.children.length > 0) {
      // Nếu trong children có node trùng key -> đây là cha
      const foundChild = node.children.find((child) => child.key === key);
      if (foundChild) {
        return node;
      }

      // Nếu không có, duyệt sâu hơn
      const parent = getFatherNode(key, node.children);
      if (parent) {
        return parent;
      }
    }
  }
  return null; // Không tìm thấy
};
