import { configureStore, combineReducers } from "@reduxjs/toolkit";
import globalReducer from "@/app/globalSlice";
import canvasSlice from "@/views/main/canvas/canvasSlice";

const rootReducer = combineReducers({
  global: globalReducer,
  canvas: canvasSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
