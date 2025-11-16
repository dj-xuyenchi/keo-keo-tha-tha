import { GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const FORM_KEY = "FORM_KEY";
export const form = {
  name: "Form",
  key: FORM_KEY,
  valueType: "flex",
  apply: [GENERAL_TYPE.ROW],
  value: {
    formName: "customerForm",
  },
} as PropComponent;
