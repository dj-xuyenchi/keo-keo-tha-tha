import { InputCustom } from "@/component/componentCustom/InputCustom";
import { InputNumberCustom } from "@/component/componentCustom/InputNumberCustom";
import { SelectCustom } from "@/component/componentCustom/SelectCustom";
import { getOptionSelect } from "@/config/defineSpecialProps/getOptionSelect";
import { getPlaceHolder } from "@/config/defineSpecialProps/getPlaceHolder";
import { getTooltip } from "@/config/defineSpecialProps/getTooltip";
import { getValueFlex } from "@/config/defineSpecialProps/getValueFlex";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Switch, Tooltip } from "antd";
export type CallBacks = {
  handleOpenModal: (record: PropComponent) => void;
  handleSetValue: (record: PropComponent, value: string | boolean) => void;
};

export const getColumns = ({ handleOpenModal, handleSetValue }: CallBacks) => [
  {
    title: "Thuộc tính",
    dataIndex: "name",
    key: "name",
    width: "50%",
    render: (value: string, record: PropComponent, index: number) => (
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
    render: (value: string, record: PropComponent, index: number) => (
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {record.valueType == "select" && (
          <SelectCustom
            defaultValue={record.value}
            options={getOptionSelect(record.key)}
            onChange={(value: string) => {
              handleSetValue(record, value);
            }}
            placeholder="Chọn giá trị"
          />
        )}
        {record.valueType == "flex" && (
          <InputCustom
            defaultValue={getValueFlex(record)}
            onClick={() => {
              handleOpenModal(record);
            }}
            placeholder={getPlaceHolder(record.key)}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          />
        )}
        {record.valueType == "number" && (
          <InputNumberCustom
            status="error"
            placeholder={getPlaceHolder(record.key)}
          />
        )}
        {record.valueType == "string" && (
          <InputCustom
            placeholder={getPlaceHolder(record.key)}
            defaultValue={record.value as string}
            onBlur={(e) => {
              const value = (e.target as HTMLInputElement).value;
              handleSetValue(record, value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = (e.target as HTMLInputElement).value;
                handleSetValue(record, value);
              }
            }}
          />
        )}
        {record.valueType == "switch" && (
          <Switch
            defaultChecked={record.value as boolean}
            size="small"
            onChange={(e) => {
              handleSetValue(record, e);
            }}
          />
        )}
      </div>
    ),
  },
];
