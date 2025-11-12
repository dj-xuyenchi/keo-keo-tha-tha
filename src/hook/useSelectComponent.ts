import { ComponentData } from "@/entity/canvas/ComponentData";
import { setSelectComponent } from "@/views/main/canvas/canvasSlice";
import { useDispatch } from "react-redux";

export const useSelectComponent = () => {
  const dispatch = useDispatch();

  const select = (component: ComponentData) => {
    dispatch(setSelectComponent(component));
  };

  return { select };
};
