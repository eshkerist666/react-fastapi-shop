import { createSlice } from "@reduxjs/toolkit"

const authModalSlice = createSlice({
    name: 'authModal',

    initialState: {
        type: null,
    },

    reducers: {
        openAuthModal: (state, action) => {
            state.type = action.payload
        },

        closeAuthModal: (state) => {
            state.type = null
        },
    },
})

export const {actions, reducer} = authModalSlice
