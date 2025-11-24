"use client";
import { Table, TableProps, Row, Col } from "antd";
import "@/config/styleOverride.css";

import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import { ColumnType } from "antd/es/table";
import { CgClose } from "react-icons/cg";
import clsx from "clsx";
import { BaseDataTable } from "@/entity/BaseDataTable";
import { InputDrop } from "./InputDrop";
import { ButtonCustom } from "../componentCustom/ButtonCustom";
import { CollapseCustom } from "../componentCustom/CollapseCustom";
import styles from "./style/table.module.scss";
import { WrapperBase, WrapperDropComponent } from "./WrapperDropComponent";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getSessionCacheValueByKey } from "@/views/main/solution/service";
import { IS_SHOW_BORDER } from "@/config/folder-data/sessionCachingKey";
import { defaultCss } from "@/config/defaultCss";
import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import {
  TABLE_COLUMN_KEY,
  TableColumnValue,
  tableComlumn,
} from "@/config/defineSpecialProps/define/table/tableComlumn";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { TABLE_NAME_KEY } from "@/config/defineSpecialProps/define/table/tableName";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
import { QUICK_SEARCH_KEY } from "@/config/defineSpecialProps/define/table/quickSearch";
// Interface mở rộng props
export interface ExtendFunction<T> {
  size?: "small" | "middle" | "large";
}

// Props cho TableCustom
export interface TablePropsCustom<T> extends TableProps<T>, WrapperBase {
  dataSource?: T[];
  fixedCollap?: boolean;
  viewMode?: boolean;
  table: ComponentData;
}
export interface ColumnTypeCustom<T> extends ColumnType<T> {
  sortNumber?: number;
  children?: ColumnTypeCustom<T>[];
  isOpenChildren?: boolean;
}
// Component TableDrop
export const TableDrop = <T extends BaseDataTable>({
  style,
  fixedCollap = false,
  loading,
  table,
  widthDefault,
  ...restProps
}: TablePropsCustom<T>) => {
  /// Special Prop
  const tableColProp = table.specialProps?.find(
    (prop) => prop.key === TABLE_COLUMN_KEY
  ) as PropComponent;
  const tableNameProp = table.specialProps?.find(
    (prop) => prop.key === TABLE_NAME_KEY
  ) as PropComponent;
  const quickSearchProp = table.specialProps?.find(
    (prop) => prop.key === QUICK_SEARCH_KEY
  ) as PropComponent;
  ///

  const [activeCollap, setActiveCollap] = useState(["1"]);
  const sessionCaching = useSelector(
    (state: RootState) => state.global.sessionCaching
  );
  const isShowBorder =
    getSessionCacheValueByKey(sessionCaching, IS_SHOW_BORDER) === "true";
  const selectedComponent = useSelector(
    (state: RootState) => state.canvas.selectedComponent
  );
  // Logic setting table
  const handleChangeCollap = (value: string[]) => {
    if (fixedCollap) {
      return;
    }
    setActiveCollap(value);
  };

  return (
    <WrapperDropComponent
      widthDefault={widthDefault}
      component={table}
      className={`${clsx(
        styles.pannelContainer,
        table && table.id === selectedComponent?.id && "selectedComponent"
      )}`}
    >
      <div className={clsx("table-custom-container", styles.tableDrop)}>
        <CollapseCustom
          activeKey={activeCollap}
          onChange={handleChangeCollap}
          items={[
            {
              key: "1",
              label: tableNameProp && (tableNameProp.value as string),
              children: (
                <>
                  <Table<T>
                    rowKey="rowUUID"
                    className="table-custom"
                    loading={loading}
                    style={{ ...style }}
                    bordered
                    columns={mapColumnsRecursive(
                      (tableColProp?.value ?? []) as TableColumnValue[]
                    )}
                    dataSource={[]}
                    scroll={{ x: "100%" }}
                    {...restProps}
                  />
                </>
              ),
              extra: (
                <>
                  {
                    <Row align="middle">
                      <Col>
                        {quickSearchProp && quickSearchProp.value && (
                          <InputDrop
                            input={null}
                            style={{
                              ...defaultCss,
                              pointerEvents: "none",
                              cursor: "default",
                              width: "150px",
                              fontSize: "14px",
                            }}
                            prefix={<IoSearchSharp />}
                            placeholder="Tìm kiếm nhanh..."
                          />
                        )}
                      </Col>
                      <Col>
                        <ButtonCustom
                          icon={<CgClose />}
                          size={"small"}
                          title={"Thêm dòng"}
                          type="primary"
                          style={{
                            marginLeft: "8px",
                            fontSize: "12px",
                          }}
                        />
                      </Col>
                    </Row>
                  }
                </>
              ),
            },
          ]}
          noBorder={true}
        />
      </div>
    </WrapperDropComponent>
  );
};
export const defaultTableDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.TABLE,
    inlineStyle: [] as StyleHTML[],
    specialProps: [tableComlumn] as PropComponent[],
  } as ComponentData;
};

export const mapColumnsRecursive = (cols: TableColumnValue[]) => {
  if (!cols) {
    return [];
  }
  return cols.map((col) => {
    const newCol = {
      ...col,
      onHeaderCell: () => ({
        style: {
          backgroundColor: col.backgroundColor,
          color: col.fontColor,
        },
      }),
    };

    if (col.children && col.children.length > 0) {
      newCol.children = mapColumnsRecursive(col.children);
    }

    return newCol;
  });
};
