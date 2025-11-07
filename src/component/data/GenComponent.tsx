import { LAYOUT_TYPE, TYPE_DROP } from "@/config/TypeComponent";
import { Row } from "antd";
export interface GenComponentProps {
    type: TYPE_DROP;
}
export const GenComponent = ({ type, ...restProps }: GenComponentProps) => {
    switch (type) {
        case LAYOUT_TYPE.ROW: {
            return <>
                <Row >

                </Row>
            </>
        }


        default: {
            return <>
            </>
        }
    }
};
