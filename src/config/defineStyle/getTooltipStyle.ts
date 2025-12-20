import {
  ALIGN_ITEMS_KEY,
  alignItemsTooltip,
  FLEX_DIRECTION_KEY,
  flexDirectionTooltip,
  JUSTIFY_CONTENT_KEY,
  justifyContentTooltip,
} from "./styles/display";

export const getTooltipStyle = (type: string) => {
  switch (type) {
    case ALIGN_ITEMS_KEY:
      return alignItemsTooltip;
    case JUSTIFY_CONTENT_KEY:
      return justifyContentTooltip;
    case FLEX_DIRECTION_KEY:
      return flexDirectionTooltip;
    default: {
      return "";
    }
  }
};
