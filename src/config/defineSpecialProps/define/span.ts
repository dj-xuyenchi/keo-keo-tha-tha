import { GENERAL_TYPE } from "@/config/sidebar/TypeComponent";
import { PropComponent } from "@/entity/sidebar/PropComponent";

export const SPAN_KEY = "SPAN_KEY";
export const span = {
    name: "span",
    key: SPAN_KEY,
    valueType: "flex",
    apply: [GENERAL_TYPE.COL],
    valid: (value: string) => {
        if (!value) {
            return false;
        }

        return true;
    },
    value: {} as SpanValue,
    tooltip: "Giá trị trong khoảng từ 1 - 24"
} as PropComponent;

export interface SpanValue {
    // Breakpoint	Kích thước màn hình	Ý nghĩa
    // xs   < 576px	Mobile nhỏ
    // sm	≥ 576px	Mobile to
    // md	≥ 768px	Tablet
    // lg	≥ 992px	Laptop nhỏ
    // xl	≥ 1200px	Laptop to / desktop
    // xxl
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}

export const spanGroup = [span]