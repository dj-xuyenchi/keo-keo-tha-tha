import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Col, Form, Modal, Row } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import cloneDeep from "lodash/cloneDeep";

import { getMessageInstance } from "@/config/messageContext";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { SelectCustom } from "@/component/componentCustom/SelectCustom";
import { fieldSizeOptions } from "./fieldSizeOptions";
import { layoutOption } from "./layoutOption";
import { CheckBoxCustom } from "@/component/componentCustom/CheckBoxCustom";
import {
  ComponentData,
  findComponentById,
} from "@/entity/canvas/ComponentData";
import {
  FORM_KEY,
  FormValue,
  form as formObject,
} from "@/config/defineSpecialProps/define/row/form";
import { setData2Work } from "@/views/main/canvas/canvasSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const FormSetting = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const sideBar = useSelector((state: RootState) => state.sideBar);
  const canvas = useSelector((state: RootState) => state.canvas);

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
  const onFinish = (values: FormValue) => {
    console.error(values);

    const workList = cloneDeep(canvas.dataWork) as ComponentData[];
    const componentSelected = findComponentById(
      workList,
      canvas.selectedComponent?.id as string
    );
    const formProp = componentSelected?.specialProps?.find((prop) => {
      return prop.key === FORM_KEY;
    });

    if (formProp) {
      formProp.value = values;
    } else {
      componentSelected?.specialProps.push({
        ...formObject,
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
      const formProp = canvas.selectedComponent?.specialProps?.find(
        (prop) => prop.key === FORM_KEY
      );
      if (formProp) {
        form.setFieldsValue(formProp.value);
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
                label="Biến mapping form"
                name="formVarName"
                rules={[
                  { required: true, message: "Tên form không được để trống!" },
                ]}
              >
                <InputCustom placeholder="Nhập tên biến sẽ mapping form" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Disable state"
                name="disableState"
                tooltip="State quản trị việc có disable form không nếu không nhập thì form luôn avaiable!"
              >
                <InputCustom placeholder="Nhập tên state disableg" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Kích thước các ô field"
                name="size"
                tooltip="Kích thước chung cho các ô input dữ liệu(Nếu không chọn mặc định là vừa)"
              >
                <SelectCustom
                  placeholder="Chọn kích thước các ô field"
                  options={fieldSizeOptions}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Layout form"
                name="layout"
                rules={[
                  {
                    required: true,
                    message: "Bắt buộc phải chọn layout cho form!",
                  },
                ]}
              >
                <SelectCustom
                  placeholder="Chọn layout cho form"
                  options={layoutOption}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Dynamic form" name="dynamicForm">
                <CheckBoxCustom />
              </Form.Item>
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
