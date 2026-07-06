import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store/store'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { endpoint, getState }) => {
      headers.set('Accept', 'application/json')

      const token = (getState() as RootState).auth.sessionToken
      const isPublicAuthEndpoint = endpoint === 'login' || endpoint === 'signup'

      if (token && !isPublicAuthEndpoint && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['Auth', 'ExpenseHistory', 'Events'],
  endpoints: () => ({}),
})
