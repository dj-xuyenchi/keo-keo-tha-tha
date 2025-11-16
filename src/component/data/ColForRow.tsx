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
import { acceptType } from "@/config/sidebar/acceptType";
import { useDrop } from "react-dnd";
import { DropDragItem } from "@/entity/DropDragItem";
import { addChildren2Component } from "@/views/main/canvas/service";
import { buildChildren } from "@/views/main/canvas/serviceComponent";
import { useDispatch } from "react-redux";
import { setData2Work } from "@/views/main/canvas/canvasSlice";
import { Ref } from "react";
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
    const canvas = useSelector((state: RootState) => state.canvas);


    const dispatch = useDispatch();
    const isShowBorder = getSessionCacheValueByKey(sessionCaching, IS_SHOW_BORDER) === 'true';
    const { select } = useSelectComponent();
    const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
        accept: acceptType,
        canDrop: (item: DropDragItem) => {
            return item?.type !== GENERAL_TYPE.PANEL && item?.type !== GENERAL_TYPE.ROW && item?.type !== GENERAL_TYPE.COL
        },
        hover(item: DropDragItem, monitor) { },
        drop: (item: DropDragItem, monitor) => {
            if (item.type === GENERAL_TYPE.PANEL || item.type === GENERAL_TYPE.COL || item.type === GENERAL_TYPE.ROW) {
                return
            }
            const res = addChildren2Component(
                col.id,
                buildChildren(item),
                canvas.dataWork
            );
            dispatch(setData2Work(res));
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
            canDrop: monitor.canDrop(),
        }),
    }), [canvas]);
    if (!isFromSideBar) {
        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            select(col);
        };
        const isActive = isOver && canDrop;
        return <Col ref={dropRef as unknown as Ref<HTMLDivElement> | undefined} onClick={handleClick} span={4} className={clsx(styles.colDrop, selectedComponent?.id === col.id ? "selectedComponent" : (isShowBorder && styles.colBorder))} {...restProps}
            style={{
                border: isActive ? "1px dashed #4caf50" : "",
                backgroundColor: isActive ? "#e8f5e9" : isOver ? "#f0f0f0" : "white",
                transition: "background-color 0.2s",
            }}
        >
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
