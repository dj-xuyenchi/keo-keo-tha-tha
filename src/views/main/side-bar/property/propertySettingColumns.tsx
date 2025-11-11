import { InputCustom } from "@/component/componentCustom/InputCustom";
import { SelectCustom } from "@/component/componentCustom/SelectCustom";
import { SettingOutlined } from "@ant-design/icons";
export const propertySettingColumns = [
  {
    title: "",
    dataIndex: "name",
    key: "name",
    render: (text: string) => (
      <span style={{ marginLeft: "12px" }}>{text}</span>
    ),
  },
];

export const propertyDetailColumns = [
  {
    title: "Thuộc tính",
    dataIndex: "property",
    key: "property",
    width: "50%",
    render: (value: string) => (
      <span style={{ marginLeft: "12px" }}>{value}</span>
    ),
  },
  {
    title: "Giá trị",
    dataIndex: "value",
    key: "value",
    width: "50%",
    render: (value: string, o: object, index: number) => (
      <>
        {index % 2 == 0 && <InputCustom placeholder="Giá trị" />}
        {index % 2 == 1 && <SelectCustom placeholder="Giá trị" />}
      </>
    ),
  },
];
