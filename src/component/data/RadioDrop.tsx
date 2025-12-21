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
import { TEXT_VALUE_KEY } from "@/config/defineSpecialProps/define/text/textValue";
import { buildStyle } from "@/config/defineStyle/styleHTML";
import { Radio } from "antd";
export interface RadioDropPropsCustom extends WrapperBase {
  radio: ComponentData;
}

export const RadioDrop = ({
  radio,
  widthDefault,
  heightDefault,
  ...restProps
}: RadioDropPropsCustom) => {
  const inlineStyle = buildStyle(radio);
  console.error(inlineStyle);

  const textValue = radio?.specialProps?.find(
    (prop) => prop.key === TEXT_VALUE_KEY
  ) as PropComponent;
  const sessionCaching = useSelector(
    (state: RootState) => state.global.sessionCaching
  );
  const isShowBorder =
    getSessionCacheValueByKey(sessionCaching, IS_SHOW_BORDER) === "true";

  return (
    <WrapperDropComponent
      widthDefault={widthDefault}
      heightDefault={heightDefault}
      component={radio}
      className={clsx(isShowBorder && "dashUnselect")}
      style={{
        display: "inline-block",
      }}
    >
      <Radio
        checked={false}
        style={{
          ...inlineStyle,
        }}
      >
        {textValue ? (textValue.value as string) : "Text"}
      </Radio>
    </WrapperDropComponent>
  );
};
export const defaultRadioDropObject = (id: string) => {
  return {
    id: id,
    type: DATA_TYPE.RADIO,
    inlineStyle: [] as StyleHTML[],
    specialProps: [] as PropComponent[],
  } as ComponentData;
};
