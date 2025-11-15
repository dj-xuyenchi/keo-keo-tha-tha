import styles from "./style/col.module.scss";

import { ComponentData } from "@/entity/canvas/ComponentData";
import { InlineStyle } from "@/entity/canvas/InlineStyle";
import { GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { Col, ColProps } from "antd";
import { GenComponent } from "./GenComponent";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getSessionCacheValueByKey } from "@/views/main/solution/service";
import { IS_SHOW_BORDER } from "@/config/folder-data/sessionCachingKey";
import { useSelectComponent } from "@/hook/useSelectComponent";
export interface ColForRowProps extends ColProps {
    col: ComponentData;
    isFromSideBar: boolean
}
export const ColForRow = ({ col, isFromSideBar, ...restProps }: ColForRowProps) => {
    const sessionCaching = useSelector(
        (state: RootState) => state.global.sessionCaching
    );
    const selectedComponent = useSelector(
        (state: RootState) => state.canvas.selectedComponent
    );
    const isShowBorder = getSessionCacheValueByKey(sessionCaching, IS_SHOW_BORDER) === 'true';
    const { select } = useSelectComponent();
    if (!isFromSideBar) {

        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            select(col);
        };
        return <Col onClick={handleClick} span={4} className={clsx(styles.colDrop, selectedComponent?.id === col.id ? "selectedComponent" : (isShowBorder && styles.colBorder))} {...restProps}>
            {col && col.componentChildren && col.componentChildren.map((component) => {
                return <>
                    <GenComponent key={component.id} component={component} />
                </>
            })}
        </Col>
    } else {
        return <div className={clsx(styles.colBorder)} style={{
            height: "80px",
            width: "40px"
        }}></div>
    }
};
export const defaultColDropObject = (id: string) => {
    return {
        id: id,
        type: GENERAL_TYPE.COL,
        inlineStyle: [] as InlineStyle[],
    } as ComponentData;
};

export const colIgnoreStyle = [];
