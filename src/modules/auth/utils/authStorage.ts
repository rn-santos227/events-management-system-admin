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
