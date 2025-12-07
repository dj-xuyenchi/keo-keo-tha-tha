import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Col, Form, Modal, Row, Tabs } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import cloneDeep from "lodash/cloneDeep";

import { getMessageInstance } from "@/config/messageContext";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { CheckBoxCustom } from "@/component/componentCustom/CheckBoxCustom";

import {
  FormValue,
  form as formObject,
} from "@/config/defineSpecialProps/define/row/form";
import { useDispatch } from "react-redux";

export const FormItemSetting = ({
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
    // const workList = cloneDeep(canvas.dataWork) as ComponentData[];
    // const componentSelected = findComponentById(
    //   workList,
    //   canvas.selectedComponent?.id as string
    // );
    // const formProp = componentSelected?.specialProps?.find((prop) => {
    //   return prop.key === FORM_KEY;
    // });
    // if (formProp) {
    //   formProp.value = values;
    // } else {
    //   componentSelected?.specialProps.push({
    //     ...formObject,
    //     value: values,
    //   });
    //   console.error(canvas);
    // }
    // dispatch(setData2Work(workList));
    // handleClose();
  };
  const onFinishFailed = () => {};
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
                name="name"
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
              <Form.Item label="Hiển thị dấu sao requird" name="isRequird">
                <CheckBoxCustom />
              </Form.Item>
            </Col>
            <Col span={24}>
            <label>Cấu hình kiểm tra dữ liệu</label>
              <Tabs
                tabPosition="left"
                items={Array.from({ length: 3 }).map((_, i) => {
                  const id = String(i + 1);
                  return {
                    label: `Tab ${id}`,
                    key: id,
                    children: `Content of Tab ${id}`,
                  };
                })}
              />
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
