import { TYPE_DROP } from "@/config/TypeComponent";
import { GLOBAL_PROP_CONFIG } from "./configEntry/GlobalPropConfig";

export interface ToolboxOption {
  name: string;
  icon: string;
  type: TYPE_DROP;
  defaultProps?: GLOBAL_PROP_CONFIG;
}
