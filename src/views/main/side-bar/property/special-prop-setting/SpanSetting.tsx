import clsx from "clsx";
import { useState } from "react";
import { SpanValue } from "@/config/defineSpecialProps/define/span";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Form } from "antd";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { InputNumberCustom } from "@/component/componentCustom/InputNumberCustom";
// Breakpoint	Kích thước màn hình	Ý nghĩa
// xs   < 576px	Mobile nhỏ
// sm	≥ 576px	Mobile to
// md	≥ 768px	Tablet
// lg	≥ 992px	Laptop nhỏ
// xl	≥ 1200px	Laptop to / desktop
// xxl
export const SpanSetting = () => {
    const [spanSetting, setSpanSetting] = useState({} as SpanValue)
    const sideBar = useSelector(
        (state: RootState) => state.sideBar
    );
    const [form] = Form.useForm();
    const handleSubmit = () => { }
    return (
        <div style={{
            width: "200px"
        }}>
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item tooltip="Số cột với tỷ lệ màn xs < 576px	Mobile nhỏ" name="xs" label="xs" rules={[{ required: true }]}>
                    <InputNumberCustom style={{
                        width: "100%"
                    }} />
                </Form.Item>
                <Form.Item tooltip="Số cột với tỷ lệ màn sm	≥ 576px	Mobile to" name="sm" label="sm" rules={[{ required: true }]}>
                    <InputNumberCustom style={{
                        width: "100%"
                    }} />
                </Form.Item>
                <Form.Item tooltip="Số cột với tỷ lệ màn md	≥ 768px	Tablet" name="md" label="md" rules={[{ required: true }]}>
                    <InputNumberCustom style={{
                        width: "100%"
                    }} />
                </Form.Item>
                <Form.Item tooltip="Số cột với tỷ lệ màn lg	≥ 992px	Laptop nhỏ" name="lg" label="lg" rules={[{ required: true }]}>
                    <InputNumberCustom style={{
                        width: "100%"
                    }} />
                </Form.Item>
                <Form.Item tooltip="Số cột với tỷ lệ màn xl	≥ 1200px Laptop to / desktop" name="xl" label="xl" rules={[{ required: true }]}>
                    <InputNumberCustom style={{
                        width: "100%"
                    }} />
                </Form.Item>
                <Form.Item tooltip="Số cột với tỷ lệ màn xxl" name="xxl" label="xxl" rules={[{ required: true }]}>
                    <InputNumberCustom style={{
                        width: "100%"
                    }} />
                </Form.Item>
            </Form>
        </div>
    );
};
