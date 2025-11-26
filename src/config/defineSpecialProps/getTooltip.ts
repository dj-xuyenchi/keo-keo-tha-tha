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
  }
};
