import { FOLDER_LIST } from "@/config/folderDataLocation";
import { FileInfo } from "@/entity/fileHandler/FileInfo";
import { saveData2File } from "@/views/main/ribbon-menu/service";
import { GlobalData } from "./globalSlice";
import { FileChossing } from "@/views/main/canvas/canvasSlice";
import { getMessageInstance } from "@/config/messageContext";

export const getAllFile = async () => {
  let res = [] as FileInfo[];
  for (const folder of FOLDER_LIST) {
    const files = await window.electronAPI.listFiles(folder);

    const fileInfos = await Promise.all(
      files.map(async (item) => {
        const fileData = await window.electronAPI.readFile(folder + "/" + item.name);
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


export const handleCommandCtrlS = (event: KeyboardEvent, global: GlobalData, canvas: FileChossing) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {

    event.preventDefault();
    const messageApi = getMessageInstance();
    const file = global.fileList?.find((item: FileInfo) => {
      return item.key === canvas.fileData.key;
    });
    if (!file) {
      messageApi.error("Không xác định được file đang làm việc!");
      return
    }
    saveData2File(file.folderName + "/" + file.name, JSON.stringify(canvas.dataWork))
  }
}


