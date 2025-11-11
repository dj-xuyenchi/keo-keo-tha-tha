// store/slices/exampleSlice.js
import { FileInfo } from "@/entity/fileHandler/FileInfo";
import { SessionCaching } from "@/entity/fileHandler/SessionCaching";
import { createSlice } from "@reduxjs/toolkit";



export interface GlobalData {
  fileList: FileInfo[];
  sessionCaching: SessionCaching[]
}
const init = {
  sessionCaching: [] as SessionCaching[]
} as GlobalData;
const globalSlice = createSlice({
  name: "global",
  initialState: init,
  reducers: {
    setFileList: (state, action) => {
      state.fileList = action.payload;
    },
    setSessionCaching: (state, action) => {
      state.sessionCaching = action.payload;
    },
  },
});

export const { setFileList, setSessionCaching } = globalSlice.actions;

export default globalSlice.reducer;
