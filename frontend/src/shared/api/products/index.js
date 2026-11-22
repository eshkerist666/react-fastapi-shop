import { api } from "../api"

export const productsApi = api.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
          query: ({ categoryId, limit, offset, searchQuery }) => {
            const params = new URLSearchParams({
                limit: String(limit),
                offset: String(offset),
            })

            if (categoryId != null) {
                params.set('category_id', String(categoryId))
            }

            if (searchQuery) {
                params.set('search', searchQuery)
            }

            return `/products?${params.toString()}`
        },
          providesTags: ['Products']
        }),
        getProduct: builder.query({
          query: (product_id) => `/products/${product_id}`,
        }),
        getCategories: builder.query({
          query: () => `/categories`,
        }),
    })
})

export const { useGetProductsQuery, useGetProductQuery, useGetCategoriesQuery} = productsApi