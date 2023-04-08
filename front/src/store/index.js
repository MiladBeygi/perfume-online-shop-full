import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./slices/errorSlice";
import productsSlice from "./slices/productsSlice";
import shippingInfoSlice from "./slices/shippingInfoSlice";
import shoppingCartSlice from "./slices/shoppingCartSlice";
import usersSlice from "./slices/usersSlice";
const store = configureStore({
    reducer: {
        error: errorSlice,
        users: usersSlice,
        shoppingCart: shoppingCartSlice,
        shippingInfo: shippingInfoSlice,
        products: productsSlice
    }
});
export default store;