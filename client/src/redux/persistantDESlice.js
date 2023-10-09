import { createSlice } from "@reduxjs/toolkit";

const persistantDESlice = createSlice({
  name: "persistantDE",
  initialState: { userName: "", token: "", isLocked: false, userImg: "" },
  reducers: {
    setField: (state, action) => {
      try {
        const { field, value } = action.payload;
        state[field] = value;
      } catch (error) {
        console.log("🚀 ~ file: persistantDESlice.js:13 ~ error:", error);
      }
    },
    resetField: (state, action) => {
      try {
        const { field } = action.payload;
        state[field] = "";
      } catch (error) {
        console.log("🚀 ~ file: persistantDESlice.js:13 ~ error:", error);
      }
    },
    resetAllField: (state) => {
      try {
        return initialState;
      } catch (error) {
        console.log("🚀 ~ file: persistantDESlice.js:13 ~ error:", error);
      }
    },
  },
});

const initialState = { userName: "", token: "", isLocked: false, userImg: "" };

export const { setField, resetField, resetAllField } =
  persistantDESlice.actions;

export default persistantDESlice.reducer;
