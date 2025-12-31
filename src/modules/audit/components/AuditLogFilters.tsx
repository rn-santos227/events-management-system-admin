import type { ChangeEvent } from 'react'

import { Button, Select, TextField } from '@/components/ui'

interface AuditLogFilterFormState {
  action: string
  method: string
  path: string
  statusCode: string
  ipAddress: string
  message: string
  userId: string
  startDate: string
  endDate: string
  limit: string
}

interface AuditLogFiltersProps {
  values: AuditLogFilterFormState
  onChange: (next: AuditLogFilterFormState) => void
  onSubmit: () => void
  onReset: () => void
  canSearch: boolean
  isLoading: boolean
}

const METHOD_OPTIONS = ['', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export const AuditLogFilters = ({
  values,
  onChange,
  onSubmit,
  onReset,
  canSearch,
  isLoading,
}: AuditLogFiltersProps) => {
  const handleFieldChange = (key: keyof AuditLogFilterFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({ ...values, [key]: event.target.value })
    }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <TextField
          label="Action"
          value={values.action}
          onChange={handleFieldChange('action')}
          placeholder="Created user"
          disabled={!canSearch}
        />
        <Select
          label="Method"
          value={values.method}
          onChange={handleFieldChange('method')}
          disabled={!canSearch}
        >
          {METHOD_OPTIONS.map((option) => (
            <option key={option || 'any'} value={option}>
              {option || 'Any'}
            </option>
          ))}
        </Select>
        <TextField
          label="Status code"
          value={values.statusCode}
          onChange={handleFieldChange('statusCode')}
          placeholder="200"
          type="number"
          disabled={!canSearch}
        />
        <TextField
          label="Path contains"
          value={values.path}
          onChange={handleFieldChange('path')}
          placeholder="/api/v1/users"
          disabled={!canSearch}
        />
        <TextField
          label="Message contains"
          value={values.message}
          onChange={handleFieldChange('message')}
          placeholder="Updated role assignment"
          disabled={!canSearch}
        />
        <TextField
          label="IP address"
          value={values.ipAddress}
          onChange={handleFieldChange('ipAddress')}
          placeholder="192.168.1.100"
          disabled={!canSearch}
        />
        <TextField
          label="User ID"
          value={values.userId}
          onChange={handleFieldChange('userId')}
          placeholder="UUID"
          disabled={!canSearch}
        />
        <TextField
          label="Start date (ISO)"
          value={values.startDate}
          onChange={handleFieldChange('startDate')}
          placeholder="2024-07-01T00:00:00"
          disabled={!canSearch}
        />
        <TextField
          label="End date (ISO)"
          value={values.endDate}
          onChange={handleFieldChange('endDate')}
          placeholder="2024-07-31T23:59:59"
          disabled={!canSearch}
        />
        <TextField
          label="Limit"
          value={values.limit}
          onChange={handleFieldChange('limit')}
          type="number"
          min={1}
          step={1}
          helperText="Maximum records to fetch"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="primary"
          onClick={onSubmit}
          isLoading={isLoading}
          loadingText="Loading"
        >
          Apply filters
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={isLoading}
        >
          Reset
        </Button>
        {!canSearch ? (
          <p className="text-xs text-slate-500">
            Search filters are available with full audit access. Showing your own activity only.
          </p>
        ) : null}
      </div>
    </div>
  )
}

export type { AuditLogFilterFormState }
