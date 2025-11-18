import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { LoginCredentials, LoginResponse, LogoutResponse, AuthState } from '../types/auth'
import { clearPersistedAuthState, persistAuthSession } from '../utils/authStorage'
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
        data: {
          email: credentials.email,
          password: credentials.password,
        },
      },
    )

    apiClient.setAuthToken(response.accessToken)
    persistAuthSession({
      token: response.accessToken,
      refreshToken: response.refreshToken ?? null,
      tokenType: response.tokenType,
      expiresAt: response.expiresAt,
      user: response.user ?? null,
    })
    return response
  } catch (error) {
    const apiError = error as ApiErrorPayload
    return rejectWithValue(apiError.message ?? 'Unable to login right now')
  }
})

export const logoutUser = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: string }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.request<'AUTH', 'LOGOUT', LogoutResponse>('AUTH', 'LOGOUT')
    return response
  } catch (error) {
    const apiError = error as ApiErrorPayload
    return rejectWithValue(apiError.message ?? 'Unable to logout right now')
  } finally {
    apiClient.clearAuthToken()
    clearPersistedAuthState()
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
        state.token = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken ?? null
        state.tokenType = action.payload.tokenType
        state.expiresAt = action.payload.expiresAt
        state.lastLoginAt = new Date().toISOString()
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload ?? action.error.message ?? 'Login failed'
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null
        state.refreshToken = null
        state.tokenType = null
        state.expiresAt = null
        state.status = 'idle'
        state.error = null
        state.lastLoginAt = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.token = null
        state.refreshToken = null
        state.tokenType = null
        state.expiresAt = null
        state.status = 'idle'
        state.error = action.payload ?? action.error.message ?? 'Logout failed'
        state.lastLoginAt = null
      })
  },
})

export const { setTokenFromStorage } = authSlice.actions
export const authReducer = authSlice.reducer
