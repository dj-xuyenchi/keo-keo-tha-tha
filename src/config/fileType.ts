export const SOLUTION_JSON = "solution.json";

export const TYPE_SCRIPT = "typescript";
export const JAVA_SCRIPT = "javascript";
export const REACT = "react";
export const CSS = "css";
export const SASS = "sass";
export const SPRING = "spring";
export const JSON = "json";

export const FOLDER = "folder";

export const FILE_TYPE_LIST = [REACT, TYPE_SCRIPT, SASS, CSS];
export const TYPE_LIST = [REACT, TYPE_SCRIPT, SASS, CSS, FOLDER];

export const getSuffixFileType = (type: string): string => {
  switch (type) {
    case TYPE_SCRIPT:
      return ".ts";
    case JAVA_SCRIPT:
      return ".js";
    case REACT:
      return ".tsx";
    case CSS:
      return ".css";
    case SASS:
      return ".module.scss";
    case SPRING:
      return ".java";
    case JSON:
      return ".json";
    default:
      return "Lỗi";
  }
};

// Key các folder gốc của project
export const UI_FOLDER_KEY = "0-0-0";
export const UTIL_FOLDER_KEY = "1-0-0";
export const CONFIG_FOLDER_KEY = "2-0-0";
export const ROOT_FOLDER = [UI_FOLDER_KEY, UTIL_FOLDER_KEY, CONFIG_FOLDER_KEY];
