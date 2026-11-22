import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as cartReducer } from './cart/cart.slice'
import { reducer as authModalReducer } from './auth/authModal.slice'
import { reducer as productsReducer} from './products/products.slice'
import { api } from '../api/api'

const reducers = combineReducers({
    cart: cartReducer,
    authModal: authModalReducer,
    products: productsReducer,
    [api.reducerPath]: api.reducer
})

export const store = configureStore({
    reducer: reducers,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),

})