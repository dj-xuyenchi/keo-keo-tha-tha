import { DatePicker, DatePickerProps } from "antd";

export interface DatetimePickerCustomProps extends DatePickerProps {
    // 
    sss?: string
}

export const DatetimePickerCustom = ({
    ...restProps
}: DatetimePickerCustomProps) => {
    return <DatePicker {...restProps} />;
};
