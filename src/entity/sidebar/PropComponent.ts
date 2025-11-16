export interface PropComponent {
  name: string;
  key: string;
  valueType: VALUE_TYPE;
  value: string | object | object[] | null;
  apply: string[];
  tooltip?: string
  valid: (value: string) => boolean;
}

export type VALUE_TYPE =
  | "select"
  | "multi-select"
  | "number"
  | "flex"
  | "string";
