import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Services from "../lib/apiServices";

const initialState = {
  data: [],
  loading: true,
  error: null,
};

export const retrievePegawai = createAsyncThunk(
  "pegawai/retrieve",
  async () => {
    const response = await Services.getAll();
    return response.data;
  }
);

export const createPegawai = createAsyncThunk(
  "pegawai/create",
  async (data) => {
    const response = await Services.create(data);
    return response.data;
  }
);

export const updatePegawai = createAsyncThunk(
  "pegawai/update",
  async (data) => {
    const response = await Services.update(data.id, data);
    return response.data;
  }
);

export const deletePegawai = createAsyncThunk("pegawai/delete", async (id) => {
  await Services.remove(id);
  return id;
});

const pegawaiSlice = createSlice({
  name: "pegawai",
  initialState,
  extraReducers: {
    [retrievePegawai.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    [createPegawai.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },

    [updatePegawai.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },

    [deletePegawai.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

const { reducer } = pegawaiSlice;
export default reducer;
