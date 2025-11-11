import { TYPE_DROP } from "@/config/sidebar/TypeComponent";
import { InlineStyle } from "./InlineStyle";

export interface ComponentData {
  id: string;
  type: TYPE_DROP;
  inlineStyle: InlineStyle[];
  propsData?: object;
  classes: string[];
  events: [];
  componentChildren: ComponentData[];
}
