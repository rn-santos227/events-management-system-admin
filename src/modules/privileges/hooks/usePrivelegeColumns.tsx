import { useMemo } from 'react'

import type { DataTableColumn } from '@/components/ui'
import { Button } from '@/components/ui'
import { formatDateTime } from '@/utils/time'
import type { Privilege } from '../types/privilege'
import { isPrivilegeActive } from '../types/privilege'

interface UsePrivilegeColumnsArgs {
  canUpdate: boolean
  onToggle: (privilege: Privilege) => void
  updatingIds: string[]
}

const statusStyles = {
  active: 'text-emerald-700 bg-emerald-100',
  inactive: 'text-slate-600 bg-slate-100',
} as const

export const usePrivilegeColumns = ({ canUpdate, onToggle, updatingIds }: UsePrivilegeColumnsArgs) =>
  useMemo<DataTableColumn<Privilege>[]>(() => [
    {
      key: 'name',
      header: 'Privilege',
      sortable: true,
      render: (privilege) => (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-slate-900">{privilege.name}</span>
          <span className="text-xs text-slate-500">{privilege.resource}</span>
        </div>
      ),
      width: '24%',
    },
    {
      key: 'action',
      header: 'Action',
      sortable: true,
      render: (privilege) => (
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase text-slate-700">
          {privilege.action}
        </span>
      ),
      width: '18%',
    },
    {
      key: 'updatedAt',
      header: 'Last updated',
      sortable: true,
      sortAccessor: (privilege) => privilege.updatedAt ?? privilege.createdAt ?? undefined,
      render: (privilege) => (
        <span className="text-sm text-slate-600">{formatDateTime(privilege.updatedAt ?? privilege.createdAt)}</span>
      ),
      width: '20%',
    },
    {
      key: 'active',
      header: 'Status',
      align: 'center',
      sortable: true,
      sortAccessor: (privilege) => (isPrivilegeActive(privilege) ? 1 : 0),
      render: (privilege) => {
        const active = isPrivilegeActive(privilege)
        return (
          <span className={`inline-flex min-w-[88px] justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${active ? statusStyles.active : statusStyles.inactive}`}>
            {active ? 'Active' : 'Inactive'}
          </span>
        )
      },
      width: '12%',
    },
    {
      key: 'controls',
      header: 'Controls',
      align: 'right',
      hideLabel: true,
      render: (privilege) => {
        if (!canUpdate) {
          return <span className="text-xs text-slate-400">No access</span>
        }

        const active = isPrivilegeActive(privilege)
        const isUpdating = updatingIds.includes(privilege.id)

        return (
          <Button
            type="button"
            size="sm"
            variant={active ? 'outline' : 'primary'}
            isLoading={isUpdating}
            loadingText={active ? 'Deactivating' : 'Activating'}
            onClick={() => onToggle(privilege)}
          >
            {active ? 'Deactivate' : 'Activate'}
          </Button>
        )
      },
      width: '16%',
    },
  ], [canUpdate, onToggle, updatingIds])
