import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
    name: 'products',

    initialState: {
        categoryId: null,
        page: 1,
        searchQuery: '',
    },

    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
            state.page = 1
        },
    },
})

export const { actions, reducer } = productsSlice