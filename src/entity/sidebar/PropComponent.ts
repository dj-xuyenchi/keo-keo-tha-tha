export interface PropComponent {
  name: string;
  key: string;
  valueType: VALUE_TYPE;
  value: string | object | object[] | boolean | null;
  apply: string[];
}

export type VALUE_TYPE =
  | "switch"
  | "select"
  | "multi-select"
  | "number"
  | "flex"
  | "string";
