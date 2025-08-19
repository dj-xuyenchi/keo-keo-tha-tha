import { Input, Table, TableProps } from "antd";

export const TableDrop = () => {
  const columns: TableProps["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
  ];
  return (
    <>
      <Table bordered columns={columns} dataSource={data} />
    </>
  );
};
