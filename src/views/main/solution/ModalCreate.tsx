import React, { useState } from "react";

import { Button, Modal } from "antd";
import { ContextMenu } from "./ContextMenu";
import { InputCustom } from "@/component/componentCustom/InputCustom";
export interface ModalCreateProps {
  isModalOpen: boolean;
  isCreateFolder: boolean;
  contextMenu: ContextMenu | null;
  handleOk: (name: string) => void;
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
  const handleSetFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };
  const handleSave = () => {
    handleOk(folderName);
    setFolderName("");
  };
  return (
    <>
      <Modal
        title={isCreateFolder ? "Tạo thư mục" : "Tạo file"}
        closable={{ "aria-label": "Custom Close Button" }}
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleSave}>
            OK
          </Button>,
        ]}
      >
        {isCreateFolder && (
          <>
            <InputCustom onChange={handleSetFolderName} />
          </>
        )}
      </Modal>
    </>
  );
};
