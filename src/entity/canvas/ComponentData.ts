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
