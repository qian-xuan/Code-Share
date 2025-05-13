import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CodeData } from "../types/CodeData";
import { formatDate } from "../utils/utils";

type Data = {
  id: number,
  createdAt: string,
  codedata: CodeData,
};

const initialState: { codedatas: Data[]; loading: boolean; error: string | null } = {
  codedatas: [],
  loading: false,
  error: null,
};

// 异步 Thunk，用于获取数据
export const fetchCodeDatas = createAsyncThunk("codeDatas/fetchCodeDatas", async (_, thunkAPI) => {
  try {
    const response = await fetch("/api/get/codedata", { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const resJson = await response.json();
    if (!Array.isArray(resJson)) {
      throw new Error("返回的数据不是数组");
    }
    return resJson;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const codeDatasSlice = createSlice({
  name: 'codeDatas',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCodeDatas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCodeDatas.fulfilled, (state, action) => {
        state.loading = false;
        state.codedatas = action.payload.map((data: any) => ({
          id: data.id,
          createdAt: formatDate(data.createdAt),
          codedata: data.data,
        }));
      })
      .addCase(fetchCodeDatas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },

  // reducers: {
  //   updateDatas: (state) => {
  //     // TODO: bug
  //     fetch('/api/get/codedata', {
  //       method: 'GET',
  //     })
  //     .then(res => {
  //       if (res.ok) return res.json();
  //     })
  //     .then(resJson=> {
  //       resJson.forEach((data: any) => {
  //         console.log(data)
  //         state.codedatas.push({
  //           id: data.id,
  //           createdAt: data.createdAt,
  //           codedata: data.data
  //         });
  //       });
  //     });
  //   },
  // }
})
// export const { updateDatas } = codeDatasSlice.actions;
export default codeDatasSlice.reducer;