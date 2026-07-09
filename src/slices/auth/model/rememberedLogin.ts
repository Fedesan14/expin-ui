const REMEMBERED_USERNAME_STORAGE_KEY = 'expin.auth.rememberedUsername'
const LAST_LOGIN_USERNAME_STORAGE_KEY = 'expin.auth.lastLoginUsername'

function getStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage
}

function normalizeUsername(username: string) {
  return username.trim()
}

export function readRememberedUsername() {
  return getStorage()?.getItem(REMEMBERED_USERNAME_STORAGE_KEY) ?? ''
}

export function writeRememberedUsername(username: string) {
  const normalizedUsername = normalizeUsername(username)

  if (!normalizedUsername) {
    clearRememberedUsername()
    return
  }

  getStorage()?.setItem(REMEMBERED_USERNAME_STORAGE_KEY, normalizedUsername)
}

export function clearRememberedUsername() {
  getStorage()?.removeItem(REMEMBERED_USERNAME_STORAGE_KEY)
}

export function readLastLoginUsername() {
  return getStorage()?.getItem(LAST_LOGIN_USERNAME_STORAGE_KEY) ?? ''
}

export function writeLastLoginUsername(username: string) {
  const normalizedUsername = normalizeUsername(username)

  if (!normalizedUsername) {
    return
  }

  getStorage()?.setItem(LAST_LOGIN_USERNAME_STORAGE_KEY, normalizedUsername)
}
