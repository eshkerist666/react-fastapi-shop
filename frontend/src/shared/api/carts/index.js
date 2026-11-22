import { api } from "../api"

export const cartApi = api.injectEndpoints({
    endpoints: builder => ({
      getCartItems: builder.query({
        query: (user_id) => `/carts/${user_id}`,
        providesTags: ['Cart']
      }),
      changeQuantity: builder.mutation({
        query: ({item_id, quantity}) => ({
          url: `/carts/items/${item_id}`,
          method: 'PATCH',
          body: {
            quantity
          }
        }),
        invalidatesTags: ['Cart']
      }),
      addToCart: builder.mutation({
        query: ({item_id, quantity}) => ({
          url: `/carts/items`,
          method: 'POST',
          body: {
            product_id: item_id,
            quantity: quantity
          }
        }),
        invalidatesTags: ['Cart']
      }),
      makeOrder: builder.mutation({
        query: ({country, city, street, house, apartment, postal_code}) => ({
          url: `/orders`,
          method: 'POST',
          body: {
            country,
            city,
            street,
            house,
            apartment,
            postal_code
          }
        }),
        invalidatesTags: ['Cart']
      })
    })
})

export const { useGetCartItemsQuery, useChangeQuantityMutation, useAddToCartMutation, useMakeOrderMutation } = cartApi
