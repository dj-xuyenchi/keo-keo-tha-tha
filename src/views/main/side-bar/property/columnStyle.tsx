import { InputCustom } from "@/component/componentCustom/InputCustom";
import { getPlaceHolder } from "@/config/defineSpecialProps/getPlaceHolder";
import { getTooltip } from "@/config/defineSpecialProps/getTooltip";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
export type CallBacks = {
  handleOpenModal: () => void;
  handleSetValueStyle: (record: StyleHTML, value: string | boolean) => void;
};

export const getColumnStyle = ({
  handleOpenModal,
  handleSetValueStyle,
}: CallBacks) => [
  {
    title: "Thuộc tính",
    dataIndex: "name",
    key: "name",
    width: "50%",
    render: (value: string, record: StyleHTML, index: number) => (
      <span
        style={{
          marginLeft: "12px",
        }}
      >
        {record.name}
        <Tooltip placement="top" title={getTooltip(record.key)}>
          <QuestionCircleOutlined
            style={{
              marginLeft: "4px",
            }}
          />
        </Tooltip>
      </span>
    ),
  },
  {
    title: "Giá trị",
    dataIndex: "value",
    key: "value",
    width: "50%",
    render: (value: string, record: StyleHTML, index: number) => (
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <InputCustom
          placeholder={"Nhập giá trị"}
          defaultValue={record.value as string}
          onBlur={(e) => {
            const value = (e.target as HTMLInputElement).value;
            handleSetValueStyle(record, value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = (e.target as HTMLInputElement).value;
              handleSetValueStyle(record, value);
            }
          }}
        />
      </div>
    ),
  },
];
