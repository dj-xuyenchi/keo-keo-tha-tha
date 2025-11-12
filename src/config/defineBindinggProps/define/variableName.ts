import { DATA_COMPONENT_KEYS } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const VARIABLE_KEY = "VARIABLE_KEY";
export const variable = {
  name: "Tên biến",
  key: VARIABLE_KEY,
  valueType: "string",
  apply: [...DATA_COMPONENT_KEYS],
  valid: (value: string) => {
    if (!value) {
      return false;
    }

    return true;
  },
} as PropComponent;
