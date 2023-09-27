import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params) => {
    try {
      const { data } = await axios.post("/auth/register", params);
      return data;
    } catch (e) {
      alert(e.response.data.message);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "/auth/fetchUser",
  async (params) => {
    try {
      const { data } = await axios.post("/auth/login", params);
      return data;
    } catch (e) {
      alert(e.response.data.message);
    }
  }
);

export const fetchMe = createAsyncThunk("/auth/fetchMe", async (params) => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchLogin.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchLogin.rejected]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchMe.rejected]: (state) => {
      state.data = null;
      state.status = "loading";
    },
  },
});

export const selectIsAuth = (state) => !!state.auth.data;
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
