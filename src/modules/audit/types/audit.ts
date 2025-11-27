export interface AuditLogUser {
  id: string
  email?: string | null
  fullName?: string | null
}

export interface AuditLogEntry {
  id: string
  action?: string | null
  method?: string | null
  path?: string | null
  statusCode?: number | null
  ipAddress?: string | null
  message?: string | null
  createdAt?: string | null
  user?: AuditLogUser | null
}

export const getAuditUserLabel = (log: Pick<AuditLogEntry, 'user'>): string => {
  const fullName = log.user?.fullName?.trim()
  if (fullName) return fullName
  if (log.user?.email) return log.user.email
  return 'System'
}
