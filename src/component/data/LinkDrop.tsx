import { InputProps } from "antd/es/input/Input";
import { defaultCss } from "@/config/defaultCss";
import { WrapperBase, WrapperDropComponent } from "./WrapperDropComponent";

import {
  ComponentData,
  findParentRowById,
} from "@/entity/canvas/ComponentData";
import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
export interface LinkDropProps extends InputProps, WrapperBase {
  link: ComponentData | null;
}
export const LinkDrop = ({
  link,
  widthDefault,
  ...restProps
}: LinkDropProps) => {
  const canvas = useSelector((state: RootState) => state.canvas);

  return (
    <WrapperDropComponent component={link} widthDefault={widthDefault}>
      <span>About</span>
    </WrapperDropComponent>
  );
};
export const defaultLinkDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.LINK,
    inlineStyle: [] as StyleHTML[],
  } as ComponentData;
};

export const inputIgnoreStyle = [];
