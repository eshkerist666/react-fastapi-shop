import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        getCartItems: (state, action) => {
            
        }
    }
})

export const {actions, reducer} = cartSlice