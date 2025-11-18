import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { authReducer } from '@/modules/auth/store/AuthSlice'
import { userReducer } from '@/modules/auth/store/UserSlice'
import { loadAuthStateFromStorage } from '@/modules/auth/utils/authStorage'
import { apiClient } from '@/services/api'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
})

const preloadedState = loadAuthStateFromStorage()
if (preloadedState?.auth?.token) {
  apiClient.setAuthToken(preloadedState.auth.token)
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
