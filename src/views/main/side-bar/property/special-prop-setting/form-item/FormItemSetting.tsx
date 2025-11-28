import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Col, Form, Modal, Row } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import cloneDeep from "lodash/cloneDeep";

import { getMessageInstance } from "@/config/messageContext";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { SelectCustom } from "@/component/componentCustom/SelectCustom";
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
