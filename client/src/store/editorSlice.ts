import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageType } from "../types/CodeData";

const defaultCodesRef: {
  language: LanguageType,
  code: string | undefined,
}[] = [];

const initialState = {
  page: 0,
  forceUpdate: 0,
  ifReadOnly: false,
  codesRef: defaultCodesRef,
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setForceUpdate: (state, action: PayloadAction<number>) => {
      state.forceUpdate = action.payload;
    },
    setIfReadOnly: (state, action: PayloadAction<boolean>) => {
      state.ifReadOnly = action.payload;
    },
    setCodesRef: (state, action: PayloadAction<typeof defaultCodesRef>) => {
      state.codesRef = action.payload;
    },
  }
})
export const { setPage, setForceUpdate, setIfReadOnly, setCodesRef } = editorSlice.actions;
export default editorSlice.reducer;