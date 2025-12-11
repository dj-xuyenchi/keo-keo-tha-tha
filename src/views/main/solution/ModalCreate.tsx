import React, { useEffect, useState } from "react";

import { defaultCss } from "@/config/defaultCss";
import { Col, Form, FormProps, Modal, Row } from "antd";
import { ContextMenu } from "./ContextMenu";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { SelectCustom } from "@/component/componentCustom/SelectCustom";
import { FormCustom } from "@/component/componentCustom/FormCustom";
import { ButtonCustom } from "@/component/componentCustom/ButtonCustom";
import {
  FILE_TYPE_LIST,
  getSuffixFileType,
} from "@/config/folder-data/fileType";
import { FieldNamesType } from "antd/es/cascader";
import { getAllFile } from "@/app/service";
import { useDispatch } from "react-redux";
import { setFileList } from "@/app/globalSlice";
export interface ModalCreateProps {
  isModalOpen: boolean;
  isCreateFolder: boolean;
  contextMenu: ContextMenu | null;
  handleOk: (name: string, type?: string) => void;
  handleCancel: () => void;
}
export const ModalCreate = ({
  isModalOpen,
  isCreateFolder,
  contextMenu,
  handleOk,
  handleCancel,
}: ModalCreateProps) => {
  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");

  const [fileType, setFileType] = useState({
    suffix: ".định dạng",
    type: "",
  });

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldNamesType>["onFinish"] = (value) => {
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
  const handleSave = async () => {
    if (isCreateFolder) {
      handleOk(folderName);
      setFolderName("");
    } else {
      handleOk(fileName, fileType.type);
      setFileName("");
      setFileType({ suffix: ".định dạng", type: "" });
      try {
        const files = await getAllFile();
        dispatch(setFileList(files));
      } catch (e) {
        console.error("Lỗi cập nhật dữ liệu file vào store khi tạo!");
        console.error(e);
      }
    }
  };
  const checkValidExist = (value: string): boolean => {
    const children = contextMenu?.node?.children || [];

    if (isCreateFolder) {
      // ✅ kiểm tra trùng tên folder
      return children.some(
        (item) => item.fileType === "folder" && item.title === value
      );
    } else {
      // ✅ kiểm tra trùng tên file
      return children.some(
        (item) => item.fileType !== "folder" && item.title === value
      );
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
      setFolderName("");
      setFileName("");
      setFileType({ suffix: ".định dạng", type: "" });
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
            <Row gutter={16}>
              <Col span={24} md={24} lg={24} xl={24}>
                <Form.Item
                  required
                  rules={[
                    {
                      required: true,
                      message: isCreateFolder
                        ? "Tên thư mục là bắt buộc"
                        : "Tên file là bắt buộc",
                    },
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.resolve();
                        if (checkValidExist(value.trim())) {
                          return Promise.reject(
                            new Error("Tên này đã tồn tại")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  label={isCreateFolder ? "Tên thư mục" : "Tên file"}
                  name="name"
                  tooltip={
                    isCreateFolder ? "Tên thư mục cần tạo" : "Tên file cần tạo"
                  }
                >
                  <InputCustom
                    placeholder={isCreateFolder ? "Tên thư mục" : "Tên file"}
                    suffix={!isCreateFolder && fileType.suffix}
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
              {!isCreateFolder && (
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
                    <SelectCustom
                      style={{
                        ...defaultCss,
                        marginTop: "8px",
                        width: "100%",
                      }}
                      options={FILE_TYPE_LIST.map((item) => {
                        return {
                          value: item,
                          label: item,
                        };
                      })}
                      onChange={handleSetFileType}
                      placeholder="Chọn kiểu file"
                    />
                  </Form.Item>
                </Col>
              )}
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
