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

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiClient.request<'AUTH', 'LOGIN', LoginResponse, LoginCredentials>(
      'AUTH',
      'LOGIN',
      {
        data: credentials,
      },
    )

    apiClient.setAuthToken(response.token)
    return response
  } catch (error) {
    const apiError = error as ApiErrorPayload
    return rejectWithValue(apiError.message ?? 'Unable to login right now')
  }
})
