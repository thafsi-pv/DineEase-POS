import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let newItem = {
        id: action.payload.id,
        itemName: action.payload.itemName,
        quantity: action.payload.quantity,
        portion: action.payload.portion,
        unitRate: action.payload.unitRate,
        totalRate: action.payload.totalRate,
      };
      const existingItemIdex = state.findIndex(
        (item) => item.id === newItem.id && item.portion == newItem.portion
      );
      if (existingItemIdex !== -1) {
        state[existingItemIdex].quantity += newItem.quantity;
        state[existingItemIdex].totalRate = Math.round(
          parseFloat(state[existingItemIdex].quantity) *
            parseFloat(state[existingItemIdex].unitRate)
        ).toFixed(2);
      } else {
        state.push(newItem);
      }
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
