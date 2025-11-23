import { getMessageInstance } from "@/config/messageContext";

export const saveData2File = async (
  file: string,
  data: string,
  mess?: string
) => {
  const messageApi = getMessageInstance();
  await window.electronAPI.writeFile(file, data);
  if (mess) {
    messageApi.info(mess);
  }
};
