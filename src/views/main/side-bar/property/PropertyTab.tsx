import { Modal, Table } from "antd";
import { propertySettingColumns } from "./propertySettingColumns";
import {
  BINDING_KEY,
  EXTANDS_KEY,
  options,
  STYLE_KEY,
} from "./propertySettingOption";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { SearchOutlined } from "@ant-design/icons";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { specialPropList } from "@/config/defineSpecialProps/specialProps";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { getColumns } from "./columns";
import { SPAN_KEY } from "@/config/defineSpecialProps/define/col/span";
import { SpanSetting } from "./special-prop-setting/span/SpanSetting";
import { useDispatch } from "react-redux";
import { setSelectProp } from "../sideBarSlice";
import { TableColumnSetting } from "./special-prop-setting/table-column/TableColumnSetting";
import { TABLE_COLUMN_KEY } from "@/config/defineSpecialProps/define/table/tableComlumn";
import cloneDeep from "lodash/cloneDeep";
import {
  ComponentData,
  findComponentById,
} from "@/entity/canvas/ComponentData";
import { setData2Work } from "../../canvas/canvasSlice";

import styles from "./prop.module.scss";
import { ColumnsType } from "antd/es/table";
import { getColumnStyle } from "./columnStyle";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
import { styleHTML } from "@/config/defineStyle/styleHTML";
import clsx from "clsx";
import { FORM_KEY } from "@/config/defineSpecialProps/define/row/form";
import { FormSetting } from "./special-prop-setting/form/FormSetting";
import { FORM_ITEM_KEY } from "@/config/defineSpecialProps/define/common/formItem";
import { FormItemSetting } from "./special-prop-setting/form-item/FormItemSetting";
export const PropertyTab = () => {
  const [openModal, setOpenModal] = useState(false);

  const [columns, setColumns] = useState<ColumnsType<PropComponent>>([]);
  const [columnStyle, setColumnStyle] = useState<ColumnsType<StyleHTML>>([]);
  // const [dataSource, setDatasource] = useState([] as PropComponent[]);

  const selectedComponent = useSelector(
    (state: RootState) => state.canvas.selectedComponent
  );
  const canvas = useSelector((state: RootState) => state.canvas);

  const dispatch = useDispatch();
  const sideBar = useSelector((state: RootState) => state.sideBar);
  function handleOpenModal(prop: PropComponent) {
    dispatch(setSelectProp(prop));
    setOpenModal(true);
  }
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const expandedRowRender = (key: string) => {
    if (!selectedComponent) {
      return <div></div>;
    }
    let dataSource: PropComponent[] = [];
    if (key === BINDING_KEY) {
      dataSource = selectedComponent.bindingProps;
    }
    if (key === EXTANDS_KEY) {
      const componentType = selectedComponent.type;
      const cloneList = cloneDeep(specialPropList);
      dataSource = cloneList
        .filter((prop: PropComponent) => prop.apply.includes(componentType))
        .map((prop: PropComponent) => {
          const existed = selectedComponent.specialProps?.find(
            (p) => p.key === prop.key
          );

          return {
            ...prop,
            value: existed ? existed.value : null,
          };
        });
    }
    if (key === STYLE_KEY) {
      const inlineComponentStyle = cloneDeep(styleHTML).map(
        (data: StyleHTML) => {
          const styleExistCheck = selectedComponent.inlineStyle.find(
            (style: StyleHTML) => {
              return style.key === data.key;
            }
          );
          if (styleExistCheck) {
            data.value = styleExistCheck.value;
          }
          return data;
        }
      );
      return (
        <Table
          key={selectedComponent?.id}
          className="tbl-expand-setting"
          columns={columnStyle}
          dataSource={inlineComponentStyle}
          pagination={false}
          showHeader={false}
          bordered
        />
      );
    }
    return (
      <Table
        key={selectedComponent?.id}
        className="tbl-expand-setting"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        showHeader={false}
        bordered
      />
    );
  };
  useEffect(() => {
    function handleSetValue(
      propAction: PropComponent,
      value: string | boolean
    ) {
      const workList = cloneDeep(canvas.dataWork) as ComponentData[];
      const componentSelected = findComponentById(
        workList,
        canvas.selectedComponent?.id as string
      );
      const specialProp = componentSelected?.specialProps?.find((prop) => {
        return prop.key === propAction.key;
      });

      if (specialProp) {
        specialProp.value = value;
      } else {
        componentSelected?.specialProps.push({
          ...propAction,
          value: value,
        });
      }
      dispatch(setData2Work(workList));
    }
    const cols = getColumns({ handleOpenModal, handleSetValue });
    setColumns([...cols]);
    // Style
    function handleSetValueStyle(styleAction: StyleHTML, value: string) {
      const workList = cloneDeep(canvas.dataWork) as ComponentData[];
      const componentSelected = findComponentById(
        workList,
        canvas.selectedComponent?.id as string
      );
      const inlineStyle = componentSelected?.inlineStyle?.find(
        (style: StyleHTML) => {
          return style.key === styleAction.key;
        }
      );

      if (inlineStyle) {
        inlineStyle.value = value;
      } else {
        componentSelected?.inlineStyle.push({
          ...styleAction,
          value: value,
        });
      }
      dispatch(setData2Work(workList));
    }
    const colStyle = getColumnStyle({ handleSetValueStyle });
    setColumnStyle([...colStyle]);
  }, [selectedComponent?.id]);

  return (
    <>
      <InputCustom
        placeholder="Tìm kiếm thuộc tính"
        prefix={<SearchOutlined />}
        style={{ marginBottom: "8px" }}
      />
      <div className={clsx(styles.tblPropContainer, "node-setting")}>
        <Table
          showHeader={false}
          tableLayout="fixed"
          columns={propertySettingColumns}
          expandable={{
            expandedRowRender: (e: { key: string }) => {
              return expandedRowRender(e.key);
            },
            defaultExpandedRowKeys: [BINDING_KEY, EXTANDS_KEY, STYLE_KEY],
          }}
          dataSource={options}
          bordered
          pagination={false}
        />
      </div>
      <Modal
        title={<p>{sideBar?.speacialSelected?.name}</p>}
        footer={null}
        loading={false}
        open={openModal}
        centered
        width={"auto"}
        style={{
          width: "fit-content",
        }}
        closable={false}
      >
        {openModal && sideBar?.speacialSelected?.key === SPAN_KEY && (
          <SpanSetting open={openModal} handleClose={handleCloseModal} />
        )}
        {openModal && sideBar?.speacialSelected?.key === TABLE_COLUMN_KEY && (
          <TableColumnSetting open={openModal} handleClose={handleCloseModal} />
        )}
        {openModal && sideBar?.speacialSelected?.key === FORM_KEY && (
          <FormSetting open={openModal} handleClose={handleCloseModal} />
        )}
        {openModal && sideBar?.speacialSelected?.key === FORM_ITEM_KEY && (
          <FormItemSetting open={openModal} handleClose={handleCloseModal} />
        )}
      </Modal>
    </>
  );
};
