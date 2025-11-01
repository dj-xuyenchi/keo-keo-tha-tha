import { CanvasUI } from "@/entity/canvas/CanvasUI";
import { createSlice } from "@reduxjs/toolkit";

const init = {
  fileData: {} as CanvasUI,
  typeCanvas: "UI" as TypeCanvas,
} as FileChossing;

export interface FileChossing {
  fileData: CanvasUI;
}
export type TypeCanvas = "CODE" | "UI";

const canvasSlice = createSlice({
  name: "canvas",
  initialState: init,
  reducers: {
    setFileClick: (state, action) => {
      state.fileData = action.payload;
    },
  },
});

export const { setFileClick } = canvasSlice.actions;

export default canvasSlice.reducer;
