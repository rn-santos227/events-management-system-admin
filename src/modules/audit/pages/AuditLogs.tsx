import { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'

import { useAppSelector } from '@/app/hooks'
import {
  AlertBanner,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
  type DataTableColumn,
  TextField,
} from '@/components/ui'
import { PRIVILEGE_ACTIONS } from '@/constants/privileges'
import { useAuthorization } from '@/modules/auth/hooks/useAuthorization'
import { AUDIT_LOGS_BY_USER_QUERY, AUDIT_LOGS_QUERY } from '../queries'
import type { AuditLogEntry } from '@/types/auditLog'
import { getAuditUserLabel } from '@/types/auditLog'
import { formatDateTime } from '@/utils/time'

interface AuditLogQueryResponse {
  auditLogs?: AuditLogEntry[]
  auditLogsByUser?: AuditLogEntry[]
}

const getStatusTone = (status?: number | null) => {
  if (status == null) return { tone: 'text-slate-500 bg-slate-100', label: 'N/A' }
  if (status >= 500) return { tone: 'text-red-700 bg-red-100', label: `${status} Error` }
  if (status >= 400) return { tone: 'text-amber-700 bg-amber-100', label: `${status} Warning` }
  return { tone: 'text-emerald-700 bg-emerald-100', label: `${status} OK` }
}

export default function AuditLogsPage() {
  const profile = useAppSelector((state) => state.user.profile)
  const { hasPrivilege } = useAuthorization()
  const canReadAll = hasPrivilege(PRIVILEGE_ACTIONS.AUDIT_LOGS.READ)
  const canReadOwn = hasPrivilege(PRIVILEGE_ACTIONS.AUDIT_LOGS.READ_OWN)
  const [limitInput, setLimitInput] = useState('50')

  const normalizedLimit = useMemo(() => {
    const parsed = Number(limitInput)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined
  }, [limitInput])

  const variables = useMemo(() => {
    if (canReadAll) return { limit: normalizedLimit }
    if (canReadOwn && profile?.id != null) {
      return { userId: String(profile.id), limit: normalizedLimit }
    }
    return undefined
  }, [canReadAll, canReadOwn, normalizedLimit, profile?.id])

  const activeQuery = canReadAll ? AUDIT_LOGS_QUERY : AUDIT_LOGS_BY_USER_QUERY

  const { data, loading, error, refetch } = useQuery<AuditLogQueryResponse>(activeQuery, {
    variables,
    skip: !variables,
    fetchPolicy: 'cache-and-network',
  })

  const auditLogs = useMemo(
    () => data?.auditLogs ?? data?.auditLogsByUser ?? [],
    [data?.auditLogs, data?.auditLogsByUser],
  )
}
