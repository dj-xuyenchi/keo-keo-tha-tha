import { Table } from "antd";
import styles from "./sidebar.module.scss";
import {
  propertyDetailColumns,
  propertySettingColumns,
} from "./propertySettingColumns";
import { BINDING_KEY, EXTANDS_KEY, options } from "./propertySettingOption";
import { props } from "./propertyList";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { SearchOutlined } from "@ant-design/icons";
export const PropertyTab = () => {
  const expandedRowRender = () => (
    <Table
      className="tbl-expand-setting"
      columns={propertyDetailColumns}
      dataSource={props}
      pagination={false}
      showHeader={false}
      bordered
    />
  );
  return (
    <>
      <InputCustom
        placeholder="Tìm kiếm thuộc tính"
        prefix={<SearchOutlined />}
        style={{ marginBottom: "8px" }}
      />
      <Table
        showHeader={false}
        columns={propertySettingColumns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: [BINDING_KEY, EXTANDS_KEY],
        }}
        dataSource={options}
        bordered
        pagination={false}
        scroll={{ y: 10000 }} // bây giờ 100% sẽ dựa vào div cha
      />
    </>
  );
};
