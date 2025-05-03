import { configureStore } from "@reduxjs/toolkit";
import editPageReducer from "./editPageSlice";

const store = configureStore({
  reducer: {
    edit: editPageReducer,
  }
})

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;