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
import { buildStyle } from "@/config/defineStyle/styleHTML";
import { Switch } from "antd";
export interface SwitchDropPropsCustom extends WrapperBase {
  switchComponent: ComponentData;
}

export const SwitchDrop = ({
  switchComponent,
  widthDefault,
  heightDefault,
  ...restProps
}: SwitchDropPropsCustom) => {
  const inlineStyle = buildStyle(switchComponent);
  console.error(inlineStyle);

  const sessionCaching = useSelector(
    (state: RootState) => state.global.sessionCaching
  );
  const isShowBorder =
    getSessionCacheValueByKey(sessionCaching, IS_SHOW_BORDER) === "true";

  return (
    <WrapperDropComponent
      widthDefault={widthDefault}
      heightDefault={heightDefault}
      component={switchComponent}
      className={clsx(isShowBorder && "dashUnselect")}
      style={{
        display: "inline-block",
      }}
    >
      <Switch
        style={{
          ...inlineStyle,
        }}
      ></Switch>
    </WrapperDropComponent>
  );
};
export const defaultSwitchDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.SWITCH,
    inlineStyle: [] as StyleHTML[],
    specialProps: [] as PropComponent[],
  } as ComponentData;
};
