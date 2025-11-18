import type { UserProfile } from '@/types/user'

export interface UserState {
  profile: UserProfile | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  lastSyncedAt: string | null
}
