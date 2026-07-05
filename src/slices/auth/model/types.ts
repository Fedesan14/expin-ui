export type UserSession = {
  id: string
  displayName: string
  email: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: UserSession
}
