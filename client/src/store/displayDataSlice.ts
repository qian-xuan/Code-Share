import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CodeData } from "../types/CodeData";
import { formatDate } from "../utils/utils";

type Data = {
  id: number,
  createdAt: string,
  codedata: CodeData,
};

const initialState: { displayData: Data[]; loading: boolean; error: string | null } = {
  displayData: [],
  loading: false,
  error: null,
};

export const fetchdisplayData = createAsyncThunk("displayData/fetchdisplayData", async (_, thunkAPI) => {
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

const displayDataSlice = createSlice({
  name: 'displayData',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchdisplayData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchdisplayData.fulfilled, (state, action) => {
        state.loading = false;
        state.displayData = action.payload.map((data: any) => ({
          id: data.id,
          createdAt: formatDate(data.createdAt),
          codedata: data.data,
        }));
      })
      .addCase(fetchdisplayData.rejected, (state, action) => {
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
  //         state.displayData.push({
  //           id: data.id,
  //           createdAt: data.createdAt,
  //           codedata: data.data
  //         });
  //       });
  //     });
  //   },
  // }
})
// export const { updateDatas } = displayDataSlice.actions;
export default displayDataSlice.reducer;