import "@/config/styleOverride.css";
import { WrapperBase, WrapperDropComponent } from "./WrapperDropComponent";
import clsx from "clsx";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { getSessionCacheValueByKey } from "@/views/main/solution/service";
import { IS_SHOW_BORDER } from "@/config/folder-data/sessionCachingKey";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { DATA_TYPE } from "@/config/sidebar/TypeComponent";
import { StyleHTML } from "@/entity/canvas/StyleHTML";
import { PropComponent } from "@/entity/sidebar/PropComponent";
export interface TextDropPropsCustom extends WrapperBase {
  text: ComponentData;
}

export const TextDrop = ({
  text,
  widthDefault,
  heightDefault,
  ...restProps
}: TextDropPropsCustom) => {
  const sessionCaching = useSelector(
    (state: RootState) => state.global.sessionCaching
  );
  const isShowBorder =
    getSessionCacheValueByKey(sessionCaching, IS_SHOW_BORDER) === "true";
  return (
    <WrapperDropComponent
      widthDefault={widthDefault}
      heightDefault={heightDefault}
      component={text}
      className={clsx(isShowBorder && "dashUnselect")}
    >
      <span>ssdd</span>
    </WrapperDropComponent>
  );
};
export const defaultTextDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.TEXT,
    inlineStyle: [] as StyleHTML[],
    specialProps: [] as PropComponent[],
  } as ComponentData;
};
