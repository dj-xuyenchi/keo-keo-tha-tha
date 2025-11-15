import styles from "./style/input.module.scss";

import { ComponentData } from "@/entity/canvas/ComponentData";
import { InlineStyle } from "@/entity/canvas/InlineStyle";
import { DATA_TYPE, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { Col, ColProps } from "antd";
import { GenComponent } from "./GenComponent";
import { WrapperDropComponent } from "./WrapperDropComponent";
import clsx from "clsx";
export interface ColForRowProps extends ColProps {
    col: ComponentData;
}
export const ColForRow = ({ col, ...restProps }: ColForRowProps) => {
    return (
        <WrapperDropComponent component={col} className={clsx("dashUnselect")}>
            <Col span={4}>
                {col && col.componentChildren && col.componentChildren.map((component) => {
                    return <>
                        <GenComponent key={component.id} component={component} />
                    </>
                })}
            </Col>
        </WrapperDropComponent>
    );
};
export const defaultColDropObject = (id: string) => {
    return {
        id: id,
        type: GENERAL_TYPE.COL,
        inlineStyle: [] as InlineStyle[],
    } as ComponentData;
};

export const colIgnoreStyle = [];
