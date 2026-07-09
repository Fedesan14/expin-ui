export type AuthUser = {
  id: string
  username: string
  profileId: string
  email: string
}

export type LoginRequest = {
  identifier: string
  password: string
  autologinHash?: string
}

export type LoginResponse = {
  sessionToken: string
  sessionTokenExpiresAt: string
  refreshToken: string
  refreshTokenExpiresAt: string
}

export type AutologinRequest = {
  autologinHash: string
  username: string
}

export type SignupRequest = {
  username: string
  password: string
  email: string
}

export type SignupResponse = AuthUser

export type AuthState = {
  sessionToken: string | null
  sessionTokenExpiresAt: string | null
  refreshToken: string | null
  refreshTokenExpiresAt: string | null
}

export const initialAuthState: AuthState = {
  sessionToken: null,
  sessionTokenExpiresAt: null,
  refreshToken: null,
  refreshTokenExpiresAt: null,
}
