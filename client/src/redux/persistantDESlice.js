import { createSlice } from "@reduxjs/toolkit";

const persistantDESlice = createSlice({
  name: "persistantDE",
  initialState: { userName: "", token: "", isLocked: false, userImg: "" },
  reducers: {
    setField: (state, action) => {
      console.log("🚀 ~ file: persistantDESlice.js:8 ~ action:", action)
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { setField } = persistantDESlice.actions;

export default persistantDESlice.reducer;
