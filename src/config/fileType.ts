export const TYPE_SCRIPT = "typescript";
export const REACT = "react";
export const CSS = "css";
export const SASS = "sass";
export const FOLDER = "folder";

export const FILE_TYPE_LIST = [REACT, TYPE_SCRIPT, SASS, CSS];
export const TYPE_LIST = [REACT, TYPE_SCRIPT, SASS, CSS, FOLDER];

export const getSuffixFileType = (type: string): string => {
  switch (type) {
    case TYPE_SCRIPT:
      return ".ts";
    case REACT:
      return ".tsx";
    case CSS:
      return ".css";
    case SASS:
      return ".module.scss";
    default:
      return "Lỗi";
  }
};
