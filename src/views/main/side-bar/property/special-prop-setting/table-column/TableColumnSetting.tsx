import clsx from "clsx";
import React, { Key, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Col, ColorPicker, Flex, Form, Row, Splitter, Table, Tree } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import cloneDeep from "lodash/cloneDeep";

import { useDispatch } from "react-redux";
import { TableColumnValue } from "@/config/defineSpecialProps/define/tableComlumn";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { InputNumberCustom } from "@/component/componentCustom/InputNumberCustom";

import { DownOutlined } from "@ant-design/icons";
import { findNodeByKey } from "./service";
import { DataNode, EventDataNode } from "antd/es/tree";
import { SelectCustom } from "@/component/componentCustom/SelectCustom";
const ROOT = "ROOT";
export const alignOptions = [
  {
    value: "left",
    label: "Căn trái",
  },
  {
    value: "center",
    label: "Căn giữa",
  },
  {
    value: "right",
    label: "Căn phải",
  },
];
export const TableColumnSetting = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const sideBar = useSelector((state: RootState) => state.sideBar);
  const canvas = useSelector((state: RootState) => state.canvas);
  const [form] = Form.useForm();
  const [treeColData, setTreeColData] = useState([
    {
      dataIndex: "",
      width: 0,
      onHeaderCellClass: "",
      algin: "center",
      title: "Danh sách cột",
      key: ROOT,
      children: [] as TableColumnValue[],
    },
  ] as TableColumnValue[]);
  const [colSelectedKey, setColSelectedKey] = useState(ROOT);

  const dispatch = useDispatch();
  const handleAddCol = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (!colSelectedKey) return;

    setTreeColData((prev) => {
      const newData = cloneDeep(prev);
      const newCol = {
        title: "Cột mới",
        key: uuidv4(),
        children: [],
      };

      const targetNode = findNodeByKey(newData, colSelectedKey);
      if (!targetNode) return newData;

      if (!targetNode.children) {
        targetNode.children = [];
      }

      targetNode.children.push(newCol);

      return newData;
    });
  };
  const onSelect = (
    selectedKeys: Key[],
    info: {
      event: "select";
      selected: boolean;
      node: EventDataNode<DataNode>;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ) => {
    setColSelectedKey(selectedKeys[0].toString() as string);
  };
  const onSave = () => {
    if (colSelectedKey === ROOT) {
      return;
    }
    form.submit();
  };
  return (
    <>
      <div
        className="table-column-setting"
        style={{
          width: "1200px",
        }}
      >
        <div>
          <Flex vertical gap="middle">
            <Splitter
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Splitter.Panel
                size={"30%"}
                resizable={false}
                style={{
                  height: "220px",
                  padding: "10px 12px",
                }}
              >
                <Tree
                  showLine
                  defaultSelectedKeys={[colSelectedKey]}
                  switcherIcon={<DownOutlined />}
                  onSelect={onSelect}
                  treeData={treeColData}
                />
              </Splitter.Panel>
              <Splitter.Panel
                size={"70%"}
                style={{
                  padding: "10px 12px",
                }}
              >
                <Row
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  <Col span={12}>
                    <ButtonCustom
                      style={{
                        marginRight: "4px",
                      }}
                      type="primary"
                      onClick={handleAddCol}
                    >
                      Thêm {colSelectedKey === ROOT ? `cột` : `cột con`}
                    </ButtonCustom>
                  </Col>
                  <Col
                    span={12}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <ButtonCustom
                      style={{
                        marginRight: "4px",
                      }}
                      type="primary"
                      disabled={colSelectedKey === ROOT}
                      onClick={onSave}
                    >
                      Lưu
                    </ButtonCustom>
                    <ButtonCustom danger>Xóa cột</ButtonCustom>
                  </Col>
                </Row>
                <Form
                  form={form}
                  layout="vertical"
                  disabled={colSelectedKey === ROOT}
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                          { required: true, message: "Vui lòng nhập tên cột" },
                        ]}
                      >
                        <InputCustom placeholder="Tên cột" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Data index"
                        name="dataIndex"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên field cần mapping",
                          },
                        ]}
                      >
                        <InputCustom placeholder="field mapping" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Key"
                        name="key"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập key cho cột",
                          },
                        ]}
                      >
                        <InputCustom placeholder="Key của cột" />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        label="Độ dài"
                        name="width"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập độ dài cột",
                          },
                        ]}
                      >
                        <InputNumberCustom
                          placeholder="Độ dài cột"
                          width={"100%"}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Align"
                        name="align"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn vị trí căn chỉnh cho cột",
                          },
                        ]}
                      >
                        <SelectCustom
                          placeholder="Căn chỉnh vị trí tên cột"
                          options={alignOptions}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Màu nền" name="backgroundColor">
                        <ColorPicker allowClear showText />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Splitter.Panel>
            </Splitter>
          </Flex>
        </div>
        <div>
          <Table
            style={{
              marginTop: "8px",
            }}
            rowKey="rowUUID"
            className="table-custom"
            bordered
            columns={treeColData[0].children}
            dataSource={[]}
            scroll={{ x: "100%" }}
          />
        </div>

        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "12px",
          }}
        >
          <ButtonCustom type="primary" title="Xác nhận" htmlType="submit" />
        </Row>
      </div>
    </>
  );
};
