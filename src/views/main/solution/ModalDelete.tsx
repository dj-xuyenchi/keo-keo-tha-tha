import React, { useEffect } from "react";

import { Col, Form, FormProps, Modal, Row } from "antd";
import { ContextMenu } from "./ContextMenu";
import { FormCustom } from "@/component/componentCustom/FormCustom";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import { FieldNamesType } from "antd/es/cascader";
import { getSuffixFileType } from "@/config/folder-data/fileType";
export interface ModalDeleteProps {
  isModalOpen: boolean;
  contextMenu: ContextMenu | null;
  handleOk: () => void;
  handleCancel: () => void;
}
export const ModalDelete = ({
  isModalOpen,
  contextMenu,
  handleOk,
  handleCancel,
}: ModalDeleteProps) => {
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldNamesType>["onFinish"] = (value) => {
    handleOk();
  };
  const handleCancelModal = () => {
    handleCancel();
  };
  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
    }
  }, [isModalOpen]);
  return (
    <>
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        centered
        width={320}
        open={isModalOpen}
        onCancel={() => {
          form.resetFields();
          handleCancel();
        }}
        footer={null}
      >
        <>
          <FormCustom layout="vertical" form={form} onFinish={onFinish}>
            <Row
              gutter={16}
              style={{
                marginBottom: "14px",
              }}
            >
              <Col span={24} md={24} lg={24} xl={24}>
                Xác nhận xóa{" "}
                {contextMenu?.node?.fileType == "folder"
                  ? `folder ${contextMenu?.node?.title}`
                  : `file ${contextMenu?.node?.title}${getSuffixFileType(
                    contextMenu?.node?.fileType as string
                  )}`}
              </Col>
            </Row>
            <Form.Item>
              <Row gutter={16} justify="end">
                <Col>
                  <ButtonCustom
                    danger
                    onClick={handleCancelModal}
                    title="Hủy bỏ"
                  />
                </Col>
                <Col>
                  <ButtonCustom type="primary" htmlType="submit" title="Ok" />
                </Col>
              </Row>
            </Form.Item>
          </FormCustom>
        </>
      </Modal>
    </>
  );
};
