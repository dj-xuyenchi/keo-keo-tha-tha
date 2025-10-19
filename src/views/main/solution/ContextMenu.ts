import { FileFolderTree } from "@/entity/solution/FileFolderTree";

export interface ContextMenu {
  visible: boolean;
  x: number;
  y: number;
  node?: FileFolderTree;
}
