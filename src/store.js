import {configureStore} from "@reduxjs/toolkit";
import addProduct from "./features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        cart: addProduct
    }
});