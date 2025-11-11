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
    render: (value: string) => (
      <span style={{ marginLeft: "12px" }}>{value}</span>
    ),
  },
];
