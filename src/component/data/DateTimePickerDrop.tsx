import { defaultCss } from "@/config/defaultCss";
import { WrapperBase, WrapperDropComponent } from "./WrapperDropComponent";
import styles from "./style/input.module.scss";

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
import { DatePickerProps, Form } from "antd";
import { DatetimePickerCustom } from "../componentCustom/DateTimePickerCustom";
export interface DatetimePickerDropProps extends DatePickerProps, WrapperBase {
    datetimePicker: ComponentData | null;
}
export const DatetimePickerDrop = ({
    datetimePicker,
    widthDefault,
    ...restProps
}: DatetimePickerDropProps) => {
    const formItemSetting = datetimePicker?.specialProps?.find(
        (prop) => prop.key === FORM_ITEM_KEY
    ) as PropComponent;
    const canvas = useSelector((state: RootState) => state.canvas);
    let formRowSetting;
    if (formItemSetting) {
        formRowSetting = findParentRowById(canvas.dataWork, datetimePicker?.id as string);
    }

    return (
        <WrapperDropComponent component={datetimePicker} widthDefault={widthDefault}>
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
                    <DatetimePickerCustom
                        style={{
                            ...defaultCss,
                            pointerEvents: "none",
                            cursor: "default",
                        }}
                        {...restProps}
                    />
                </Form.Item>
            ) : (
                <DatetimePickerCustom
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
export const defaultDatetimePickerDropObject = (id: string) => {
    return {
        id: id,
        type: DATA_TYPE.DATE_PICKER,
        inlineStyle: [] as StyleHTML[],
    } as ComponentData;
};

export const inputIgnoreStyle = [];
