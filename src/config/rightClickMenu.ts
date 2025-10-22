import { MenuProps } from "antd";
export const ADD_FILE = "ADD_FILE";
export const ADD_FOLDER = "ADD_FOLDER";
export const RENAME = "RENAME";
export const DELETE = "DELETE";

// ⚙️ Menu context
export const rightClickFileMenu: MenuProps["items"] = [
  {
    key: RENAME,
    label: "Đổi tên",
  },
  {
    key: DELETE,
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
    key: RENAME,
    label: "Đổi tên",
  },
  {
    key: DELETE,
    label: "Xóa",
  },
];
