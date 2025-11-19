import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  span,
  SPAN_KEY,
  spanValid,
  SpanValue,
} from "@/config/defineSpecialProps/define/span";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Form } from "antd";
import { InputNumberCustom } from "@/component/componentCustom/InputNumberCustom";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import { FormInstance, RuleObject } from "antd/es/form";
import cloneDeep from "lodash/cloneDeep";
import {
  ComponentData,
  findComponentById,
} from "@/entity/canvas/ComponentData";
import { useDispatch } from "react-redux";
import { setData2Work } from "@/views/main/canvas/canvasSlice";
// Breakpoint	Kích thước màn hình	Ý nghĩa
// xs   < 576px	Mobile nhỏ
// sm	≥ 576px	Mobile to
// md	≥ 768px	Tablet
// lg	≥ 992px	Laptop nhỏ
// xl	≥ 1200px	Laptop to / desktop
// xxl
export const SpanSetting = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
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
    const spanProp = componentSelected?.specialProps?.find((prop) => {
      return prop.key === SPAN_KEY;
    });

    if (spanProp) {
      spanProp.value = values;
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
        (prop) => prop.key === SPAN_KEY
      );
      if (spanProp) {
        form.setFieldsValue(spanProp.value);
      }
    }
  }, [canvas.selectedComponent]);
  return (
    <>
      <div
        style={{
          width: "300px",
        }}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            tooltip="Số cột tương ứng"
            label="span"
            name="span"
            rules={valid}
          >
            <InputNumberCustom
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            tooltip="Số cột với tỷ lệ màn xs < 576px	Mobile nhỏ"
            name="xs"
            label="xs"
            rules={valid}
          >
            <InputNumberCustom
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            tooltip="Số cột với tỷ lệ màn sm	≥ 576px	Mobile to"
            name="sm"
            label="sm"
            rules={valid}
          >
            <InputNumberCustom
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            tooltip="Số cột với tỷ lệ màn md	≥ 768px	Tablet"
            name="md"
            label="md"
            rules={valid}
          >
            <InputNumberCustom
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            tooltip="Số cột với tỷ lệ màn lg	≥ 992px	Laptop nhỏ"
            name="lg"
            label="lg"
            rules={valid}
          >
            <InputNumberCustom
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            tooltip="Số cột với tỷ lệ màn xl	≥ 1200px Laptop to / desktop"
            name="xl"
            label="xl"
            rules={valid}
          >
            <InputNumberCustom
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            tooltip="Số cột với tỷ lệ màn xxl"
            name="xxl"
            label="xxl"
            rules={valid}
          >
            <InputNumberCustom
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right", marginTop: "12px" }}>
            <ButtonCustom type="primary" title="Xác nhận" htmlType="submit" />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
