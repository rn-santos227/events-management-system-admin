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
  name: 'privileges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivileges.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPrivileges.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload ?? []
        state.error = null
      })
      .addCase(fetchPrivileges.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'Unable to load privileges.'
      })
      .addCase(updatePrivilegeStatus.pending, (state, action) => {
        const id = action.meta.arg.privilege.id
        if (!state.updatingIds.includes(id)) {
          state.updatingIds.push(id)
        }
        state.updateError = null
      })
      .addCase(updatePrivilegeStatus.fulfilled, (state, action) => {
        const updated = action.payload
        state.updatingIds = state.updatingIds.filter((id) => id !== updated.id)
        const index = state.items.findIndex((item) => item.id === updated.id)
        if (index >= 0) {
          state.items[index] = updated
        } else {
          state.items.unshift(updated)
        }
        state.updateError = null
      })
      .addCase(updatePrivilegeStatus.rejected, (state, action) => {
        const id = action.meta.arg.privilege.id
        state.updatingIds = state.updatingIds.filter((entry) => entry !== id)
        state.updateError = action.payload ?? action.error.message ?? 'Unable to update privileges.'
      })
  },
})

export const privilegesReducer = privilegesSlice.reducer
