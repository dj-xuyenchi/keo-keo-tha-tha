import clsx from "clsx";
import React, { Key, useEffect, useState } from "react";
import {
  span,
  spanValid,
  SpanValue,
} from "@/config/defineSpecialProps/define/span";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Button,
  Flex,
  Form,
  Input,
  Row,
  Space,
  Splitter,
  Switch,
  Table,
  Tree,
  TreeDataNode,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import { RuleObject } from "antd/es/form";
import cloneDeep from "lodash/cloneDeep";
import {
  ComponentData,
  findComponentById,
} from "@/entity/canvas/ComponentData";
import { useDispatch } from "react-redux";
import { setData2Work } from "@/views/main/canvas/canvasSlice";
import { TABLE_COLUMN_KEY } from "@/config/defineSpecialProps/define/tableComlumn";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { Editor } from "@monaco-editor/react";
import { CodeEditor } from "@/component/project-component/CodeEditor";
import { InputNumberCustom } from "@/component/componentCustom/InputNumberCustom";

import { DownOutlined } from "@ant-design/icons";
import { findNodeByKey, renderPreviewCol } from "./service";
import { ColumnType } from "antd/es/table";
import Panel from "antd/es/splitter/Panel";
import { DataNode, EventDataNode } from "antd/es/tree";
const ROOT = "ROOT";
export const TableColumnSetting = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const sideBar = useSelector((state: RootState) => state.sideBar);
  const canvas = useSelector((state: RootState) => state.canvas);
  const [treeColData, setTreeColData] = useState([
    {
      title: "Danh sách cột",
      key: ROOT,
      children: [] as TreeDataNode[],
    },
  ] as TreeDataNode[]);
  const [colSelectedKey, setColSelectedKey] = useState(ROOT);

  const dispatch = useDispatch();
  const handleAddCol = (e) => {
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

  return (
    <>
      <div
        className="table-column-setting"
        style={{
          width: "1200px",
        }}
      >
        <div>
          <div></div>
          <Flex vertical gap="middle">
            <Splitter
              style={{ height: 200, boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
            >
              <Splitter.Panel
                size={"30%"}
                resizable={false}
                style={{
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
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <ButtonCustom
                    style={{
                      marginRight: "4px",
                    }}
                    type="primary"
                    onClick={handleAddCol}
                  >
                    Thêm {colSelectedKey === ROOT ? `cột` : `cột con`}
                  </ButtonCustom>
                  <ButtonCustom danger>Xóa cột</ButtonCustom>
                </Row>
                {colSelectedKey != ROOT && (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    đ
                  </Row>
                )}
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
            columns={[].map((col) => {
              return {};
            })}
            dataSource={[]}
            scroll={{ x: "100%" }}
          />
        </div>

        <Row
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ButtonCustom type="primary" title="Xác nhận" htmlType="submit" />
        </Row>
      </div>
    </>
  );
};
