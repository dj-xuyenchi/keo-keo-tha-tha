import { TYPE_DROP } from "@/config/TypeComponent";
import { InlineStyle } from "./InlineStyle";

export interface ComponentData {
  id: string;
  type: TYPE_DROP;
  inlineStyle: InlineStyle[];
  classes: string[];
  events: [];
  componentChildren: ComponentData[];
}
