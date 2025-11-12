import { Modal, Table } from "antd";
import styles from "./sidebar.module.scss";
import {
  propertyDetailColumns,
  propertySettingColumns,
} from "./propertySettingColumns";
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
export const PropertyTab = () => {
  const [openModal, setOpenModal] = useState(false);
  const selectedComponent = useSelector(
    (state: RootState) => state.canvas.selectedComponent
  );
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const expandedRowRender = (key: string) => {
    if (!selectedComponent) {
      return <div></div>;
    }
    let dataSource = [] as PropComponent[];
    if (key === BINDING_KEY) {
      dataSource = selectedComponent.bindingProps;
    }
    if (key === EXTANDS_KEY) {
      dataSource = selectedComponent.specialProps;
    }
    if (key === STYLE_KEY) {
      dataSource = selectedComponent.inlineStyle;
    }
    return (
      <Table
        className="tbl-expand-setting"
        columns={propertyDetailColumns}
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
        title={<p>Loading Modal</p>}
        footer={null}
        loading={true}
        open={openModal}
        centered
        onCancel={handleCloseModal}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
