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

const initialState: PrivilegesState = {
  items: [],
  status: 'idle',
  error: null,
  updatingIds: [],
  updateError: null,
}

export const fetchPrivileges = createAsyncThunk<
  Privilege[],
  FetchPrivilegesArgs | undefined,
  { rejectValue: string }
>('privileges/fetch', async (args, { rejectWithValue }) => {
  try {
    const params = args?.limit ? { limit: args.limit } : undefined
    return await apiClient.request<'PRIVILEGES', 'LIST', Privilege[]>('PRIVILEGES', 'LIST', { params })
  } catch (error) {
    const apiError = error as ApiErrorPayload
    return rejectWithValue(apiError.message ?? 'Unable to load privileges right now.')
  }
})

export const updatePrivilegeStatus = createAsyncThunk<
  Privilege,
  UpdatePrivilegeStatusArgs,
  { rejectValue: string }
>('privileges/updateStatus', async ({ privilege, active }, { rejectWithValue }) => {
  try {
    const payload = {
      name: privilege.name,
      action: privilege.action,
      resource: privilege.resource,
      active,
    }

    const updated = await apiClient.request<'PRIVILEGES', 'UPDATE', Privilege>('PRIVILEGES', 'UPDATE', {
      pathParams: { id: privilege.id },
      data: payload,
    })

    return updated ?? { ...privilege, active }
  } catch (error) {
    const apiError = error as ApiErrorPayload
    return rejectWithValue(apiError.message ?? 'Unable to update the privilege status.')
  }
})

const privilegesSlice = createSlice({

})

export const privilegesReducer = privilegesSlice.reducer
