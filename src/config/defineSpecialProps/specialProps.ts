import { PropComponent } from "@/entity/sidebar/PropComponent";
import { form } from "./define/row/form";
import { spanGroup } from "./define/col/span";
import { tableComlumn } from "./define/table/tableComlumn";
import { tableName } from "./define/table/tableName";
import { quickSearch } from "./define/table/quickSearch";

export const specialPropList = [
  form,
  ...spanGroup,
  tableComlumn,
  tableName,
  quickSearch,
] as PropComponent[];
