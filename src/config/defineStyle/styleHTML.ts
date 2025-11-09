import { StyleHTML } from "@/entity/canvas/StyleHTML";
import { margrin, margrinBottom } from "./styles/margin";
import { InlineStyle } from "@/entity/canvas/InlineStyle";

export const styleHTML = [margrin, margrinBottom] as StyleHTML[];

export const buildStyle = (styles: InlineStyle[]) => {
  if (!styles) {
    return {};
  }
  return styles.reduce((pre, next) => {
    const style = styleHTML.find((s) => {
      return s.key === next.styleKey;
    });
    if (!style) {
      return {};
    }
    return {
      ...pre,
      [style?.reactObjectName]: next.value,
    };
  }, {} as React.CSSProperties);
};
