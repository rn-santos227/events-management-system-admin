import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { UserProfile } from '@/types/user'
import { apiClient, type ApiErrorPayload } from '@/services/api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken?: string | null
  user: UserProfile
}

export interface AuthState {
  token: string | null
  refreshToken: string | null
  status: 'idle' | 'loading' | 'authenticated' | 'error'
  error: string | null
  lastLoginAt: string | null
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  status: 'idle',
  error: null,
  lastLoginAt: null,
}
