import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = {products: []}


export const storeSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.products.splice(action.payload.index, 1)
        }
    }
})

export const {addProduct, removeProduct} = storeSlice.actions;
export default storeSlice.reducer;



