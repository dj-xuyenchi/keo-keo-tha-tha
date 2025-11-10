import { TYPE_DROP } from "@/config/TypeComponent";

export interface DropDragItem {
  id: string;
  index?: number;
  type: TYPE_DROP;
  source: string;
}
