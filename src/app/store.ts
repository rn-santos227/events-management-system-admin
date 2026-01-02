import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { auditLogsReducer } from '@/modules/audit/store/auditLogsSlice'
import { authReducer } from '@/modules/auth/store/AuthSlice'
import { privilegesReducer } from '@/modules/privileges/store/PrivilegesSlice'
import { userReducer } from '@/modules/auth/store/UserSlice'
import { loadAuthStateFromStorage } from '@/modules/auth/utils/authStorage'
import { apiClient } from '@/services/api'

const rootReducer = combineReducers({
  auditLogs: auditLogsReducer,
  auth: authReducer,
  user: userReducer,
  privileges: privilegesReducer,
})

const preloadedState = loadAuthStateFromStorage()
if (preloadedState?.auth?.token) {
  apiClient.setAuthToken(preloadedState.auth.token)
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
