import { createSlice } from "@reduxjs/toolkit";

const persistantDESlice = createSlice({
  name: "persistantDE",
  initialState: { userName: "", token: "", isLocked: false, userImg: "" },
  reducers: {
    setField: (state, action) => {
      console.log("🚀 ~ file: persistantDESlice.js:8 ~ action:", action);
      try {
        const { field, value } = action.payload;
        state[field] = value;
      } catch (error) {
        console.log("🚀 ~ file: persistantDESlice.js:13 ~ error:", error);
      }
    },
  },
});

export const { setField } = persistantDESlice.actions;

export default persistantDESlice.reducer;
