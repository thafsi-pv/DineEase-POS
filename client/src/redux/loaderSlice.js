import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state, action) => {
      return true;
    },
    hideLoader: (state, action) => {
      return false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
