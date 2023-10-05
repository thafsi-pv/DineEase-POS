import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state = true;
    },
    hideLoader: (state, action) => {
      state = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
