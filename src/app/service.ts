import { FOLDER_LIST } from "@/config/folderDataLocation";
import { FileInfo } from "@/entity/fileHandler/FileInfo";

export const getAllFile = async () => {
  let res = [] as FileInfo[];
  for (const folder of FOLDER_LIST) {
    const files = await window.electronAPI.listFiles(folder);

    res = [
      ...res,
      ...files.map((item) => {
        return {
          name: item.name,
          size: item.size,
          key: item.name,
          folderName: folder,
          content: "",
        } as FileInfo;
      }),
    ];
  }

  return res;
};
