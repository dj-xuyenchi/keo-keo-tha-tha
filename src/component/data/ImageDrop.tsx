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
import Image, { ImageProps } from "next/image";

import imageTemplate from "../../../public/template/image.jpg";
export interface ImaggeDropProps extends WrapperBase {
  image: ComponentData | null;
}
export const ImageDrop = ({
  image,
  widthDefault,
  ...restProps
}: ImaggeDropProps) => {
  const formItemSetting = image?.specialProps?.find(
    (prop) => prop.key === FORM_ITEM_KEY,
  ) as PropComponent;
  const canvas = useSelector((state: RootState) => state.canvas);
  let formRowSetting;
  if (formItemSetting) {
    formRowSetting = findParentRowById(canvas.dataWork, image?.id as string);
  }

  return (
    <WrapperDropComponent component={image} widthDefault={widthDefault}>
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
          <Image
            src={imageTemplate}
            height={60}
            width={60}
            alt="img"
            style={{
              ...defaultCss,
              pointerEvents: "none",
              cursor: "default",
            }}
          />
        </Form.Item>
      ) : (
        <Image
          src={imageTemplate}
          alt="img"
          height={60}
          width={60}
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
export const defaultImageDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.IMAGE,
    inlineStyle: [] as StyleHTML[],
  } as ComponentData;
};

export const inputIgnoreStyle = [];
