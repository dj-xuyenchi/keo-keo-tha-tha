import { TablePropsCustom } from "@/component/data/TableDrop";
import { TYPE_DROP } from "@/config/sidebar/TypeComponent";

export interface NodeComponent {
  id: string;
  type: TYPE_DROP;
  props: NodeProps;
  top: number;
  left: number;
  showingProps?: TablePropsCustom<object>;
}

export interface NodeProps {
  children: NodeComponent[];
  defaultValue: string | number | null | undefined;
  //
  disabled?: boolean;
}
