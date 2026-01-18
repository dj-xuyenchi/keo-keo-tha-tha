import { defaultCss } from "@/config/defaultCss";
import { Form, Select, SelectProps } from "antd";
import "@/config/styleOverride.css";
import { WrapperBase, WrapperDropComponent } from "./WrapperDropComponent";
import {
  ComponentData,
  findParentRowById,
} from "@/entity/canvas/ComponentData";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { SelectCustom } from "../componentCustom/SelectCustom";
import {
  FORM_ITEM_KEY,
  FormItemValue,
} from "@/config/defineSpecialProps/define/common/formItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PLACE_HOLDER_KEY } from "@/config/defineStyle/styles/placeHolder";
export interface SelectPropsCustom extends SelectProps, WrapperBase {
  select: ComponentData;
}

export const SelectDrop = ({
  select,
  style,
  widthDefault,
  ...restProps
}: SelectPropsCustom) => {
  const formItemSetting = select?.specialProps?.find(
    (prop) => prop.key === FORM_ITEM_KEY,
  ) as PropComponent;
  const placeHolder = select?.inlineStyle?.find(
    (prop) => prop.key === PLACE_HOLDER_KEY,
  ) as StyleHTML;
  const canvas = useSelector((state: RootState) => state.canvas);
  let formRowSetting;
  if (formItemSetting) {
    formRowSetting = findParentRowById(canvas.dataWork, select?.id as string);
  }
  return (
    <WrapperDropComponent component={select} widthDefault={widthDefault}>
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
          <SelectCustom
            style={{
              ...defaultCss,
              pointerEvents: "none",
              cursor: "default",
              width: "100%",
            }}
            placeholder={placeHolder ? placeHolder.value : "Lựa chọn"}
            {...restProps}
          />
        </Form.Item>
      ) : (
        <SelectCustom
          style={{
            ...defaultCss,
            pointerEvents: "none",
            cursor: "default",
            width: "100%",
          }}
          size="small"
          placeholder={placeHolder ? placeHolder.value : "Lựa chọn"}
          {...restProps}
        />
      )}
    </WrapperDropComponent>
  );
};
export const defaultSelectDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.SELECT,
    inlineStyle: [] as StyleHTML[],
    specialProps: [] as PropComponent[],
  } as ComponentData;
};
