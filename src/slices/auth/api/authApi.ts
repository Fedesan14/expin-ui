import { baseApi } from '../../../app/api/baseApi'
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '../model/types'

function toBasicAuthorization({ identifier, password }: LoginRequest) {
  const token = new TextEncoder().encode(`${identifier}:${password}`)
  const binary = String.fromCodePoint(...token)

  return `Basic ${btoa(binary)}`
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        headers: {
          Authorization: toBasicAuthorization(credentials),
        },
      }),
      invalidatesTags: ['Auth'],
    }),
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (user) => ({
        url: '/auth/signup',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Auth'],
    }),
    getCurrentUser: builder.query<SignupResponse, void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
  }),
})

export const { useGetCurrentUserQuery, useLoginMutation, useSignupMutation } =
  authApi
