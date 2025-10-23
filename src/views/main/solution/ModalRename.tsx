import React, { useState } from "react";

import { Col, Form, FormProps, Modal, Row } from "antd";
import { ContextMenu } from "./ContextMenu";
import { FormCustom } from "@/component/componentCustom/FormCustom";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { FieldNamesType } from "antd/es/cascader";
import { getSuffixFileType } from "@/config/fileType";
export interface ModalRenameProps {
  isModalOpen: boolean;
  contextMenu: ContextMenu | null;
  handleOk: (name: string) => void;
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
  const onFinish: FormProps<FieldNamesType>["onFinish"] = (value) => {
    handleOk(newName);
  };
  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };
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
                    {
                      required: true,
                      message:
                        contextMenu?.node?.fileType === "folder"
                          ? "Tên folder không được để trống!"
                          : "Tên file không được để trống!",
                    },
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
                    suffix={
                      contextMenu?.node?.fileType != "folder" &&
                      getSuffixFileType(contextMenu?.node?.fileType as string)
                    }
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
