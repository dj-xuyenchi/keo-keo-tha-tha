import React, { ReactNode } from "react";
import { Form, FormProps } from "antd";

export interface FormCustom extends FormProps {
  children?: ReactNode | ((formInstance: object) => ReactNode);
}

export const FormCustom = ({ children, form, ...restProps }: FormCustom) => {
  return (
    <Form {...restProps} form={form}>
      {children as React.ReactNode}
    </Form>
  );
};
