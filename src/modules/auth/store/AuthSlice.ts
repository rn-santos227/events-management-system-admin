import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { LoginCredentials, LoginResponse, LogoutResponse, AuthState } from '../types/auth'
import { apiClient, type ApiErrorPayload } from '@/services/api'

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  tokenType: null,
  expiresAt: null,
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.refreshToken = null
      state.status = 'idle'
      state.error = null
      state.lastLoginAt = null
      apiClient.clearAuthToken()
    },
    setTokenFromStorage(state, action: PayloadAction<string | null>) {
      state.token = action.payload
      state.status = action.payload ? 'authenticated' : 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken ?? null
        state.lastLoginAt = new Date().toISOString()
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload ?? action.error.message ?? 'Login failed'
      })
  },
})

export const { logout, setTokenFromStorage } = authSlice.actions
export const authReducer = authSlice.reducer
