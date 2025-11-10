import { getMessageInstance } from "@/config/messageContext";

export const saveData2File = async (file: string, data: string) => {
    const messageApi = getMessageInstance();
    await window.electronAPI.writeFile(file, data);
    messageApi.info("Lưu file thành công!")
}