import React, { useState } from "react";

import { Col, Form, Modal, Row } from "antd";
import { ContextMenu } from "./ContextMenu";
import { FormCustom } from "@/component/componentCustom/FormCustom";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import { InputCustom } from "@/component/componentCustom/InputCustom";
export interface ModalRenameProps {
  isModalOpen: boolean;
  contextMenu: ContextMenu | null;
  handleOk: (name: string, type?: string) => void;
  handleCancel: () => void;
}
export const ModalRename = ({
  isModalOpen,
  contextMenu,
  handleOk,
  handleCancel,
}: ModalRenameProps) => {
  const [newName, setNewName] = useState("");

  const [form] = Form.useForm();
  const onFinish = (value) => {
    handleSave();
  };
  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };
  const handleSave = () => {};
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
            <Row gutter={16}>
              <Col span={24} md={24} lg={24} xl={24}>
                <Form.Item
                  required
                  rules={[
                    { required: true, message: "Phải chọn định dạng file" },
                  ]}
                  label={
                    contextMenu?.node?.fileType === "folder"
                      ? "Đổi tên folder"
                      : "Đổi tên file"
                  }
                  name="name"
                  tooltip={
                    contextMenu?.node?.fileType === "folder"
                      ? "Đổi tên folder"
                      : "Đổi tên file"
                  }
                >
                  <InputCustom
                    placeholder={
                      contextMenu?.node?.fileType === "folder"
                        ? "Tên thư mục"
                        : "Tên file"
                    }
                    suffix={contextMenu?.node?.fileType === "folder"}
                    onChange={handleSetName}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Row justify="end">
                <ButtonCustom type="primary" htmlType="submit" title="Ok" />
              </Row>
            </Form.Item>
          </FormCustom>
        </>
      </Modal>
    </>
  );
};
