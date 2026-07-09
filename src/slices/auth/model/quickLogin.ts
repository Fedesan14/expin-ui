const QUICK_LOGIN_STORAGE_KEY = 'expin.auth.quickLogin'
const RP_NAME = 'Expin'
const HASH_BYTE_LENGTH = 32
const CHALLENGE_BYTE_LENGTH = 32

type QuickLoginCredential = {
  autologinHash: string
  credentialId: string
  username: string
}

function getStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const data = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let value = ''

  data.forEach((byte) => {
    value += String.fromCharCode(byte)
  })

  return btoa(value).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

function fromBase64Url(value: string) {
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return bytes
}

function randomBytes(length: number) {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)

  return bytes
}

function isQuickLoginCredential(value: unknown): value is QuickLoginCredential {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const credential = value as Partial<QuickLoginCredential>

  return (
    typeof credential.autologinHash === 'string' &&
    credential.autologinHash.length > 0 &&
    typeof credential.credentialId === 'string' &&
    credential.credentialId.length > 0 &&
    typeof credential.username === 'string' &&
    credential.username.length > 0
  )
}

export function readQuickLoginUsername() {
  return readQuickLoginCredential()?.username ?? null
}

export function readQuickLoginCredential() {
  const rawCredential = getStorage()?.getItem(QUICK_LOGIN_STORAGE_KEY)

  if (!rawCredential) {
    return null
  }

  try {
    const parsedCredential = JSON.parse(rawCredential) as unknown

    if (isQuickLoginCredential(parsedCredential)) {
      return parsedCredential
    }
  } catch {
    // Invalid persisted quick-login data is cleared below.
  }

  clearQuickLoginCredential()
  return null
}

export function hasQuickLoginCredential() {
  return Boolean(readQuickLoginCredential())
}

export function clearQuickLoginCredential() {
  getStorage()?.removeItem(QUICK_LOGIN_STORAGE_KEY)
}

export async function canUsePlatformBiometrics() {
  if (
    typeof window === 'undefined' ||
    typeof PublicKeyCredential === 'undefined' ||
    !navigator.credentials?.create ||
    !navigator.credentials?.get
  ) {
    return false
  }

  try {
    return PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  } catch {
    return false
  }
}

export async function registerQuickLoginCredential(username: string) {
  const available = await canUsePlatformBiometrics()

  if (!available) {
    throw new Error('BIOMETRICS_UNAVAILABLE')
  }

  const autologinHash = toBase64Url(randomBytes(HASH_BYTE_LENGTH))
  const userId = randomBytes(16)
  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: randomBytes(CHALLENGE_BYTE_LENGTH),
      rp: {
        name: RP_NAME,
      },
      user: {
        id: userId,
        name: username,
        displayName: username,
      },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 },
        { type: 'public-key', alg: -257 },
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        residentKey: 'discouraged',
        userVerification: 'required',
      },
      timeout: 60_000,
      attestation: 'none',
    },
  })

  if (!(credential instanceof PublicKeyCredential)) {
    throw new Error('BIOMETRICS_REGISTRATION_FAILED')
  }

  const quickLoginCredential = {
    autologinHash,
    credentialId: toBase64Url(credential.rawId),
    username,
  }

  getStorage()?.setItem(
    QUICK_LOGIN_STORAGE_KEY,
    JSON.stringify(quickLoginCredential),
  )

  return quickLoginCredential
}

export async function verifyQuickLoginCredential() {
  const quickLoginCredential = readQuickLoginCredential()

  if (!quickLoginCredential) {
    return null
  }

  const available = await canUsePlatformBiometrics()

  if (!available) {
    return null
  }

  const credential = await navigator.credentials.get({
    publicKey: {
      challenge: randomBytes(CHALLENGE_BYTE_LENGTH),
      allowCredentials: [
        {
          id: fromBase64Url(quickLoginCredential.credentialId),
          type: 'public-key',
        },
      ],
      timeout: 60_000,
      userVerification: 'required',
    },
  })

  if (!(credential instanceof PublicKeyCredential)) {
    return null
  }

  return quickLoginCredential
}
