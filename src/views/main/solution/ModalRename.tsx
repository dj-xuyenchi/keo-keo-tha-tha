import React, { useState } from "react";

import { defaultCss } from "@/config/defaultCss";
import { Col, Form, Modal, Row } from "antd";
import { ContextMenu } from "./ContextMenu";
import { SelectCustom } from "@/component/componentCustom/SelectCustom";
import { FormCustom } from "@/component/componentCustom/FormCustom";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import { FILE_TYPE_LIST, getSuffixFileType } from "@/config/fileType";
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
  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");

  const [fileType, setFileType] = useState({
    suffix: ".định dạng",
    type: "",
  });
  const [form] = Form.useForm();
  const onFinish = (value) => {
    handleSave();
  };
  const handleSetFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };
  const handleSetFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };
  const handleSetFileType = (value: string) => {
    const suffix = getSuffixFileType(value);
    setFileType({
      suffix: suffix,
      type: value,
    });
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
                  label="Định dạng file"
                  name="filetype"
                  tooltip="Định dạng file cần tạo"
                >
                  <InputCustom
                    placeholder={
                      contextMenu?.node?.fileType === "folder"
                        ? "Tên thư mục"
                        : "Tên file"
                    }
                    suffix={
                      contextMenu?.node?.fileType === "folder" &&
                      fileType.suffix
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (isCreateFolder) {
                        handleSetFolderName(event);
                      } else {
                        handleSetFileName(event);
                      }
                    }}
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
