export type CallBacks = {
  handleOpenModal: () => void;
};

export const getColumns = ({ handleOpenModal }: CallBacks) => [
  {
    title: "Thuộc tính",
    dataIndex: "name",
    key: "name",
    width: "50%",
    render: (value: string, record, index: number) => (
      //       <TableLabelCustom>{index + 1}</TableLabelCustom>
      <></>
    ),
  },
  {
    title: "Giá trị",
    dataIndex: "value",
    key: "value",
    width: "50%",
    render: (value: string, record, index: number) => (
      //       <TableLabelCustom>{value}</TableLabelCustom>
      <span onClick={handleOpenModal}>ss</span>
    ),
  },
];
