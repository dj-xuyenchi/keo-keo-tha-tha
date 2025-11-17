import { PropComponent } from "@/entity/sidebar/PropComponent";
import { form } from "./define/form";
import { spanGroup } from "./define/span";
import { tableComlumn } from "./define/tableComlumn";

export const specialPropList = [
  form,
  ...spanGroup,
  tableComlumn,
] as PropComponent[];
