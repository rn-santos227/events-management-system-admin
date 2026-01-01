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

