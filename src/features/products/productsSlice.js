import React from "react";
import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    searchFlag: false
};

export function fetchProducts(){ //action creator
    return async function (dispatch, getState){
        const res = await axios.get("http://localhost:4200/v1/products/");
        const fetchedProducts = res.data.products;
        dispatch(addProducts({
            fetchedProducts
        }));
    }
}

export function fetchSearchedProducts(searchQuery){
    return async function(dispatch, getState){
        const res = await axios.get("http://localhost:4200/v1/products/", {
            params: {
                searchQuery
            }
        });
        const fetchedProducts = res.data.products;
        dispatch(addProducts({fetchedProducts, searchFlag: true}));
    }
}

export const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers:  {
        addProducts: (state, action) => {
        if(action.payload.searchFlag){
        state.products.push(...action.payload.fetchedProducts)
        state.searchFlag = true
        }
        else{
        state.products = [];
        state.products.push(...action.payload.fetchedProducts);
        state.searchFlag = false;
        }
        console.log(state.searchFlag)
        }
    }
    }
)

export const {addProducts} = ProductsSlice.actions;
export default ProductsSlice.reducer;