import {
  BORDER_KEY,
  BORDER_RADIUS_KEY,
  borderRadiusTooltip,
  borderTooltip,
} from "./styles/border";
import {
  ALIGN_ITEMS_KEY,
  alignItemsTooltip,
  FLEX_DIRECTION_KEY,
  flexDirectionTooltip,
  JUSTIFY_CONTENT_KEY,
  justifyContentTooltip,
} from "./styles/display";
import {
  BOTTOM_KEY,
  bottomTooltip,
  LEFT_KEY,
  leftTooltip,
  POSITION_KEY,
  positionTooltip,
  RIGHT_KEY,
  rightTooltip,
  TOP_KEY,
  topTooltip,
} from "./styles/position";
import { WIDTH_KEY, widthTooltip } from "./styles/width";

export const getTooltipStyle = (type: string) => {
  switch (type) {
    case ALIGN_ITEMS_KEY:
      return alignItemsTooltip;
    case JUSTIFY_CONTENT_KEY:
      return justifyContentTooltip;
    case FLEX_DIRECTION_KEY:
      return flexDirectionTooltip;
    case POSITION_KEY:
      return positionTooltip;
    case TOP_KEY:
      return topTooltip;
    case BOTTOM_KEY:
      return bottomTooltip;
    case RIGHT_KEY:
      return rightTooltip;
    case LEFT_KEY:
      return leftTooltip;
    case BORDER_KEY:
      return borderTooltip;
    case BORDER_RADIUS_KEY:
      return borderRadiusTooltip;
    case WIDTH_KEY:
      return widthTooltip;
    default: {
      return "";
    }
  }
};
