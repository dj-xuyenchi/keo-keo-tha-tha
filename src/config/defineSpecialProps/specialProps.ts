import { PropComponent } from "@/entity/sidebar/PropComponent";
import { form } from "./define/row/form";
import { spanGroup } from "./define/col/span";
import { tableComlumn } from "./define/table/tableComlumn";
import { tableName } from "./define/table/tableName";
import { quickSearch } from "./define/table/quickSearch";
import { formItem } from "./define/common/formItem";
import { loading } from "./define/common/loading";
import { textValue } from "./define/text/textValue";
import { size } from "./define/common/size";

export const specialPropList = [
  form,
  ...spanGroup,
  tableComlumn,
  tableName,
  quickSearch,
  formItem,
  loading,
  textValue,
  size,
] as PropComponent[];
