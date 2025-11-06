import { TYPE_DROP } from "@/config/TypeComponent";

export interface ComponentData {
  id: string;
  type: TYPE_DROP;
  classes: string[];
  events: [];
  componentChildren: ComponentData[];
}
