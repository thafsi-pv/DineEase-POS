import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = { cart: [], customer: {} };

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
      const existingItemIdex = state.cart.findIndex(
        (item) => item.id === newItem.id && item.portion == newItem.portion
      );
      if (existingItemIdex !== -1) {
        state.cart[existingItemIdex].quantity += newItem.quantity;
        state.cart[existingItemIdex].totalRate = Math.round(
          parseFloat(state.cart[existingItemIdex].quantity) *
            parseFloat(state.cart[existingItemIdex].unitRate)
        ).toFixed(2);
      } else {
        state.cart.push(newItem);
      }
    },
    alterItemQuantity: (state, action) => {
      const { index, type } = action.payload;
      if (type === "-" && state.cart[index].quantity == 1) {
        toast.error("Required minimum quantity is 1 😟");
      }
      if (type === "+") {
        state.cart[index].quantity = state.cart[index].quantity + 1;
      }
      if (type === "-" && state.cart[index].quantity > 1) {
        state.cart[index].quantity = state.cart[index].quantity - 1;
        // state.cart[index].totalRate = state.cart[index].quantity * state.cart[index].unitRate;
      }
      state.cart[index].totalRate = Math.round(
        parseFloat(state.cart[index].quantity) *
          parseFloat(state.cart[index].unitRate)
      ).toFixed(2);
    },
    selectCustomer: (state, action) => {
      state.customer = action.payload;
    },
    removeItem: (state, action) => {
      const index = action.payload;
      state.cart.splice(index, 1);
    },
    clearCart: (state, action) => {
      const clearType = action.payload;
      console.log("🚀 ~ file: cartSlice.js:58 ~ clearType:", clearType);
      if (clearType == "all") {
        return initialState;
        //state = { cart: [], customer: {} };
      }
      if (clearType == "cart") {
        state.cart = [];
      }
      if (clearType == "customer") {
        state.customer = {};
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  alterItemQuantity,
  selectCustomer,
  clearCart,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
