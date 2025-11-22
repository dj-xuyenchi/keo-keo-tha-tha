import { InputCustom } from "@/component/componentCustom/InputCustom";
import { InputNumberCustom } from "@/component/componentCustom/InputNumberCustom";
import { SelectCustom } from "@/component/componentCustom/SelectCustom";
import { PropComponent } from "@/entity/sidebar/PropComponent";
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
    dataIndex: "name",
    key: "name",
    width: "50%",
    render: (value: string, record: PropComponent) => (
      <span style={{ marginLeft: "12px" }}>{value}</span>
    ),
  },
  {
    title: "Giá trị",
    dataIndex: "value",
    key: "value",
    width: "50%",
    render: (value: string, record: PropComponent, index: number) => (
      <>
        {record.valueType == "string" && <InputCustom placeholder="Giá trị" />}
        {record.valueType == "flex" && (
          <InputCustom
            onClick={() => {}}
            placeholder="Giá trị"
            onMouseDown={(e) => e.preventDefault()}
          />
        )}
        {record.valueType == "number" && (
          <InputNumberCustom placeholder="Giá trị" />
        )}
        {record.valueType == "select" && <SelectCustom placeholder="Giá trị" />}
      </>
    ),
  },
];
