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

  const columns: DataTableColumn<AuditLogEntry>[] = [
    {
      key: 'createdAt',
      header: 'Timestamp',
      sortable: true,
      sortAccessor: (log) => (log.createdAt ? new Date(log.createdAt) : undefined),
      render: (log) => (
        <span className="font-medium text-slate-900">{formatDateTime(log.createdAt)}</span>
      ),
      width: '15%',
    },
    {
      key: 'user',
      header: 'Actor',
      render: (log) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{getAuditUserLabel(log)}</span>
          {log.user?.email ? <span className="text-xs text-slate-500">{log.user.email}</span> : null}
        </div>
      ),
      width: '18%',
    },
    {
      key: 'action',
      header: 'Action',
      render: (log) => (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-slate-900">{log.action ?? '—'}</span>
          <span className="text-xs text-slate-500">{log.message ?? 'No message captured'}</span>
        </div>
      ),
    },
    {
      key: 'path',
      header: 'Endpoint',
      render: (log) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase text-slate-700">
              {log.method ?? 'N/A'}
            </span>
            <span className="font-mono text-xs text-slate-600">{log.path ?? '—'}</span>
          </div>
          {log.ipAddress ? <span className="text-xs text-slate-500">IP: {log.ipAddress}</span> : null}
        </div>
      ),
      width: '25%',
    },
    {
      key: 'statusCode',
      header: 'Status',
      align: 'center',
      sortable: true,
      render: (log) => {
        const { label, tone } = getStatusTone(log.statusCode)
        return (
          <span className={`inline-flex min-w-[90px] justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
            {label}
          </span>
        )
      },
      width: '12%',
      sortAccessor: (log) => log.statusCode ?? undefined,
    },
  ]

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (variables) {
      void refetch(variables)
    }
  }

  return (
    <section className="bg-slate-50 px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">Audit trail</p>
            <h1 className="text-3xl font-semibold text-slate-900">Request activity</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Review authenticated API activity captured by the administration backend. Limit the query to keep responses fast.
            </p>
          </div>
          <form className="flex items-end gap-3" onSubmit={handleSubmit}>
            <TextField
              label="Limit"
              type="number"
              min={1}
              step={1}
              value={limitInput}
              onChange={(event) => setLimitInput(event.target.value)}
              helperText="Maximum records to fetch"
              className="w-24"
            />
            <Button type="submit" variant="primary">
              Apply
            </Button>
          </form> 
        </header>
      </div>
    </section>
  )
}
