import { InputProps } from "antd/es/input/Input";
import { defaultCss } from "@/config/defaultCss";
import { WrapperBase, WrapperDropComponent } from "./WrapperDropComponent";
import styles from "./style/input.module.scss";

import {
  ComponentData,
  findParentRowById,
} from "@/entity/canvas/ComponentData";
import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
import {
  FORM_ITEM_KEY,
  FormItemValue,
} from "@/config/defineSpecialProps/define/common/formItem";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Form } from "antd";
import { DropdownCustom } from "../componentCustom/DropdownCustom";
export interface DropdownDropProps extends InputProps, WrapperBase {
  dropdown: ComponentData | null;
}
export const DropdownDrop = ({
  dropdown,
  widthDefault,
  ...restProps
}: DropdownDropProps) => {
  const formItemSetting = dropdown?.specialProps?.find(
    (prop) => prop.key === FORM_ITEM_KEY
  ) as PropComponent;
  const canvas = useSelector((state: RootState) => state.canvas);
  let formRowSetting;
  if (formItemSetting) {
    formRowSetting = findParentRowById(canvas.dataWork, dropdown?.id as string);
  }

  return (
    <WrapperDropComponent component={dropdown} widthDefault={widthDefault}>
      {formItemSetting ? (
        <Form.Item
          label={
            <span style={{ fontSize: 12, fontWeight: 600 }}>
              {(formItemSetting.value as FormItemValue)?.label}
            </span>
          }
          name={(formItemSetting.value as FormItemValue)?.formVarName}
          required={(formItemSetting.value as FormItemValue)?.requird}
        >
          <DropdownCustom
            style={{
              ...defaultCss,
              pointerEvents: "none",
              cursor: "default",
            }}
            {...restProps}
          />
        </Form.Item>
      ) : (
        <DropdownCustom
          style={{
            ...defaultCss,
            pointerEvents: "none",
            cursor: "default",
          }}
          size="small"
          {...restProps}
        />
      )}
    </WrapperDropComponent>
  );
};
export const defaultDropdownDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.DROP_DOWN,
    inlineStyle: [] as StyleHTML[],
  } as ComponentData;
};

export const dropdownIgnoreStyle = [];
