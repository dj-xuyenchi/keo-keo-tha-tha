// store/slices/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";

export interface GlobalData {
  fileList: [{ key: string }];
}
const init = {} as GlobalData;
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
