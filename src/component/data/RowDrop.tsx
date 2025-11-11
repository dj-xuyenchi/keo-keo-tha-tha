import { defaultCss } from "@/config/defaultCss";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { Row } from "antd";
import styles from './style/row.module.scss'
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
import { LAYOUT_TYPE } from "@/config/sidebar/TypeComponent";

export interface RowDropProps {
    index: number;
    moveRow: (fromIndex: string, toIndex: string) => void;
    row: ComponentData;
}

export const RowDrop = ({ row, ...restProps }: RowDropProps) => {
    const inlineStyle = buildStyle(row);
    console.error(inlineStyle);
    const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
        accept: acceptType,
        canDrop: (item: DropDragItem) => {
            // Main dữ liệu canvas chính chỉ cho thả panel
            return item?.type !== LAYOUT_TYPE.PANEL && item?.type !== LAYOUT_TYPE.ROW;
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
        <WrapperDropComponent id={row.id} className="dashUnselect" >
            <Row
                ref={dropRef as unknown as Ref<HTMLDivElement> | undefined}
                className={styles.rowContainer}
                style={{
                    ...inlineStyle,
                    ...defaultCss,
                }}
                {...restProps}
            >
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
