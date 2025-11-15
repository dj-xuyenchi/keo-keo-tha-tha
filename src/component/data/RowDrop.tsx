import { defaultCss } from "@/config/defaultCss";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { Col, Row } from "antd";
import styles from "./style/row.module.scss";
import { GenComponent } from "./GenComponent";
import { buildStyle } from "@/config/defineStyle/styleHTML";
import { WrapperDropComponent } from "./WrapperDropComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSelectComponent } from "@/hook/useSelectComponent";
import { acceptType } from "@/config/sidebar/acceptType";
import { useDrop } from "react-dnd";
import { DropDragItem } from "@/entity/DropDragItem";
import { Ref } from "react";
import { GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { InlineStyle } from "@/entity/canvas/InlineStyle";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { form } from "@/config/defineSpecialProps/define/form";
import {
    COL_FOR_ROW_KEY,
    colForRow,
    ColForRowValue,
} from "@/config/defineSpecialProps/define/colForRow";
import { getSessionCacheValueByKey } from "@/views/main/solution/service";
import { IS_SHOW_BORDER } from "@/config/folder-data/sessionCachingKey";
import clsx from "clsx";

export interface RowDropProps {
    index: number;
    moveRow: (fromIndex: string, toIndex: string) => void;
    row: ComponentData;
}

export const RowDrop = ({ row, ...restProps }: RowDropProps) => {
    const inlineStyle = buildStyle(row);
    console.error(inlineStyle);

    const colForRow = row.specialProps?.find((p) => {
        return p.key === COL_FOR_ROW_KEY;
    }) as PropComponent;
    const sessionCaching = useSelector(
        (state: RootState) => state.global.sessionCaching
    );
    const isShowBorder = getSessionCacheValueByKey(sessionCaching, IS_SHOW_BORDER) === 'true';
    const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
        accept: acceptType,
        canDrop: (item: DropDragItem) => {
            // Main dữ liệu canvas chính chỉ cho thả panel
            return (
                item?.type !== GENERAL_TYPE.PANEL && item?.type !== GENERAL_TYPE.ROW
            );
        },
        hover(item: DropDragItem, monitor) { },
        drop: (item: DropDragItem, monitor) => {
            console.error(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
            canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <WrapperDropComponent component={row} className={clsx(isShowBorder && "dashUnselect")}>
            <Row
                ref={dropRef as unknown as Ref<HTMLDivElement> | undefined}
                className={clsx(styles.rowContainer)}
                style={{
                    ...inlineStyle,
                    ...defaultCss,
                }}
                {...restProps}
            >
                {colForRow &&
                    (colForRow.value as ColForRowValue[]).map(
                        (col: ColForRowValue, index: number) => {
                            return (
                                <>
                                    <Col className={clsx(isShowBorder && styles.colBorder)} span={col.span}>d</Col>
                                </>
                            );
                        }
                    )}
                {row.componentChildren &&
                    row.componentChildren.map((component: ComponentData) => {
                        return (
                            <>
                                <GenComponent key={component.id} component={component} />
                            </>
                        );
                    })}
            </Row>
        </WrapperDropComponent>
    );
};

export const defaultRowDropObject = (id: string) => {
    return {
        id: id,
        type: GENERAL_TYPE.ROW,
        inlineStyle: [] as InlineStyle[],
        specialProps: [form, colForRow] as PropComponent[],
    } as ComponentData;
};
