import { CONTROL_TYPE, DATA_TYPE, LAYOUT_TYPE } from "@/config/TypeComponent";

export interface ToolboxOption {
  name: string;
  icon: string;
  type: DATA_TYPE | CONTROL_TYPE | LAYOUT_TYPE;
}
