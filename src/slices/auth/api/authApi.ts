import { baseApi } from '../../../app/api/baseApi'
import type {
  AutologinRequest,
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
          ...(credentials.autologinHash
            ? { 'X-Autologin-Hash': credentials.autologinHash }
            : {}),
        },
      }),
      invalidatesTags: ['Auth'],
    }),
    autologin: builder.mutation<LoginResponse, AutologinRequest>({
      query: ({ autologinHash, username }) => ({
        url: '/auth/autologin',
        method: 'POST',
        headers: {
          'X-Autologin-Hash': autologinHash,
          "X-Username": username
        }
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

export const {
  useAutologinMutation,
  useGetCurrentUserQuery,
  useLoginMutation,
  useSignupMutation,
} = authApi
