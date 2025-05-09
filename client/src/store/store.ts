import { configureStore } from "@reduxjs/toolkit";
import editPageReducer from "./editPageSlice";
import editorReducer from "./editorSlice";

const store = configureStore({
  reducer: {
    edit: editPageReducer,
    editor: editorReducer,
  }
})

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;