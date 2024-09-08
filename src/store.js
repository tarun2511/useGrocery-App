import {configureStore} from "@reduxjs/toolkit";
import addProduct from "./features/cart/cartSlice";
import addProducts from "./features/products/productsSlice";

export const store = configureStore({
    reducer: {
        cart: addProduct,
        products: addProducts
    }
});


