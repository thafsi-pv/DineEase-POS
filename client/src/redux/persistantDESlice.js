import { createSlice } from "@reduxjs/toolkit";

const persistantDESlice = createSlice({
  name: "persistantDE",
  initialState: { userName: "", token: "", isLocked: true, userImg: "" },
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { setField } = persistantDESlice.actions;

export default persistantDESlice.reducer;
