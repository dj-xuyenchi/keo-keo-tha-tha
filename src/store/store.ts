import { configureStore, combineReducers } from "@reduxjs/toolkit";
import globalReducer from "@/app/globalSlice";
import canvasSlice from "@/views/main/canvas/canvasSlice";
import ribbonSlice from "@/views/main/ribbon-menu/ribbonSlice";
import sideBarSlice from "@/views/main/side-bar/sideBarSlice";

const rootReducer = combineReducers({
  global: globalReducer,
  canvas: canvasSlice,
  ribbon: ribbonSlice,
  sideBar: sideBarSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
