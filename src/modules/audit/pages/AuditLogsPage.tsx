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
} from '@/components/ui'
import { PRIVILEGE_ACTIONS } from '@/constants/privileges'
import { useAuthorization } from '@/modules/auth/hooks/useAuthorization'
import { AuditLogFilters, type AuditLogFilterFormState } from '../components/AuditLogFilters'
import { useAuditLogs } from '../hooks/useAuditLogs'
import { useAuditLogColumns } from '../hooks/useAuditLogColumns'
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
  const columns = useAuditLogColumns()

  const displayedLogs = useMemo(() => {
    if (scope === 'all') return entries
    return filterAuditLogs(entries, normalizedFilters)
  }, [entries, normalizedFilters, scope])

  const isLoading = status === 'loading'

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
                Current limit: {normalizedFilters.limit ?? 'default'}
              </span>
              <span className="page-chip">
                Loaded: {displayedLogs.length} entr{displayedLogs.length === 1 ? 'y' : 'ies'}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Accordion
              title="Search & filters"
              description="Refine audit log results before fetching."
              defaultOpen
            >
              <AuditLogFilters
                values={filters}
                onChange={setFilters}
                onSubmit={handleFiltersSubmit}
                onReset={handleFiltersReset}
                canSearch={canReadAll}
                isLoading={isLoading}
              />
            </Accordion>
            {error ? (
              <AlertBanner
                variant="error"
                title="Unable to load audit logs"
                description={error}
              />
            ) : null}
            <DataTable
              data={displayedLogs}
              columns={columns}
              caption="Recent audit log entries"
              emptyMessage={isLoading ? 'Loading audit logs...' : 'No audit activity found for this scope'}
              isLoading={isLoading}
              initialSort={{ key: 'createdAt', direction: 'desc' }}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
