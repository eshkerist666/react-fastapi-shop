import { api } from "../api"

export const orderApi = api.injectEndpoints({
    endpoints: builder => ({
      getOrders: builder.query({
        query: () => `/orders/mine`,
        providesTags: ['Orders']
      }),
    })
})

export const { useGetOrdersQuery } = orderApi
