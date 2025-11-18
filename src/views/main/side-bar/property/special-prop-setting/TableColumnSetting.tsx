import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  span,
  spanValid,
  SpanValue,
} from "@/config/defineSpecialProps/define/span";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button, Form, Input, Row, Space, Table } from "antd";

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

export const TableColumnSetting = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [columns, setColumns] = useState([
    {
      title: "hi6",
      dataIndex: "hi6",
      key: "hi6",
      width: 220,
      align: "center",
    },
    {
      title: "hi6",
      dataIndex: "hi6",
      key: "hi6",
      width: 220,
      align: "center",
    },
    {
      title: "hi6",
      dataIndex: "hi6",
      key: "hi6",
      width: 220,
      align: "center",
    },
  ]);
  const sideBar = useSelector((state: RootState) => state.sideBar);
  const canvas = useSelector((state: RootState) => state.canvas);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleSubmit = (values: SpanValue) => {
    const workList = cloneDeep(canvas.dataWork) as ComponentData[];
    const componentSelected = findComponentById(
      workList,
      canvas.selectedComponent?.id as string
    );
    const tableColumnProp = componentSelected?.specialProps?.find((prop) => {
      return prop.key === TABLE_COLUMN_KEY;
    });

    if (tableColumnProp) {
      tableColumnProp.value = values;
    } else {
      componentSelected?.specialProps.push({
        ...span,
        value: values,
      });
      console.error(canvas);
    }
    dispatch(setData2Work(workList));
    handleClose();
  };
  const valid = [
    {
      validator(_: RuleObject, value: number) {
        try {
          if (spanValid(value)) {
            return Promise.resolve();
          }
        } catch (e) {
          console.error(e);
          return Promise.reject(e);
        }
      },
    },
  ];

  useEffect(() => {
    if (open) {
      form.resetFields();
      const spanProp = canvas.selectedComponent?.specialProps?.find(
        (prop) => prop.key === TABLE_COLUMN_KEY
      );
      if (spanProp) {
        form.setFieldsValue(spanProp.value);
      }
    }
  }, [canvas.selectedComponent]);
  return (
    <>
      <div
        className="table-column-setting"
        style={{
          width: "1200px",
        }}
      >
        <CodeEditor  />
        <Form
          name="dynamic_form_nest_item"
          style={{ maxWidth: 1200 }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.List name="column">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "title"]}
                      tooltip="Tên cột"
                      label="title"
                      layout="vertical"
                      rules={[{ required: true }]}
                    >
                      <InputCustom placeholder="Tiêu đề cột" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "dataIndex"]}
                      tooltip="Field tham chiếu dữ liệu"
                      label="Data index"
                      layout="vertical"
                      rules={[{ required: true }]}
                    >
                      <InputCustom placeholder="Data Index" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      tooltip="Key định danh cột"
                      label="Key"
                      layout="vertical"
                      rules={[{ required: true }]}
                    >
                      <InputCustom placeholder="Key" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "width"]}
                      tooltip="Chiều dài cột"
                      label="width"
                      layout="vertical"
                      rules={[{ required: true }]}
                    >
                      <InputCustom placeholder="width" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "align"]}
                      tooltip="Vị trí title"
                      label="Align"
                      layout="vertical"
                      rules={[{ required: true }]}
                    >
                      <InputCustom placeholder="align" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "onCellHeaderClass"]}
                      tooltip="Cấu hình ô Header"
                      label="Cell Header"
                      layout="vertical"
                      rules={[{ required: true }]}
                    >
                      <InputCustom placeholder="onCellHeaderClass" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm cột
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
        <Table
          style={{
            marginTop: "8px",
          }}
          rowKey="rowUUID"
          className="table-custom"
          bordered
          columns={columns}
          dataSource={[]}
          scroll={{ x: "100%" }}
        />
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
