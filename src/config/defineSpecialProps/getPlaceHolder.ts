import { SPAN_KEY, spanPlaceHolder } from "./define/col/span";
import {
  TABLE_COLUMN_KEY,
  tableComlumnPlaceHolder,
} from "./define/table/tableComlumn";
import { TABLE_NAME_KEY, tableNamePlaceHolder } from "./define/table/tableName";

export const getPlaceHolder = (type: string) => {
  switch (type) {
    case TABLE_COLUMN_KEY:
      return tableComlumnPlaceHolder;
    case TABLE_NAME_KEY:
      return tableNamePlaceHolder;
    case SPAN_KEY:
      return spanPlaceHolder;
  }
};
