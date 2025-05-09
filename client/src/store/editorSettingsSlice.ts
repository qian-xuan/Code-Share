import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageType } from "../types/CodeData";

const defaultCodesRef: {
  language: LanguageType,
  code: string | undefined,
}[] = [{language: 'html', code: '// 输入代码...'}];

const initialState = {
  page: 0,
  forceUpdate: 0,
  ifReadOnly: false,
  codesRef: defaultCodesRef,
}

const editorSettingsSlice = createSlice({
  name: 'editorSettings',
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
    updateCodesRef: (state, action: PayloadAction<{ page: number, code: string | undefined }>) => {
      state.codesRef[action.payload.page].code = action.payload.code;
    },
    updateCodesRefLanguage: (state, action: PayloadAction<{ page: number, language: LanguageType }>) => {
      state.codesRef[action.payload.page].language = action.payload.language;
    },
  }
})
export const { setPage, setForceUpdate, setIfReadOnly, setCodesRef, updateCodesRef, updateCodesRefLanguage } = editorSettingsSlice.actions;
export default editorSettingsSlice.reducer;