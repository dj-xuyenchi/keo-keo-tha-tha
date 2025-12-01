import { defaultCss } from "@/config/defaultCss";
import { WrapperBase, WrapperDropComponent } from "./WrapperDropComponent";
import styles from "./style/input.module.scss";

import {
  ComponentData,
  findParentRowById,
} from "@/entity/canvas/ComponentData";
import { DATA_TYPE, GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
import {
  FORM_ITEM_KEY,
  FormItemValue,
} from "@/config/defineSpecialProps/define/common/formItem";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ButtonProps, Form } from "antd";
import { ButtonCustom } from "../componentCustom/ButtonCustom";
export interface ButtonDropProps extends ButtonProps, WrapperBase {
  button: ComponentData | null;
}
export const ButtonDrop = ({
  button,
  widthDefault,
  ...restProps
}: ButtonDropProps) => {
  const formItemSetting = button?.specialProps?.find(
    (prop) => prop.key === FORM_ITEM_KEY
  ) as PropComponent;
  const canvas = useSelector((state: RootState) => state.canvas);
  let formRowSetting;
  if (formItemSetting) {
    formRowSetting = findParentRowById(canvas.dataWork, button?.id as string);
  }

  return (
    <WrapperDropComponent component={button} widthDefault={widthDefault}>
      {formItemSetting ? (
        <Form.Item
          label={
            <span style={{ fontSize: 12, fontWeight: 600 }}>
              {(formItemSetting.value as FormItemValue)?.label}
            </span>
          }
          name={(formItemSetting.value as FormItemValue)?.formVarName}
          required={(formItemSetting.value as FormItemValue)?.requird}
          rules={(formItemSetting.value as FormItemValue)?.valid}
        >
          <ButtonCustom
            style={{
              ...defaultCss,
              pointerEvents: "none",
              cursor: "default",
            }}
            {...restProps}
          />
        </Form.Item>
      ) : (
        <ButtonCustom
          style={{
            ...defaultCss,
            pointerEvents: "none",
            cursor: "default",
          }}
          size="small"
          title="Click me!"
          {...restProps}
        />
      )}
    </WrapperDropComponent>
  );
};
export const defaultButtonDropObject = (id: string) => {
  return {
    id: id,
    type: GENERAL_TYPE.BUTTON,
    inlineStyle: [] as StyleHTML[],
  } as ComponentData;
};

export const inputIgnoreStyle = [];
