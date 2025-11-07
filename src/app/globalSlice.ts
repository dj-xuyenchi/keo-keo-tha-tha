// store/slices/exampleSlice.js
import { FileInfo } from "@/entity/fileHandler/FileInfo";
import { createSlice } from "@reduxjs/toolkit";



export interface GlobalData {
  fileList: FileInfo[];
}
const init = {
} as GlobalData;
const globalSlice = createSlice({
  name: "global",
  initialState: init,
  reducers: {
    setFileList: (state, action) => {
      state.fileList = action.payload;
    },
  },
});

export const { setFileList } = globalSlice.actions;

export default globalSlice.reducer;
