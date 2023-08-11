import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    addToCart: (state, action) => {
      let newItem = {
        name: action.payload.name,
        portion: action.payload.portion,
        rate: action.payload.rate,
      };
      state.push(newItem);
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, addToCart } =
cartSlice.actions;

export default cartSlice.reducer;
