import { useMemo } from 'react'

import type { DataTableColumn } from '@/components/ui'
import { formatDateTime } from '@/utils/time'
import type { AuditLogEntry } from '../types/audit'
import { getAuditUserLabel } from '../types/audit'

const getStatusTone = (status?: number | null) => {
  if (status == null) return { tone: 'text-slate-500 bg-slate-100', label: 'N/A' }
  if (status >= 500) return { tone: 'text-red-700 bg-red-100', label: `${status} Error` }
  if (status >= 400) return { tone: 'text-amber-700 bg-amber-100', label: `${status} Warning` }
  return { tone: 'text-emerald-700 bg-emerald-100', label: `${status} OK` }
}

export const useAuditLogColumns = () =>
  useMemo<DataTableColumn<AuditLogEntry>[]>(() => [
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
  ], [])
