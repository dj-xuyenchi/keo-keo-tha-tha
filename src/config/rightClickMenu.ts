import { MenuProps } from "antd";
export const ADD_FILE = "ADD_FILE";
export const ADD_FOLDER = "ADD_FOLDER";
export const RENAME = "RENAME";
export const DELETE = "DELETE";
export const COPY = "COPY";
export const PASTE = "PASTE";

// ⚙️ Menu context
export const rightClickFileMenu: MenuProps["items"] = [
  {
    key: COPY,
    label: "Sao chép",
    disabled: false,
  },
  {
    key: RENAME,
    label: "Đổi tên",
    disabled: false,
  },
  {
    key: DELETE,
    label: "Xóa",
    disabled: false,
  },
];

export const rightClickFolderMenu: MenuProps["items"] = [
  {
    key: ADD_FILE,
    label: "Tạo file",
    disabled: false,
  },
  {
    key: ADD_FOLDER,
    label: "Tạo thư mục mới",
    disabled: false,
  },
  {
    key: COPY,
    label: "Sao chép",
    disabled: false,
  },
  {
    key: PASTE,
    label: "Dán",
    disabled: false,
  },
  {
    key: RENAME,
    label: "Đổi tên",
    disabled: false,
  },
  {
    key: DELETE,
    label: "Xóa",
    disabled: false,
  },
];
