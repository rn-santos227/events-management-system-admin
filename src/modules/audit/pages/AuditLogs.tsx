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

interface AuditLogQueryResponse {
  auditLogs?: AuditLogEntry[]
  auditLogsByUser?: AuditLogEntry[]
}

const formatTimestamp = (value?: string | null) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}
