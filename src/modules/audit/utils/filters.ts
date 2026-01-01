import type { AuditLogEntry } from '../types/audit'
import type { AuditLogFilters } from '../types/filters'

const normalizeString = (value?: string | null) => value?.trim() || undefined

const parseOptionalNumber = (value?: string) => {
  if (!value) return undefined
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return undefined
  return parsed > 0 ? parsed : undefined
}

const toIsoString = (value?: string) => {
  const trimmed = normalizeString(value)
  if (!trimmed) return undefined
  const date = new Date(trimmed)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString()
}

export const normalizeAuditLogFilters = (filters: {
  action?: string
  method?: string
  path?: string
  statusCode?: string
  ipAddress?: string
  message?: string
  userId?: string
  startDate?: string
  endDate?: string
  limit?: string
}): AuditLogFilters => ({
  action: normalizeString(filters.action),
  method: normalizeString(filters.method),
  path: normalizeString(filters.path),
  statusCode: parseOptionalNumber(filters.statusCode),
  ipAddress: normalizeString(filters.ipAddress),
  message: normalizeString(filters.message),
  userId: normalizeString(filters.userId),
  startDate: toIsoString(filters.startDate),
  endDate: toIsoString(filters.endDate),
  limit: parseOptionalNumber(filters.limit),
})


