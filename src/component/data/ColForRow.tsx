import styles from "./style/col.module.scss";

import {
  ComponentData,
  findComponentById,
} from "@/entity/canvas/ComponentData";
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
import {
  addChildren2Component,
  addComponentToParent,
  removeComponentById,
} from "@/views/main/canvas/service";
import { buildChildren } from "@/views/main/canvas/serviceComponent";
import { useDispatch } from "react-redux";
import { setData2Work } from "@/views/main/canvas/canvasSlice";
import { Ref } from "react";
import {
  span,
  SPAN_KEY,
  SpanValue,
} from "@/config/defineSpecialProps/define/col/span";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import cloneDeep from "lodash/cloneDeep";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
import { buildStyle } from "@/config/defineStyle/styleHTML";
export interface ColForRowProps extends ColProps {
  col: ComponentData;
  isFromSideBar: boolean;
}
export const ColForRow = ({
  col,
  isFromSideBar,
  ...restProps
}: ColForRowProps) => {
  const inlineStyle = buildStyle(col);
  console.error(inlineStyle);

  const sessionCaching = useSelector(
    (state: RootState) => state.global.sessionCaching
  );
  const selectedComponent = useSelector(
    (state: RootState) => state.canvas.selectedComponent
  );
  const canvas = useSelector((state: RootState) => state.canvas);

  const dispatch = useDispatch();
  const isShowBorder =
    getSessionCacheValueByKey(sessionCaching, IS_SHOW_BORDER) === "true";
  const { select } = useSelectComponent();
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: acceptType,
      canDrop: (item: DropDragItem) => {
        return (
          item?.type !== GENERAL_TYPE.PANEL &&
          item?.type !== GENERAL_TYPE.ROW &&
          item?.type !== GENERAL_TYPE.COL
        );
      },
      hover(item: DropDragItem, monitor) {},
      drop: (item: DropDragItem, monitor) => {
        if (
          item.type === GENERAL_TYPE.PANEL ||
          item.type === GENERAL_TYPE.COL ||
          item.type === GENERAL_TYPE.ROW
        ) {
          return;
        }
        if (item.source === "Sidebar") {
          const res = addChildren2Component(
            col.id,
            buildChildren(item),
            canvas.dataWork
          );
          dispatch(setData2Work(res));
          return;
        }
        const draggedId = item.id; // id B
        const newParentId = col.id; // A2

        if (!draggedId || !newParentId) {
          return;
        }

        // Clone data
        let newTree = cloneDeep(canvas.dataWork);

        // 1. Tìm lại component B (vì item là bản copy, không phải reference)
        const draggedComp = findComponentById(newTree, draggedId);
        if (!draggedComp) {
          return;
        }

        // 2. Xoá B khỏi parent cũ
        newTree = removeComponentById(newTree, draggedId);

        // 3. Thêm B vào parent mới
        newTree = addComponentToParent(newTree, newParentId, draggedComp);

        // 4. Cập nhật redux
        dispatch(setData2Work(newTree));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [canvas]
  );
  if (!isFromSideBar) {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      select(col);
    };
    const isActive = isOver && canDrop;
    const spanProp = col.specialProps.find((prop) => {
      return prop.key === SPAN_KEY;
    })?.value as SpanValue;
    return (
      <Col
        ref={dropRef as unknown as Ref<HTMLDivElement> | undefined}
        onClick={handleClick}
        span={spanProp?.span}
        xs={spanProp?.xs}
        sm={spanProp?.sm}
        md={spanProp?.md}
        lg={spanProp?.lg}
        xl={spanProp?.xl}
        xxl={spanProp?.xxl}
        className={clsx(
          styles.col,
          isShowBorder && styles.colDrop,
          selectedComponent?.id === col.id
            ? "selectedComponent"
            : isShowBorder && styles.colBorder
        )}
        {...restProps}
        style={{
          ...inlineStyle,
          border: isActive ? "1px dashed #4caf50" : "",
          backgroundColor: isActive ? "#e8f5e9" : isOver ? "#f0f0f0" : "white",
          transition: "background-color 0.2s",
        }}
      >
        {col &&
          col.componentChildren &&
          col.componentChildren.map((component) => {
            return (
              <>
                <GenComponent key={component.id} component={component} />
              </>
            );
          })}
      </Col>
    );
  } else {
    return (
      <div
        className={clsx(styles.colBorder)}
        style={{
          height: "80px",
          width: "40px",
        }}
      ></div>
    );
  }
};
export const defaultColDropObject = (id: string) => {
  return {
    id: id,
    type: GENERAL_TYPE.COL,
    inlineStyle: [] as StyleHTML[],
    specialProps: [span] as PropComponent[],
  } as ComponentData;
};

export const colIgnoreStyle = [];
