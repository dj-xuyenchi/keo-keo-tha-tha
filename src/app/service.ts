import { FOLDER_LIST } from "@/config/folder-data/folderDataLocation";
import { FileInfo } from "@/entity/fileHandler/FileInfo";
import { saveData2File } from "@/views/main/ribbon-menu/service";
import { GlobalData } from "./globalSlice";
import { DataWork, FileChossing } from "@/views/main/canvas/canvasSlice";

import cloneDeep from "lodash/cloneDeep";
import { SESSION_CACHING_JSON } from "@/config/folder-data/fileType";
export const getAllFile = async () => {
  let res = [] as FileInfo[];
  for (const folder of FOLDER_LIST) {
    const files = await window.electronAPI.listFiles(folder);

    const fileInfos = await Promise.all(
      files.map(async (item) => {
        const fileData = await window.electronAPI.readFile(
          folder + "/" + item.name
        );
        return {
          name: item.name,
          size: item.size,
          key: item.name.split(".")[0],
          folderName: folder,
          content: fileData,
        } as FileInfo;
      })
    );

    res = [...res, ...fileInfos];
  }

  return res;
};

export const getSessionCachingData = async () => {
  const sessionCachingData = await window.electronAPI.readFile(
    SESSION_CACHING_JSON
  );
  return JSON.parse(sessionCachingData)
}

export const handleCommandCtrlS = (
  event: KeyboardEvent,
  global: GlobalData,
  canvas: FileChossing
) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    const saveList = cloneDeep(canvas.dataWorkList) as DataWork[];
    const file = global.fileList.find((item: FileInfo) => {
      return item.key === canvas.fileData.key;
    });
    const thisFile = {
      key: file?.key as string,
      data: canvas.dataWork,
    };
    const check = saveList.find((item) => {
      return item.key === thisFile.key;
    });
    if (check) {
      check.data = thisFile.data;
    } else {
      saveList.push(thisFile);
    }
    for (const work of saveList) {
      try {
        const file = global.fileList.find((item) => {
          return item.key == work.key;
        });
        if (file) {
          saveData2File(
            file.folderName + "/" + file.name,
            JSON.stringify(work.data)
          );
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
};
