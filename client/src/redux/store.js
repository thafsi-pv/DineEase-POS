import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import loaderSlice from "./loaderSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    loader:loaderSlice
  },
});
