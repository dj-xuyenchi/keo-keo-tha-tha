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
import { TextAreaCustom } from "../componentCustom/TextAreaCustom";
export interface TextAreaDropProps extends WrapperBase {
  textArea: ComponentData | null;
}
export const TextAreaDrop = ({
  textArea,
  widthDefault,
  ...restProps
}: TextAreaDropProps) => {
  const formItemSetting = textArea?.specialProps?.find(
    (prop) => prop.key === FORM_ITEM_KEY
  ) as PropComponent;
  const canvas = useSelector((state: RootState) => state.canvas);
  let formRowSetting;
  if (formItemSetting) {
    formRowSetting = findParentRowById(canvas.dataWork, textArea?.id as string);
  }

  return (
    <WrapperDropComponent component={textArea} widthDefault={widthDefault}>
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
          <TextAreaCustom
            style={{
              ...defaultCss,
              pointerEvents: "none",
              cursor: "default",
            }}
          />
        </Form.Item>
      ) : (
        <TextAreaCustom
          style={{
            ...defaultCss,
            pointerEvents: "none",
            cursor: "default",
          }}
        />
      )}
    </WrapperDropComponent>
  );
};
export const defaultTextAreaDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.RICH_TEXT,
    inlineStyle: [] as StyleHTML[],
  } as ComponentData;
};

export const inputIgnoreStyle = [];
