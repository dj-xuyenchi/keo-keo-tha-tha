import {
  ALIGN_ITEMS_KEY,
  alignItemsTooltip,
  JUSTIFY_CONTENT_KEY,
  justifyContentTooltip,
} from "./styles/display";

export const getTooltipStyle = (type: string) => {
  switch (type) {
    case ALIGN_ITEMS_KEY:
      return alignItemsTooltip;
    case JUSTIFY_CONTENT_KEY:
      return justifyContentTooltip;
  }
};
