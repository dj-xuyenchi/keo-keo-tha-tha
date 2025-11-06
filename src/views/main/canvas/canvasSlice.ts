import { CanvasUI } from "@/entity/canvas/CanvasUI";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { createSlice } from "@reduxjs/toolkit";

const init = {
  fileData: {} as CanvasUI,
  dataWork: [{ id: "1", componentChildren: [{}] }] as ComponentData[],
  typeCanvas: "UI" as TypeCanvas,
} as FileChossing;

export interface FileChossing {
  fileData: CanvasUI;
  dataWork: ComponentData[];
}
export type TypeCanvas = "CODE" | "UI";

const canvasSlice = createSlice({
  name: "canvas",
  initialState: init,
  reducers: {
    setFileClick: (state, action) => {
      state.fileData = action.payload;
    },
    setData2Work: (state, action) => {
      state.dataWork = action.payload;
    },
    pushPanel: (state, action) => {
      state.dataWork.push(action.payload);
    },
  },
});

export const { setFileClick, setData2Work, pushPanel } = canvasSlice.actions;

export default canvasSlice.reducer;
