import { InputCustom } from "@/component/componentCustom/InputCustom";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export type CallBacks = {
  handleOpenModal: (record: PropComponent) => void;
};

export const getColumns = ({ handleOpenModal }: CallBacks) => [
  {
    title: "Thuộc tính",
    dataIndex: "name",
    key: "name",
    width: "50%",
    render: (value: string, record: PropComponent, index: number) => (
      <span style={{
        marginLeft: "12px"
      }}>{record.name}</span>
    ),
  },
  {
    title: "Giá trị",
    dataIndex: "value",
    key: "value",
    width: "50%",
    render: (value: string, record: PropComponent, index: number) => (
      <div style={{
        height: "100%",
        width: "100%"
      }}>
        {record.valueType == 'flex' && <InputCustom
          onClick={() => {
            handleOpenModal(record)
          }}
          placeholder="Giá trị"
          onMouseDown={(e) => {
            e.preventDefault()
          }}
        />}
      </div >
    ),
  },
];
