import { setSelectComponent } from "@/views/main/canvas/canvasSlice";
import { useDispatch } from "react-redux";

export const useSelectComponent = () => {
    const dispatch = useDispatch();

    const select = (id: string) => {
        dispatch(setSelectComponent(id));
    };

    return { select };
}