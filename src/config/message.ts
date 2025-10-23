import { message } from "antd";

// Cấu hình global cho message
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

export default message;
