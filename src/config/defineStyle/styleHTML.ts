import { StyleHTML } from "@/entity/canvas/StyleHTML";
import { marginGroupStyle } from "./styles/margin";
import { widthGroupStyle } from "./styles/width";
import { heightGroupStyle } from "./styles/height";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { paddingGroupStyle } from "./styles/padding";
import { displayGroupStyle } from "./styles/display";
import { textAlignGroupStyle } from "./styles/textAlign";

export const styleHTML = [
  ...marginGroupStyle,
  ...widthGroupStyle,
  ...textAlignGroupStyle,
  ...heightGroupStyle,
  ...paddingGroupStyle,
  ...displayGroupStyle,
] as StyleHTML[];

export const buildStyle = (component: ComponentData) => {
  const styles = component.inlineStyle;
  if (!styles) {
    return {};
  }
  return styles.reduce((pre, next) => {
    const style = styleHTML.find((s) => {
      return s.key === next.key;
    });
    if (!style) {
      return {};
    }
    return {
      ...pre,
      [style?.reactObjectName]:
        next.value + `${next.isImportant ? " !important" : ""}`,
    };
  }, {} as React.CSSProperties);
};
