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


