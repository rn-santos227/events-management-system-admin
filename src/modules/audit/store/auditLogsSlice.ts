import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiClient, type ApiErrorPayload } from '@/services/api'
import type { AuditLogEntry } from '../types/audit'
import type { AuditLogFilters } from '../types/filters'

export type AuditLogScope = 'all' | 'own'



