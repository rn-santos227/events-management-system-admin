import { createSlice } from '@reduxjs/toolkit'

import type { UserProfile } from '@/types/user'
import { loginUser, logout } from './AuthSlice'

export interface UserState {
  profile: UserProfile | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  lastSyncedAt: string | null
}

const initialState: UserState = {
  profile: null,
  status: 'idle',
  error: null,
  lastSyncedAt: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserState: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.profile = action.payload.user
        state.lastSyncedAt = new Date().toISOString()
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'Unable to load user profile'
      })
      .addCase(logout, () => ({ ...initialState }))
  },
})

export const { clearUserState } = userSlice.actions
export const userReducer = userSlice.reducer
