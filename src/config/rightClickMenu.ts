import { MenuProps } from "antd";
export const ADD_FILE = "ADD_FILE";
export const ADD_FOLDER = "ADD_FOLDER";

// ⚙️ Menu context
export const rightClickFileMenu: MenuProps["items"] = [
  {
    key: "rename",
    label: "Đổi tên",
  },
  {
    key: "delete",
    label: "Xóa",
  },
];

export const rightClickFolderMenu: MenuProps["items"] = [
  {
    key: ADD_FILE,
    label: "Tạo file",
  },
  {
    key: ADD_FOLDER,
    label: "Tạo thư mục mới",
  },
  {
    key: "rename",
    label: "Đổi tên",
  },
  {
    key: "delete",
    label: "Xóa",
  },
];
