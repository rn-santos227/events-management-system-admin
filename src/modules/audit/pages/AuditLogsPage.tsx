import { useEffect, useMemo, useRef, useState } from 'react'

import { useUserProfile } from '@/hooks'
import {
  Accordion,
  AlertBanner,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
  type DataTableColumn,
} from '@/components/ui'
import { PRIVILEGE_ACTIONS } from '@/constants/privileges'
import { useAuthorization } from '@/modules/auth/hooks/useAuthorization'
import type { AuditLogEntry } from '../types/audit'
import { getAuditUserLabel } from '../types/audit'
import { formatDateTime } from '@/utils/time'
import { AuditLogFilters, type AuditLogFilterFormState } from '../components/AuditLogFilters'
import { useAuditLogs } from '../hooks/useAuditLogs'
import { filterAuditLogs, normalizeAuditLogFilters } from '../utils/filters'

const DEFAULT_FILTERS: AuditLogFilterFormState = {
  action: '',
  method: '',
  path: '',
  statusCode: '',
  ipAddress: '',
  message: '',
  userId: '',
  startDate: '',
  endDate: '',
  limit: '50',
}

const getStatusTone = (status?: number | null) => {
  if (status == null) return { tone: 'text-slate-500 bg-slate-100', label: 'N/A' }
  if (status >= 500) return { tone: 'text-red-700 bg-red-100', label: `${status} Error` }
  if (status >= 400) return { tone: 'text-amber-700 bg-amber-100', label: `${status} Warning` }
  return { tone: 'text-emerald-700 bg-emerald-100', label: `${status} OK` }
}

export default function AuditLogsPage() {
  const profile = useUserProfile()
  const { hasPrivilege } = useAuthorization()
  const canReadAll = hasPrivilege(PRIVILEGE_ACTIONS.AUDIT_LOGS.READ)
  const canReadOwn = hasPrivilege(PRIVILEGE_ACTIONS.AUDIT_LOGS.READ_OWN)
  const [filters, setFilters] = useState<AuditLogFilterFormState>(DEFAULT_FILTERS)
  const { entries, status, error, loadAuditLogs } = useAuditLogs()
  const normalizedFilters = useMemo(() => normalizeAuditLogFilters(filters), [filters])
  const scope = canReadAll ? 'all' : 'own'
  const defaultFiltersRef = useRef(normalizeAuditLogFilters(DEFAULT_FILTERS))

  const displayedLogs = useMemo(() => {
    if (scope === 'all') return entries
    return filterAuditLogs(entries, normalizedFilters)
  }, [entries, normalizedFilters, scope])

  const activeQuery = canReadAll ? AUDIT_LOGS_QUERY : AUDIT_LOGS_BY_USER_QUERY
  const isLoading = status === 'loading'

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

  useEffect(() => {
    if (scope === 'own' && !canReadOwn) return
    if (scope === 'own' && !profile?.id) return
    void loadAuditLogs(
      scope,
      defaultFiltersRef.current,
      profile?.id ? String(profile.id) : undefined,
    )
  }, [canReadOwn, loadAuditLogs, profile?.id, scope])

  const handleFiltersSubmit = () => {
    if (scope === 'own' && !canReadOwn) return
    if (scope === 'own' && !profile?.id) return
    void loadAuditLogs(scope, normalizedFilters, profile?.id ? String(profile.id) : undefined)
  }

  const handleFiltersReset = () => {
    setFilters(DEFAULT_FILTERS)
    if (scope === 'own' && !canReadOwn) return
    if (scope === 'own' && !profile?.id) return
    void loadAuditLogs(scope, normalizeAuditLogFilters(DEFAULT_FILTERS), profile?.id ? String(profile.id) : undefined)
  }

  return (
    <section className="page-section">
      <div className="page-container page-container-wide">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="page-kicker">Audit trail</p>
            <h1 className="page-title">Request activity</h1>
            <p className="page-subtitle">
              Review authenticated API activity captured by the administration backend. Limit the query to keep responses fast.
            </p>
          </div>
          <Button type="button" variant="primary" onClick={handleFiltersSubmit} isLoading={isLoading}>
            Refresh
          </Button>
        </header>

        <Card className="page-card">
          <CardHeader className="flex flex-col gap-2 border-b border-slate-100">
            <CardTitle>Audit log entries</CardTitle>
            <CardDescription>
              {canReadAll
                ? 'Showing the most recent requests across all users.'
                : 'Showing your recent authenticated requests.'}
            </CardDescription>
            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="page-chip">
                Access scope: {canReadAll ? 'All users' : 'Own account only'}
              </span>
              <span className="page-chip">
                Current limit: {normalizedLimit ?? 'default'}
              </span>
              <span className="page-chip">
                Loaded: {auditLogs.length} entr{auditLogs.length === 1 ? 'y' : 'ies'}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <AlertBanner
                variant="error"
                title="Unable to load audit logs"
                description={error.message}
              />
            ) : null}
            <DataTable
              data={auditLogs}
              columns={columns}
              caption="Recent audit log entries"
              emptyMessage={loading ? 'Loading audit logs...' : 'No audit activity found for this scope'}
              isLoading={loading}
              initialSort={{ key: 'createdAt', direction: 'desc' }}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
