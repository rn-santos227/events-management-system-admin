import type { AuthState } from '../types/auth'
import type { UserState } from '../types/user'
import type { UserProfile } from '@/types/user'

const AUTH_STORAGE_KEY = 'ems_admin_auth_session'

type PersistedAuthState = {
  token: string | null
  refreshToken: string | null
  tokenType: string | null
  expiresAt: number | null
  userProfile: UserProfile | null
  lastLoginAt: string | null
  lastSyncedAt: string | null
}

const DEFAULT_PERSISTED_STATE: PersistedAuthState = {
  token: null,
  refreshToken: null,
  tokenType: null,
  expiresAt: null,
  userProfile: null,
  lastLoginAt: null,
  lastSyncedAt: null,
}

type PreloadedAuthStore = { auth: AuthState; user: UserState }

const getStorage = (): Storage | undefined => {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

const readPersistedState = (): PersistedAuthState | undefined => {
  const storage = getStorage()
  if (!storage) {
    return undefined
  }

  const serializedState = storage.getItem(AUTH_STORAGE_KEY)
  if (!serializedState) {
    return undefined
  }

  try {
    const parsedState = JSON.parse(serializedState) as PersistedAuthState
    return { ...DEFAULT_PERSISTED_STATE, ...parsedState }
  } catch {
    storage.removeItem(AUTH_STORAGE_KEY)
    return undefined
  }
}

export interface AuthSessionPayload {
  token: string
  tokenType: string
  expiresAt: number
  refreshToken?: string | null
  user?: UserProfile | null
}

export function persistAuthSession(payload: AuthSessionPayload): void {
  const storage = getStorage()
  if (!storage) {
    return
  }

  const timestamp = new Date().toISOString()
  const stateToPersist: PersistedAuthState = {
    token: payload.token,
    refreshToken: payload.refreshToken ?? null,
    tokenType: payload.tokenType ?? null,
    expiresAt: payload.expiresAt ?? null,
    userProfile: payload.user ?? null,
    lastLoginAt: timestamp,
    lastSyncedAt: payload.user ? timestamp : null,
  }

  try {
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stateToPersist))
  } catch {
    // Ignore storage errors
  }
}

export function clearPersistedAuthState(): void {
  const storage = getStorage()
  if (!storage) {
    return
  }

 try {
    storage.removeItem(AUTH_STORAGE_KEY)
  } catch {
    // Ignore storage errors
  }
}

export function loadAuthStateFromStorage(): PreloadedAuthStore | undefined {

}
