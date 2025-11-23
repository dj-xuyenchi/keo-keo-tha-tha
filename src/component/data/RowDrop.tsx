import { defaultCss } from "@/config/defaultCss";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { Row } from "antd";
import styles from "./style/row.module.scss";
import { GenComponent } from "./GenComponent";
import { buildStyle } from "@/config/defineStyle/styleHTML";
import { WrapperBase, WrapperDropComponent } from "./WrapperDropComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { acceptType } from "@/config/sidebar/acceptType";
import { useDrop } from "react-dnd";
import { DropDragItem } from "@/entity/DropDragItem";
import { Ref } from "react";
import { GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { InlineStyle } from "@/entity/canvas/InlineStyle";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { form } from "@/config/defineSpecialProps/define/row/form";
import { setData2Work } from "@/views/main/canvas/canvasSlice";
import { getSessionCacheValueByKey } from "@/views/main/solution/service";
import { IS_SHOW_BORDER } from "@/config/folder-data/sessionCachingKey";
import clsx from "clsx";
import { addChildren2Component } from "@/views/main/canvas/service";
import { buildChildren } from "@/views/main/canvas/serviceComponent";
import { useDispatch } from "react-redux";

export interface RowDropProps extends WrapperBase {
  row: ComponentData;
}

export const RowDrop = ({ row, widthDefault, ...restProps }: RowDropProps) => {
  const inlineStyle = buildStyle(row);
  console.info(inlineStyle);

  const canvas = useSelector((state: RootState) => state.canvas);
  const sessionCaching = useSelector(
    (state: RootState) => state.global.sessionCaching
  );

  const dispatch = useDispatch();
  const isShowBorder =
    getSessionCacheValueByKey(sessionCaching, IS_SHOW_BORDER) === "true";
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: acceptType,
      canDrop: (item: DropDragItem) => {
        // Row chỉ nhận Col khi thả vào
        return item?.type === GENERAL_TYPE.COL;
      },
      hover(item: DropDragItem, monitor) {},
      drop: (item: DropDragItem, monitor) => {
        const res = addChildren2Component(
          row.id,
          buildChildren(item),
          canvas.dataWork
        );

        dispatch(setData2Work(res));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [canvas]
  );

  const isActive = isOver && canDrop;
  return (
    <WrapperDropComponent
      widthDefault={widthDefault}
      component={row}
      className={clsx(isShowBorder && "dashUnselect")}
    >
      <Row
        ref={dropRef as unknown as Ref<HTMLDivElement> | undefined}
        className={clsx(styles.rowContainer)}
        style={{
          ...inlineStyle,
          ...defaultCss,
          border: isActive ? "1px dashed #4caf50" : "1px dashed transparent",
          backgroundColor: isActive ? "#e8f5e9" : isOver ? "#f0f0f0" : "white",
          transition: "background-color 0.2s",
          ...(widthDefault ? { width: widthDefault } : {}),
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

export const defaultRowDropObject = (id: string) => {
  return {
    id: id,
    type: GENERAL_TYPE.ROW,
    inlineStyle: [] as InlineStyle[],
    specialProps: [form] as PropComponent[],
  } as ComponentData;
};
