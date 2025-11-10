import "@/config/styleOverride.css";
import styles from './style/wrapperDropComponent.module.scss'
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useSelectComponent } from "@/hook/useSelectComponent";

export interface WrapperDropComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string
    children: React.ReactNode
}

export const WrapperDropComponent = ({
    id,
    children,
    style,
    className, ...restProps }: WrapperDropComponentProps) => {
    const selectedComponentId = useSelector((state: RootState) => state.canvas.selectedComponentId)
    const { select } = useSelectComponent(); //
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        select(id);
    }
    return (
        <div
            onClick={handleClick}
            className={`${clsx(styles.wrapperContainer, (id && id === selectedComponentId) ? 'selectedComponent' : className)}`}
            style={style}
            {...restProps} // truyền các prop khác như onClick, draggable, v.v.
        >
            {children}
        </div>
    );
};
