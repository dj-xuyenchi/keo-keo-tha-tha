import { SIZE_KEY, sizeOptionList } from "./define/common/size";
export interface ReturnOptionSelect {
  value: string;
  label: string;
}

export const getOptionSelect = (key: string): ReturnOptionSelect[] => {
  switch (key) {
    case SIZE_KEY: {
      return sizeOptionList;
    }
    default: {
      return [];
    }
  }
};
