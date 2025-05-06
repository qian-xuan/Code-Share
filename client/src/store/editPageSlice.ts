import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CodeData, defaultCodeData, LanguageType } from "../types/CodeData";

const initialState = {
  editPageData: defaultCodeData,
  editPageDataCache: defaultCodeData,
}

const editPageSlice = createSlice({
  name: 'editPageData',
  initialState,
  reducers: {
    seteditPageData: (state, action: PayloadAction<CodeData>) => {
      state.editPageData = action.payload;
    },
    setFCName: (state, action: PayloadAction<string>) => {
      state.editPageData.settings.title = action.payload;
    },
    addCode: (state, action: PayloadAction<{ language: LanguageType; code: string | undefined; }>) => {
      state.editPageData.codes.push(action.payload);
    },
    removeCode: (state, action: PayloadAction<number>) => {
      state.editPageData.codes.splice(action.payload, 1);
    },
    setLanguage: (state, action: PayloadAction<{ page: number, language: LanguageType }>) => {
      state.editPageData.codes[action.payload.page].language = action.payload.language;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.editPageData.settings.tags = action.payload;
    },
    setOvertime: (state, action: PayloadAction<string | undefined>) => {
      state.editPageData.settings.overtime = action.payload;
    },
    updateCode: (state, action: PayloadAction<{ page: number, code: string | undefined }>) => {
      state.editPageData.codes[action.payload.page].code = action.payload.code;
    },
    updateCache: (state) => {
      state.editPageDataCache = state.editPageData;
    },
  }
})
export const { setFCName, seteditPageData, addCode, removeCode, setLanguage,
  updateCode, setOvertime, updateCache, setTags } = editPageSlice.actions;
export default editPageSlice.reducer;