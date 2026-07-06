import type { AuthState } from './types'
import { initialAuthState } from './types'

const AUTH_STORAGE_KEY = 'expin.auth'

function hasExpired(expiresAt: string | null) {
  if (!expiresAt) {
    return true
  }

  const expiresAtTime = Date.parse(expiresAt)

  return Number.isNaN(expiresAtTime) || expiresAtTime <= Date.now()
}

export function isAuthenticated(auth: AuthState) {
  return Boolean(auth.sessionToken) && !hasExpired(auth.sessionTokenExpiresAt)
}

function isStoredAuthState(value: unknown): value is AuthState {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const auth = value as Partial<AuthState>

  return (
    (typeof auth.sessionToken === 'string' || auth.sessionToken === null) &&
    (typeof auth.sessionTokenExpiresAt === 'string' ||
      auth.sessionTokenExpiresAt === null) &&
    (typeof auth.refreshToken === 'string' || auth.refreshToken === null) &&
    (typeof auth.refreshTokenExpiresAt === 'string' ||
      auth.refreshTokenExpiresAt === null)
  )
}

function getStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage
}

export function readStoredAuthState(): AuthState {
  const storage = getStorage()

  if (!storage) {
    return initialAuthState
  }

  const rawAuth = storage.getItem(AUTH_STORAGE_KEY)

  if (!rawAuth) {
    return initialAuthState
  }

  try {
    const parsedAuth = JSON.parse(rawAuth) as unknown

    if (!isStoredAuthState(parsedAuth) || !isAuthenticated(parsedAuth)) {
      storage.removeItem(AUTH_STORAGE_KEY)
      return initialAuthState
    }

    return parsedAuth
  } catch {
    storage.removeItem(AUTH_STORAGE_KEY)
    return initialAuthState
  }
}

export function writeStoredAuthState(auth: AuthState) {
  const storage = getStorage()

  if (!storage) {
    return
  }

  if (!isAuthenticated(auth)) {
    storage.removeItem(AUTH_STORAGE_KEY)
    return
  }

  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

export function clearStoredAuthState() {
  getStorage()?.removeItem(AUTH_STORAGE_KEY)
}
