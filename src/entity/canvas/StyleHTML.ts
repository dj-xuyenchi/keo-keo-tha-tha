export interface StyleHTML {
  key: string;
  name: string;
  reactObjectName: string;
  valueType: ValueType;
  valueListOption: string[];
  validValue: (value: string) => boolean;
}

export type ValueType = "freeStyle" | "numberPx" | "numberEm" | "selectOption";
