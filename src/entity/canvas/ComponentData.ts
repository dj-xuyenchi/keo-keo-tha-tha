import { TYPE_DROP } from "@/config/sidebar/TypeComponent";
import { InlineStyle } from "./InlineStyle";
import { PropComponent } from "../sidebar/PropComponent";

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
