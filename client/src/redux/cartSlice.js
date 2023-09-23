import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("🚀 ~ file: cartSlice.js:11 ~ action:", action)
      let newItem = {
        itemName: action.payload.itemName,
        quantity: action.payload.quantity,
        portion: action.payload.portion,
        unitRate: action.payload.unitRate,
        totalRate: action.payload.totalRate,
      };
      state.push(newItem);
    },
    alterItemQuantity: (state, action) => {
      const { index, type } = action.payload;
      if (type === "-" && state[index].quantity == 1) {
        toast.error("Required minimum quantity is 1 😟");
      }
      if (type === "+") {
        state[index].quantity = state[index].quantity + 1;
      }
      if (type === "-" && state[index].quantity > 1) {
        state[index].quantity = state[index].quantity - 1;
        // state[index].totalRate = state[index].quantity * state[index].unitRate;
      }
      state[index].totalRate = Math.round(
        parseFloat(state[index].quantity) * parseFloat(state[index].unitRate)
      ).toFixed(2);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, alterItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
