import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchAuditLogs, type AuditLogScope } from '../store/auditLogsSlice'
import type { AuditLogFilters } from '../types/filters'


