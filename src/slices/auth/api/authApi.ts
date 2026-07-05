import { baseApi } from '../../../app/api/baseApi'
import type { LoginRequest, LoginResponse, UserSession } from '../model/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    getCurrentUser: builder.query<UserSession, void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
  }),
})

export const { useGetCurrentUserQuery, useLoginMutation } = authApi
