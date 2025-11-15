import { IconFileFolder } from "@/component/icon-foulder/IconFileFolder";
import { CSS, JAVA_SCRIPT, REACT, SASS, TYPE_SCRIPT } from "@/config/folder-data/fileType";
import {
  CSS_DATA,
  JS_DATA,
  SCSS_DATA,
  TS_DATA,
  UI_DATA,
} from "@/config/folder-data/folderDataLocation";
import { LAST_OPEN_FILE } from "@/config/folder-data/sessionCachingKey";
import { SessionCaching } from "@/entity/fileHandler/SessionCaching";
import { TreeNodeProps } from "antd";
import React from "react";
export const getNodeOpenIcon = (node: TreeNodeProps) => {
  const open = node.expanded;
  switch (node.data.key) {
    case "0-0-0":
      return open
        ? React.createElement(IconFileFolder, {
          icon: "uiOpen",
          height: 18,
          width: 18,
        })
        : React.createElement(IconFileFolder, {
          icon: "ui",
          height: 18,
          width: 18,
        });
    case "1-0-0":
      return open
        ? React.createElement(IconFileFolder, {
          icon: "utilOpen",
          height: 18,
          width: 18,
        })
        : React.createElement(IconFileFolder, {
          icon: "util",
          height: 18,
          width: 18,
        });

    case "2-0-0":
      return open
        ? React.createElement(IconFileFolder, {
          icon: "settingOpen",
          height: 18,
          width: 18,
        })
        : React.createElement(IconFileFolder, {
          icon: "setting",
          height: 18,
          width: 18,
        });

    default:
      return open
        ? React.createElement(IconFileFolder, {
          icon: "openFolder",
          height: 18,
          width: 18,
        })
        : React.createElement(IconFileFolder, {
          icon: "folder1",
          height: 18,
          width: 18,
        });
  }
};

export const createFile = async (
  fileName: string,
  fileType: string,
  initContent: string
) => {
  let folder = "";
  switch (fileType) {
    case TYPE_SCRIPT: {
      folder = `${TS_DATA}/`;
      break;
    }
    case REACT: {
      folder = `${UI_DATA}/`;
      break;
    }
    case CSS: {
      folder = `${CSS_DATA}/`;
      break;
    }
    case SASS: {
      folder = `${SCSS_DATA}/`;
      break;
    }
    case JAVA_SCRIPT: {
      folder = `${JS_DATA}/`;
      break;
    }
    default:
      break;
  }
  return await window.electronAPI.createFile(
    folder + fileName + ".json",
    initContent
  );
};
export const deleteFile = async (fileKey: string, fileType: string) => {
  let folder = "";
  switch (fileType) {
    case TYPE_SCRIPT: {
      folder = `${TS_DATA}/`;
      break;
    }
    case REACT: {
      folder = `${UI_DATA}/`;
      break;
    }
    case CSS: {
      folder = `${CSS_DATA}/`;
      break;
    }
    case SASS: {
      folder = `${SCSS_DATA}/`;
      break;
    }
    case JAVA_SCRIPT: {
      folder = `${JS_DATA}/`;
      break;
    }
    default:
      break;
  }
  return await window.electronAPI.deleteFile(folder + fileKey + ".json");
};


export const getSessionCacheValueByKey = (sessionCaching: SessionCaching[], key: string): string => {
  if (sessionCaching.length > 0) {
    const file = sessionCaching.find((item) => {
      return item.key === key
    })
    if (file) {
      return file.value
    } else {
      return ''
    }
  } else {
    return ''
  }
}