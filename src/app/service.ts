import { FOLDER_LIST } from "@/config/folderDataLocation";
import { FileInfo } from "@/entity/fileHandler/FileInfo";

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
