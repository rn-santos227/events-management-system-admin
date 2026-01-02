import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiClient, type ApiErrorPayload } from '@/services/api'
import type { Privilege } from '../types/privilege'

interface FetchPrivilegesArgs {
  limit?: number
}

interface UpdatePrivilegeStatusArgs {
  privilege: Privilege
  active: boolean
}

interface PrivilegesState {
  items: Privilege[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  updatingIds: string[]
  updateError: string | null
}

