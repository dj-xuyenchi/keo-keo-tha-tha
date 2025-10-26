import { message } from "antd";
import type { MessageInstance } from "antd/es/message/interface";

let messageApi: MessageInstance;

export const setMessageInstance = () => {
  const [api, contextHolder] = message.useMessage();
  messageApi = api;
  return contextHolder;
};

export const getMessageInstance = () => {
  if (!messageApi) {
    throw new Error("Message instance chưa được khởi tạo!");
  }
  return messageApi;
};
