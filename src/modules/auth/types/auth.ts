import type { UserProfile } from '@/types/user'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  tokenType: string
  expiresAt: number
  refreshToken?: string | null
  user?: UserProfile | null
}

export interface LogoutResponse {
  message: string
}

export interface AuthState {
  token: string | null
  refreshToken: string | null
  tokenType: string | null
  expiresAt: number | null
  status: 'idle' | 'loading' | 'authenticated' | 'error'
  error: string | null
  lastLoginAt: string | null
}

