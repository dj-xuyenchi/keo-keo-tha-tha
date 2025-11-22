import { FormInstance, Modal, Table } from "antd";
import styles from "./sidebar.module.scss";
import { propertySettingColumns } from "./propertySettingColumns";
import {
  BINDING_KEY,
  EXTANDS_KEY,
  options,
  STYLE_KEY,
} from "./propertySettingOption";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { SearchOutlined } from "@ant-design/icons";
import { bindingPropList } from "@/config/defineBindinggProps/bindingProps";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { specialPropList } from "@/config/defineSpecialProps/specialProps";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";
import { getColumns } from "./columns";
import { SPAN_KEY } from "@/config/defineSpecialProps/define/span";
import { SpanSetting } from "./special-prop-setting/span/SpanSetting";
import { useDispatch } from "react-redux";
import { setSelectProp } from "../sideBarSlice";
import { TableColumnSetting } from "./special-prop-setting/table-column/TableColumnSetting";
import { TABLE_COLUMN_KEY } from "@/config/defineSpecialProps/define/tableComlumn";
export const PropertyTab = () => {
  const [openModal, setOpenModal] = useState(false);
  const selectedComponent = useSelector(
    (state: RootState) => state.canvas.selectedComponent
  );

  const dispatch = useDispatch();
  const sideBar = useSelector((state: RootState) => state.sideBar);
  const handleOpenModal = (prop: PropComponent) => {
    dispatch(setSelectProp(prop));
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = getColumns({ handleOpenModal });
  const expandedRowRender = (key: string) => {
    if (!selectedComponent) {
      return <div></div>;
    }
    let dataSource = [] as PropComponent[];
    if (key === BINDING_KEY) {
      dataSource = selectedComponent.bindingProps;
    }
    if (key === EXTANDS_KEY) {
      const componentType = selectedComponent.type;
      const specialPropsByType = specialPropList.filter((prop) => {
        return prop.apply.includes(componentType);
      });
      dataSource = specialPropsByType;
    }
    if (key === STYLE_KEY) {
      // dataSource = selectedComponent.inlineStyle.map((style) => {
      //   return {
      //   } as PropComponent
      // });
    }
    return (
      <Table
        className="tbl-expand-setting"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        showHeader={false}
        bordered
      />
    );
  };

  return (
    <>
      <InputCustom
        placeholder="Tìm kiếm thuộc tính"
        prefix={<SearchOutlined />}
        style={{ marginBottom: "8px" }}
      />
      <Table
        showHeader={false}
        tableLayout="fixed"
        columns={propertySettingColumns}
        expandable={{
          expandedRowRender: (e: { key: string }) => {
            return expandedRowRender(e.key);
          },
          defaultExpandedRowKeys: [BINDING_KEY, EXTANDS_KEY],
        }}
        dataSource={options}
        bordered
        pagination={false}
      />
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
      </Modal>
    </>
  );
};
