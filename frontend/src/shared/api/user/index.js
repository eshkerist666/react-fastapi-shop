// shared/api/auth/index.js
import { api } from '../api'

export const userApi = api.injectEndpoints({
    endpoints: builder => ({
        getMe: builder.query({
            query: () => '/jwt/users/me',
            providesTags: ['Me']
        }),

        register: builder.mutation({
            query: ({email, password, firstName, lastName}) => ({
                url: '/users',
                method: 'POST',
                body: {
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    password: password,
                },
            }),
        }),

        login: builder.mutation({
            query: ({email, password}) => ({
                url: '/jwt/login',
                method: 'POST',
                body: {
                    email: email,
                    password: password
                },
            }),
            invalidatesTags: ['Me'],
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/jwt/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Me'],
        }),
    }),
})
export const selectGetMeResult = userApi.endpoints.getMe.select()
export const {
    useGetMeQuery,
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
} = userApi