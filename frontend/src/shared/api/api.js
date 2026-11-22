import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)

    const requestUrl = typeof args === 'string' ? args : args.url
    const url = requestUrl.split('?')[0]

    const isAuthRequest = [
        '/jwt/login',
        '/jwt/refresh',
        '/jwt/logout',
    ].some(path => url.endsWith(path))

    if (result.error?.status === 401 && !isAuthRequest) {

        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                const refreshResult = await baseQuery(
                    {
                        url: '/jwt/refresh',
                        method: 'POST',
                    },
                    api,
                    extraOptions
                )

                if (refreshResult.data) {
                    result = await baseQuery(args, api, extraOptions)
                }

            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()

            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Cart', 'Me', 'Orders'],

  baseQuery: baseQueryWithReauth,

  endpoints: builder => ({
    getHealth: builder.query({
      query: () => '/health'
    })
  })
})
