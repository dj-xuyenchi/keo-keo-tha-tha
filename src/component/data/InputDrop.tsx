import { InputProps } from "antd/es/input/Input";
import { defaultCss } from "@/config/defaultCss";
import { WrapperBase, WrapperDropComponent } from "./WrapperDropComponent";
import styles from "./style/input.module.scss";

import {
  ComponentData,
  findParentRowById,
} from "@/entity/canvas/ComponentData";
import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { InputCustom } from "../componentCustom/InputCustom";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
import {
  FORM_ITEM_KEY,
  FormItemValue,
} from "@/config/defineSpecialProps/define/common/formItem";
import { PropComponent } from "@/entity/sidebar/PropComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Form } from "antd";
export interface InputDropProps extends InputProps, WrapperBase {
  input: ComponentData | null;
}
export const InputDrop = ({
  input,
  widthDefault,
  ...restProps
}: InputDropProps) => {
  const formItemSetting = input?.specialProps?.find(
    (prop) => prop.key === FORM_ITEM_KEY
  ) as PropComponent;
  const canvas = useSelector((state: RootState) => state.canvas);
  let formRowSetting;
  if (formItemSetting) {
    console.error(formItemSetting);

    formRowSetting = findParentRowById(canvas.dataWork, input?.id as string);
  }

  return (
    <WrapperDropComponent component={input} widthDefault={widthDefault}>
      {formItemSetting ? (
        <Form.Item
          label={(formItemSetting.value as FormItemValue)?.label}
          name={(formItemSetting.value as FormItemValue)?.formVarName}
          required={(formItemSetting.value as FormItemValue)?.requird}
          rules={(formItemSetting.value as FormItemValue)?.valid}
        >
          <InputCustom
            style={{
              ...defaultCss,
              pointerEvents: "none",
              cursor: "default",
            }}
            size="small"
            {...restProps}
          />
        </Form.Item>
      ) : (
        <InputCustom
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
export const defaultInputDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.INPUT,
    inlineStyle: [] as StyleHTML[],
  } as ComponentData;
};

export const inputIgnoreStyle = [];
