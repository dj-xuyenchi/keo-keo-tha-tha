import { TYPE_DROP } from "@/config/sidebar/TypeComponent";
import { GLOBAL_PROP_CONFIG } from "./configEntry/GlobalPropConfig";
import { StaticImageData } from "next/image";

export interface ToolboxOption {
  name: string;
  icon: StaticImageData;
  type: TYPE_DROP;
  defaultProps?: GLOBAL_PROP_CONFIG;
}
