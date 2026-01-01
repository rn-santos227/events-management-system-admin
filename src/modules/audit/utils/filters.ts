import type { AuditLogEntry } from '../types/audit'
import type { AuditLogFilters } from '../types/filters'

const normalizeString = (value?: string | null) => value?.trim() || undefined


