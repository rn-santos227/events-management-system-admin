import { useCallback, useEffect } from 'react'

import {
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
import { usePrivileges } from '../hooks/usePrivileges'
import { usePrivilegeColumns } from '../hooks/usePrivilegeColumns'
import type { Privilege } from '../types/privilege'
import { isPrivilegeActive } from '../types/privilege'


export default function PrivilegesPage() {
  const { hasPrivilege } = useAuthorization()
  const canUpdate = hasPrivilege(PRIVILEGE_ACTIONS.PRIVILEGES.UPDATE)
  const { items, status, error, updatingIds, updateError, loadPrivileges, setPrivilegeStatus } = usePrivileges()
  const isLoading = status === 'loading'

  useEffect(() => {
    void loadPrivileges()
  }, [loadPrivileges])

  const handleToggle = useCallback(
    (privilege: Privilege) => {
      const nextState = !isPrivilegeActive(privilege)
      void setPrivilegeStatus(privilege, nextState)
    },
    [setPrivilegeStatus],
  )

  const columns = usePrivilegeColumns({ canUpdate, onToggle: handleToggle, updatingIds })

  return (
    <section className="page-section">
      <div className="page-container page-container-wide">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="page-kicker">Access control</p>
            <h1 className="page-title">Privileges</h1>
            <p className="page-subtitle">
              Manage privilege availability for administrative roles without creating new records.
            </p>
          </div>
          <Button type="button" variant="primary" onClick={() => void loadPrivileges()} isLoading={isLoading}>
            Refresh
          </Button>
        </header>

        <Card className="page-card">
          <CardHeader className="flex flex-col gap-2 border-b border-slate-100">
            <CardTitle>Privilege directory</CardTitle>
            <CardDescription>Activate or deactivate existing privileges as needed for role assignments.</CardDescription>
            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="page-chip">Loaded: {items.length} privilege{items.length === 1 ? '' : 's'}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <AlertBanner
                variant="error"
                title="Unable to load privileges"
                description={error}
              />
            ) : null}
            {updateError ? (
              <AlertBanner
                variant="warning"
                title="Privilege update failed"
                description={updateError}
              />
            ) : null}
            <DataTable
              data={items}
              columns={columns}
              caption="Available privileges"
              emptyMessage={isLoading ? 'Loading privileges...' : 'No privileges found'}
              isLoading={isLoading}
              initialSort={{ key: 'name', direction: 'asc' }}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
