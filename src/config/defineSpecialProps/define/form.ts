import { GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const FORM_KEY = "FORM_KEY";
export const form = {
  name: "Form",
  key: FORM_KEY,
  valueType: "flex",
  apply: [GENERAL_TYPE.ROW],
  valid: (value: string) => {
    if (!value) {
      return false;
    }

    return true;
  },
  value: {
    formName: "customerForm",
  },
} as PropComponent;
