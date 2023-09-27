import { configureStore } from "@reduxjs/toolkit";
import { restReducer } from "./slices/restaurants";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    rest: restReducer,
    auth: authReducer,
  },
});

export default store;
