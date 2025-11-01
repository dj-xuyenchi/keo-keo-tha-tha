// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/app/globalSlice";
import { combineReducers } from "redux";
import canvasSlice from "@/views/main/canvas/canvasSlice";

const rootReducer = combineReducers({
  global: globalReducer, // thêm nhiều reducer nếu có
  canvas: canvasSlice, 
});

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
