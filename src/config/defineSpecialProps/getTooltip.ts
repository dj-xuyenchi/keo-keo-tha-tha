import { FORM_ITEM_KEY, formItemTooltip } from "./define/common/formItem";
import { LOADING_KEY, loadingTooltip } from "./define/common/loading";
import { HREF_KEY, hrefTooltip } from "./define/link/href";
import {
  OPEN_NEW_PAGE_KEY,
  openNewPageTooltip,
} from "./define/link/openNewPage";
import { FORM_KEY, formTooltip } from "./define/row/form";
import {
  QUICK_SEARCH_KEY,
  quickSearchTooltip,
} from "./define/table/quickSearch";
import {
  TABLE_COLUMN_KEY,
  tableComlumnTooltip,
} from "./define/table/tableComlumn";
import { TABLE_NAME_KEY, tableNameTooltip } from "./define/table/tableName";
import { TEXT_VALUE_KEY, textValuemTooltip } from "./define/text/textValue";

export const getTooltip = (type: string) => {
  switch (type) {
    case TABLE_COLUMN_KEY:
      return tableComlumnTooltip;
    case TABLE_NAME_KEY:
      return tableNameTooltip;
    case QUICK_SEARCH_KEY:
      return quickSearchTooltip;
    case FORM_KEY:
      return formTooltip;
    case FORM_ITEM_KEY:
      return formItemTooltip;
    case LOADING_KEY:
      return loadingTooltip;
    case TEXT_VALUE_KEY:
      return textValuemTooltip;
    case OPEN_NEW_PAGE_KEY:
      return openNewPageTooltip;
    case HREF_KEY:
      return hrefTooltip;
    default: {
      return "";
    }
  }
};
