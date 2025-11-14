import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '@/modules/auth/store/AuthSlice'
import { userReducer } from '@/modules/auth/store/UserSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
