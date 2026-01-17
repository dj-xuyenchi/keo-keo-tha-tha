import { InputProps } from "antd/es/input/Input";
import { defaultCss } from "@/config/defaultCss";
import { WrapperBase, WrapperDropComponent } from "./WrapperDropComponent";

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
import { InputNumberCustom } from "../componentCustom/InputNumberCustom";
export interface LinkDropProps extends InputProps, WrapperBase {
  link: ComponentData | null;
}
export const LinkDrop = ({ link, widthDefault, ...restProps }: LinkDropProps) => {
  const formItemSetting = link?.specialProps?.find(
    (prop) => prop.key === FORM_ITEM_KEY
  ) as PropComponent;
  const canvas = useSelector((state: RootState) => state.canvas);
  let formRowSetting;
  if (formItemSetting) {
    formRowSetting = findParentRowById(canvas.dataWork, link?.id as string);
  }

  return (
    <WrapperDropComponent component={link} widthDefault={widthDefault}>
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
          <InputNumberCustom
            style={{
              ...defaultCss,
              pointerEvents: "none",
              cursor: "default",
            }}
          />
        </Form.Item>
      ) : (
        <InputNumberCustom
          style={{
            ...defaultCss,
            pointerEvents: "none",
            cursor: "default",
          }}
          size="small"
        />
      )}
    </WrapperDropComponent>
  );
};
export const defaultLinkDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.INPUT_NUMBER,
    inlineStyle: [] as StyleHTML[],
  } as ComponentData;
};

export const inputIgnoreStyle = [];
