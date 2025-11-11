export const PROPERTY = "PROPERTY";
export const OVERRIDE = "OVERRIDE";
export const EVENT = "EVENT";
type SettingType = "PROPERTY" | "OVERRIDE" | "EVENT";
export interface SettingOption {
  name: string;
  type: SettingType;
}

export const settingOption: SettingOption[] = [
  {
    name: "Thuộc tính",
    type: PROPERTY,
  },
  {
    name: "Sự kiện",
    type: EVENT,
  },
  {
    name: "Can thiệp sâu",
    type: OVERRIDE,
  },
];
