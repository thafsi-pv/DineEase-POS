import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import loaderReducer from "./loaderSlice";
import persistantReducer from "./persistantDESlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persistent", // key for the persisted reducer
  storage,
};
const persistedReducer = persistReducer(persistConfig, persistantReducer);

const store = configureStore({
  reducer: {
    cart: cartReducer,
    loader: loaderReducer,
    persistent: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
