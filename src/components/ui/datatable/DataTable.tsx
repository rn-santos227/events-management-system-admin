import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import './index.css'
import { classNames } from '@/utils/classNames'

export type DataTableAlign = 'left' | 'center' | 'right'
export type DataTableSortDirection = 'asc' | 'desc'

export interface DataTableColumn<T> {
  key: keyof T | string
  header: string
  width?: string
  align?: DataTableAlign
  render?: (row: T, index: number) => ReactNode
  sortable?: boolean
  sortAccessor?: (row: T) => string | number | Date | undefined | null
  hideLabel?: boolean
}

export interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  caption?: string
  emptyMessage?: string
  className?: string
  isLoading?: boolean
  initialSort?: { key: string; direction?: DataTableSortDirection }
  rowKey?: (row: T, index: number) => string | number
}


