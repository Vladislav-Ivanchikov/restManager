import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRest = createAsyncThunk("/rest/fetchRest", async () => {
  const { data } = await axios.get("/restaurants");
  return data;
});

export const fetchTags = createAsyncThunk("/tags/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemoveRest = createAsyncThunk(
  "/rest/fetchRemoveRest",
  async (id) => {
    await axios.delete(`/restaurants/${id}`);
    console.log(id);
  }
);

const initialState = {
  rest: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const restSlice = createSlice({
  name: "rest",
  initialState,
  reducers: {},
  extraReducers: {
    // Загрузка заведений
    [fetchRest.pending]: (state) => {
      state.rest.items = [];
      state.rest.status = "loading";
    },
    [fetchRest.fulfilled]: (state, action) => {
      state.rest.items = action.payload;
      state.rest.status = "loaded";
    },
    [fetchRest.rejected]: (state) => {
      state.rest.items = [];
      state.rest.status = "error";
    },
    // Загрузка тегов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // Удаление заведения
    [fetchRemoveRest.pending]: (state, action) => {
      state.rest.items = state.rest.items.filter(
        (item) => item._id !== action.meta.arg
      );
    },
    [fetchRemoveRest.rejected]: (state) => {
      state.rest.status = "error";
    },
  },
});

export const restReducer = restSlice.reducer;
