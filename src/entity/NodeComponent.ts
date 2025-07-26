import { CONTROL_TYPE, DATA_TYPE, LAYOUT_TYPE } from "@/config/TypeComponent";

export interface NodeComponent {
    id: string;
    type: DATA_TYPE | CONTROL_TYPE | LAYOUT_TYPE;
    props: NodeProps ;
}

export interface NodeProps {
    children: NodeComponent[]
    defaultValue: string | number | null | undefined
}