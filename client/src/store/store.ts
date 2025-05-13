import { configureStore } from "@reduxjs/toolkit";
import editPageReducer from "./editPageSlice";
import editorReducer from "./editorSettingsSlice";
import codeDatasReducer from "./codeDatasSlice";

const store = configureStore({
  reducer: {
    edit: editPageReducer,
    editorSettings: editorReducer,
    codeDatas: codeDatasReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;