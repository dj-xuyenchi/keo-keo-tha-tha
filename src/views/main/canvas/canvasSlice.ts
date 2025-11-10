import { CanvasUI } from "@/entity/canvas/CanvasUI";
import { ComponentData } from "@/entity/canvas/ComponentData";
import { createSlice } from "@reduxjs/toolkit";

const init = {
  fileData: {} as CanvasUI,
  dataWorkList: [] as DataWork[],
  dataWork: [] as ComponentData[],
  typeCanvas: "UI" as TypeCanvas,
} as FileChossing;

export interface FileChossing {
  fileData: CanvasUI;
  dataWorkList: DataWork[];
  dataWork: ComponentData[];
  undoDataWork?: ChangeDataWork[];
  copyData?: ComponentData;
  selectedComponentId?: string;
}

export interface DataWork {
  key: string;
  data: ComponentData[];
}
export interface ChangeDataWork {
  index: number;
  dataWork: ComponentData[];
}
export type TypeCanvas = "CODE" | "UI";

const canvasSlice = createSlice({
  name: "canvas",
  initialState: init,
  reducers: {
    setFileClick: (state, action) => {
      if (!action.payload) {
        return;
      }
      const fileKey = state.fileData.key;
      if (state.dataWork.length > 0) {
        const change = state.dataWorkList.find((item) => {
          return item.key === fileKey;
        });
        if (change) {
          change.data = state.dataWork;
        } else {
          state.dataWorkList.push({
            key: state.fileData.key,
            data: state.dataWork,
          });
        }
      }

      const file = state.dataWorkList.find((item) => {
        return item.key === action.payload.key;
      });
      if (file) {
        state.dataWork = file.data;
      } else {
        let parseData;
        try {
          parseData = JSON.parse(action.payload.content);
        } catch (e) {
          parseData = [];
        }
        state.dataWork = parseData;
        state.dataWorkList.push({ key: action.payload.key, data: parseData });
      }
      state.fileData = { key: action.payload.key };
    },
    setData2Work: (state, action) => {
      state.dataWork = action.payload;
    },
    pushPanel: (state, action) => {
      state.dataWork.push(action.payload);
    },
    setSelectComponent: (state, action) => {
      state.selectedComponentId = action.payload;
    },
  },
});

export const { setFileClick, setData2Work, pushPanel, setSelectComponent } =
  canvasSlice.actions;

export default canvasSlice.reducer;
