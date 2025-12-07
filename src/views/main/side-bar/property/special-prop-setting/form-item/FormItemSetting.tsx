import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Col, Form, Modal, Row, Tabs } from "antd";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import cloneDeep from "lodash/cloneDeep";

import { getMessageInstance } from "@/config/messageContext";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { CheckBoxCustom } from "@/component/componentCustom/CheckBoxCustom";

import { useDispatch } from "react-redux";
import { CodeRule } from "./CodeRule";
import { setData2Work } from "@/views/main/canvas/canvasSlice";
import {
  ComponentData,
  findComponentById,
} from "@/entity/canvas/ComponentData";
import {
  FORM_ITEM_KEY,
  formItem,
  FormItemValue,
} from "@/config/defineSpecialProps/define/common/formItem";
import { useEffect, useState } from "react";
const sourceCodeDefault = `
// Sample code
  validator: async (_, value) => {
    if (!value) return Promise.resolve();

    const ok = await checkUsername(value);
    if (!ok) return Promise.reject("Username đã tồn tại!");

    return Promise.resolve();
  }`;
export const FormItemSetting = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const sideBar = useSelector((state: RootState) => state.sideBar);
  const canvas = useSelector((state: RootState) => state.canvas);
  const [rules, setRules] = useState([] as string[]);

  const dispatch = useDispatch();
  const [modal, modalContextHolder] = Modal.useModal();
  const message = getMessageInstance();
  const [form] = Form.useForm();
  const handleSave = () => {
    form
      .validateFields()
      .then(() => form.submit())
      .catch(() => {});
  };
  const handleCancel = () => {
    handleClose();
  };
  const handleAddRule = () => {
    setRules([...rules, sourceCodeDefault]);
  };
  const onFinish = (values: FormItemValue) => {
    const workList = cloneDeep(canvas.dataWork) as ComponentData[];
    const componentSelected = findComponentById(
      workList,
      canvas.selectedComponent?.id as string
    );
    const formItemProp = componentSelected?.specialProps?.find((prop) => {
      return prop.key === FORM_ITEM_KEY;
    });
    values.valid = rules;
    if (formItemProp) {
      formItemProp.value = values;
    } else {
      componentSelected?.specialProps.push({
        ...formItem,
        value: values,
      });
      console.error(canvas);
    }
    dispatch(setData2Work(workList));
    handleClose();
  };
  const onFinishFailed = () => {};
  useEffect(() => {
    if (open) {
      form.resetFields();
      const formItemProp = canvas.selectedComponent?.specialProps?.find(
        (prop) => prop.key === FORM_ITEM_KEY
      );
      if (formItemProp) {
        form.setFieldsValue(formItemProp.value);
        if (formItemProp.value) {
          setRules((formItemProp.value as FormItemValue).valid);
        }
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
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={[16, 8]}>
            <Col span={6}>
              <Form.Item
                label="Tiêu đề"
                name="label"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiêu đề ô dữ liệu",
                  },
                ]}
              >
                <InputCustom placeholder="Tiêu đề" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Tên trường dữ liệu mapping"
                name="formVarName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập trường dữ liệu",
                  },
                ]}
              >
                <InputCustom placeholder="Tên trường" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Hiển thị dấu sao requird"
                name="requird"
                valuePropName="checked"
              >
                <CheckBoxCustom />
              </Form.Item>
            </Col>
            <Col span={24}>
              <p>Cấu hình kiểm tra dữ liệu </p>
              <ButtonCustom
                style={{ marginTop: "4px" }}
                size="small"
                title="Thêm rule"
                onClick={handleAddRule}
              />
              {rules && rules.length > 0 && (
                <Tabs
                  style={{ marginTop: "12px" }}
                  tabPosition="left"
                  items={rules.map((_, i) => {
                    const id = String(i + 1);
                    return {
                      key: id,
                      label: "Rule " + id,
                      children: <CodeRule codeContent={sourceCodeDefault} />,
                    };
                  })}
                />
              )}
            </Col>
          </Row>
        </Form>
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
            onClick={handleSave}
          />
          <ButtonCustom title="Hủy" onClick={handleCancel} />
        </Row>
      </div>
    </>
  );
};
