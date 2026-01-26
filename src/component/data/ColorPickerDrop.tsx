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
import { ColorPicker, ColorPickerProps, Form } from "antd";
export interface ColorPickerDropProps extends ColorPickerProps, WrapperBase {
    colorPicker: ComponentData | null;
}
export const ColorPickerDrop = ({
    colorPicker,
    widthDefault = 40,
    ...restProps
}: ColorPickerDropProps) => {
    const formItemSetting = colorPicker?.specialProps?.find(
        (prop) => prop.key === FORM_ITEM_KEY
    ) as PropComponent;
    const canvas = useSelector((state: RootState) => state.canvas);
    let formRowSetting;
    if (formItemSetting) {
        formRowSetting = findParentRowById(canvas.dataWork, colorPicker?.id as string);
    }

    return (
        <WrapperDropComponent component={colorPicker} widthDefault={widthDefault}>
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

                    <ColorPicker defaultValue="#1677ff" size="small" />
                </Form.Item>
            ) : (
                <ColorPicker defaultValue="#1677ff" size="small" />
            )}
        </WrapperDropComponent>
    );
};
export const defaultColorPickerDropObject = (id: string) => {
    return {
        id: id,
        type: DATA_TYPE.COLOR_PICKER,
        inlineStyle: [] as StyleHTML[],
    } as ComponentData;
};

