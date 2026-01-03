import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchAuditLogs, type AuditLogScope } from '../store/AuditLogsSlice'
import type { AuditLogFilters } from '../types/filters'

export const useAuditLogs = () => {
  const dispatch = useAppDispatch()
  const entries = useAppSelector((state) => state.auditLogs.entries)
  const status = useAppSelector((state) => state.auditLogs.status)
  const error = useAppSelector((state) => state.auditLogs.error)

  const loadAuditLogs = useCallback(
    (scope: AuditLogScope, filters?: AuditLogFilters, userId?: string) =>
      dispatch(fetchAuditLogs({ scope, filters, userId })),
    [dispatch],
  )

  return {
    entries,
    status,
    error,
    loadAuditLogs,
  }
}
