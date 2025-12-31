import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiClient, type ApiErrorPayload } from '@/services/api'
import type { AuditLogEntry } from '../types/audit'
import type { AuditLogFilters } from '../types/filters'

export type AuditLogScope = 'all' | 'own'

interface FetchAuditLogsArgs {
  scope: AuditLogScope
  filters?: AuditLogFilters
  userId?: string
}

interface AuditLogsState {
  entries: AuditLogEntry[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AuditLogsState = {
  entries: [],
  status: 'idle',
  error: null,
}

const hasSearchFilters = (filters?: AuditLogFilters) => {
  if (!filters) return false
  const { limit, ...searchFilters } = filters
  return Object.values(searchFilters).some((value) => {
    if (value == null) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    return true
  })
}

const buildParams = (filters?: AuditLogFilters) => {
  if (!filters) return undefined
  const params: Record<string, string | number | string[] | undefined> = {}

  if (filters.action) params.action = filters.action
  if (filters.actions?.length) params.actions = filters.actions
  if (filters.activities?.length) params.activities = filters.activities
  if (filters.method) params.method = filters.method
  if (filters.path) params.path = filters.path
  if (filters.statusCode != null) params.statusCode = filters.statusCode
  if (filters.ipAddress) params.ipAddress = filters.ipAddress
  if (filters.message) params.message = filters.message
  if (filters.userId) params.userId = filters.userId
  if (filters.startDate) params.startDate = filters.startDate
  if (filters.endDate) params.endDate = filters.endDate
  if (filters.limit != null) params.limit = filters.limit

  return params;
}

export const fetchAuditLogs = createAsyncThunk<
  AuditLogEntry[],
  FetchAuditLogsArgs,
  { rejectValue: string }
>('auditLogs/fetch', async ({ scope, filters, userId }, { rejectWithValue }) => {
  try {
    if (scope === 'own') {
      if (!userId) {
        return rejectWithValue('User id is required to load audit logs.')
      }

      return await apiClient.request<'AUDIT_LOGS', 'BY_USER', AuditLogEntry[]>(
        'AUDIT_LOGS',
        'BY_USER',
        {
          pathParams: { id: userId },
          params: filters?.limit != null ? { limit: filters.limit } : undefined,
        },
      )
    }

  } catch (error) {
    const apiError = error as ApiErrorPayload
    return rejectWithValue(apiError.message ?? 'Unable to load audit logs right now.')
  }
})
