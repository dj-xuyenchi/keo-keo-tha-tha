import React, { Key, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Col,
  ColorPicker,
  Flex,
  Form,
  Modal,
  Row,
  Splitter,
  Table,
  Tree,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import cloneDeep from "lodash/cloneDeep";

import { useDispatch } from "react-redux";
import {
  TABLE_COLUMN_KEY,
  TableColumnValue,
  tableComlumn,
} from "@/config/defineSpecialProps/define/table/tableComlumn";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { InputNumberCustom } from "@/component/componentCustom/InputNumberCustom";

import { DownOutlined } from "@ant-design/icons";
import { deleteColRecursive, findNodeByKey } from "./service";
import { DataNode, EventDataNode } from "antd/es/tree";
import { SelectCustom } from "@/component/componentCustom/SelectCustom";
import { Color } from "antd/es/color-picker";
import {
  ComponentData,
  findComponentById,
} from "@/entity/canvas/ComponentData";
import { setData2Work } from "@/views/main/canvas/canvasSlice";
import { getMessageInstance } from "@/config/messageContext";
import { mapColumnsRecursive } from "@/component/data/TableDrop";
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
export const fixedOptions = [
  {
    value: null,
    label: "Không fix",
  },
  {
    value: "left",
    label: "Fix trái",
  },
  {
    value: "right",
    label: "Fixed phải",
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

  const message = getMessageInstance();
  const [form] = Form.useForm();
  const initTree = {
    dataIndex: "",
    width: 0,
    onHeaderCellClass: "",
    align: "center",
    title: "Danh sách cột",
    key: ROOT,
    children: [] as TableColumnValue[],
  };
  const [treeColData, setTreeColData] = useState([
    initTree,
  ] as TableColumnValue[]);
  const [colSelectedKey, setColSelectedKey] = useState(ROOT);
  const [modal, modalContextHolder] = Modal.useModal();

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
        fontColor: "#000000",
        dataIndex: "",
        align: "center",
        width: 0,
      } as TableColumnValue;

      const targetNode = findNodeByKey(newData, colSelectedKey);
      if (!targetNode) {
        return newData;
      }
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
    const column = findNodeByKey(
      treeColData,
      selectedKeys[0].toString() as string
    );
    if (column) {
      form.setFieldsValue({
        title: column.title,
        key: column.key,
        align: column.align,
        width: column.width,
        dataIndex: column.dataIndex,
        backgroundColor: column.backgroundColor,
      });
    }
  };
  const onSave = () => {
    if (colSelectedKey === ROOT) {
      return;
    }
    form.submit();
  };
  const onFinish = (value: TableColumnValue) => {
    setTreeColData((prev) => {
      const newData = cloneDeep(prev);
      const target = findNodeByKey(newData, colSelectedKey);

      if (target) {
        // convert color sang hex nếu là đối tượng Color
        if (
          value.backgroundColor &&
          typeof value.backgroundColor !== "string"
        ) {
          value.backgroundColor = (
            value.backgroundColor as Color
          ).toHexString();
        }
        if (value.fontColor && typeof value.fontColor !== "string") {
          value.fontColor = (value.fontColor as Color).toHexString();
        }
        // ghi đè field vào node
        Object.assign(target, value);
      }

      return newData;
    });
    message.success("Lưu cột thành công");
  };
  const handleDeleteCol = () => {
    if (colSelectedKey === ROOT) {
      return;
    }

    modal.confirm({
      title: "Bạn có chắc muốn xoá cột này?",
      content: "Thao tác này không thể hoàn tác.",
      okText: "Xoá",
      cancelText: "Hủy",
      okType: "danger",
      centered: true,
      onOk: () => {
        const tree = cloneDeep(treeColData[0].children);
        const newCols = deleteColRecursive(tree, colSelectedKey);
        const newData = {
          ...initTree,
          children: newCols as TableColumnValue[],
        };
        setTreeColData([newData] as TableColumnValue[]);
        setColSelectedKey(ROOT);
      },
    });
  };
  const handleConfirmSave = () => {
    modal.confirm({
      title: "Bạn có chắc lưu những thay đổi vào bảng?",
      content: "Thao tác này không thể hoàn tác.",
      okText: "Đồng ý",
      cancelText: "Xem lại",
      okType: "primary",
      centered: true,
      onOk: () => {
        handleSave()
      },
    });
  }
  const handleSave = () => {
    const workList = cloneDeep(canvas.dataWork) as ComponentData[];
    const componentSelected = findComponentById(
      workList,
      canvas.selectedComponent?.id as string
    );
    const tableColProp = componentSelected?.specialProps?.find((prop) => {
      return prop.key === TABLE_COLUMN_KEY;
    });
    if (tableColProp) {
      tableColProp.value = treeColData[0].children;
    } else {
      componentSelected?.specialProps.push({
        ...tableComlumn,
        value: treeColData[0].children,
      });
      console.error(canvas);
    }
    dispatch(setData2Work(workList));
    handleClose();
  };


  const getAllKeys = (nodes: TableColumnValue[]) => {
    let keys: React.Key[] = [];
    nodes.forEach((node: TableColumnValue) => {
      keys.push(node.key);
      if (node.children) {
        keys = keys.concat(getAllKeys(node.children));
      }
    });
    return keys;
  };
  const handleCancel = () => {
    const tableColProp = canvas.selectedComponent?.specialProps?.find(
      (prop) => prop.key === TABLE_COLUMN_KEY
    );
    if (tableColProp) {
      initTree.children = tableColProp.value as TableColumnValue[];
      setTreeColData([initTree] as TableColumnValue[]);
    }
    handleClose();
  };
  useEffect(() => {
    if (open) {
      const tableColProp = canvas.selectedComponent?.specialProps?.find(
        (prop) => prop.key === TABLE_COLUMN_KEY
      );
      if (tableColProp) {
        initTree.children = tableColProp.value as TableColumnValue[];
        setTreeColData([initTree] as TableColumnValue[]);
      }
    }
  }, [canvas.selectedComponent]);
  return (
    <>
      {modalContextHolder}
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
                  expandedKeys={getAllKeys(treeColData)}
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
                    <ButtonCustom
                      disabled={colSelectedKey === ROOT}
                      onClick={handleDeleteCol}
                      danger
                    >
                      Xóa cột
                    </ButtonCustom>
                  </Col>
                </Row>
                <Form
                  form={form}
                  layout="vertical"
                  disabled={colSelectedKey === ROOT}
                  onFinish={onFinish}
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
                    <Col span={4}>
                      <Form.Item label="Màu nền" name="backgroundColor">
                        <ColorPicker allowClear showText />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item label="Màu chữ" name="fontColor">
                        <ColorPicker allowClear showText />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Fixed column" name="fixed">
                        <SelectCustom
                          placeholder="Fixed cột"
                          options={fixedOptions}
                        />
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
            columns={mapColumnsRecursive(
              (treeColData[0].children ?? []) as TableColumnValue[]
            )}
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
          <ButtonCustom
            style={{
              marginRight: "8px",
            }}
            type="primary"
            title="Xác nhận"
            onClick={handleConfirmSave}
          />
          <ButtonCustom title="Hủy" onClick={handleCancel} />
        </Row>
      </div>
    </>
  );
};
