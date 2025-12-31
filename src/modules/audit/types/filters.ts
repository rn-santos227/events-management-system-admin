export interface AuditLogFilters {
  action?: string
  actions?: string[]
  activities?: string[]
  method?: string
  path?: string
  statusCode?: number
  ipAddress?: string
  message?: string
  userId?: string
  startDate?: string
  endDate?: string
  limit?: number
}
