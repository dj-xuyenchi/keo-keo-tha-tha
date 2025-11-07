import { configureStore, combineReducers } from "@reduxjs/toolkit";
import globalReducer from "@/app/globalSlice";
import canvasSlice from "@/views/main/canvas/canvasSlice";

const rootReducer = combineReducers({
  global: globalReducer,
  canvas: canvasSlice,
});

// ⚡ Chỉ tạo store 1 lần, giữ lại giữa các lần hot reload
const createStore = () =>
  configureStore({
    reducer: rootReducer,
  });

let store;

// Nếu đang trong môi trường dev và có window
if (process.env.NODE_ENV === "development") {
  if (!window.__REDUX_STORE__) {
    window.__REDUX_STORE__ = createStore();
  }
  store = window.__REDUX_STORE__;
} else {
  // Production: luôn tạo mới
  store = createStore();
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
