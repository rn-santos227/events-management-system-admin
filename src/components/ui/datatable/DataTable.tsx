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

function resolveSortValue<T>(row: T, column: DataTableColumn<T>) {
  if (column.sortAccessor) {
    const value = column.sortAccessor(row)
    if (value instanceof Date) return value.getTime()
    return value
  }

  const rawValue = (row as Record<string, unknown>)[column.key as string]
  if (rawValue instanceof Date) return rawValue.getTime()
  if (typeof rawValue === 'string' || typeof rawValue === 'number') return rawValue
  return undefined
}

function getAlignClass(align: DataTableAlign = 'left') {
  if (align === 'center') return 'data-table__cell--align-center'
  if (align === 'right') return 'data-table__cell--align-right'
  return 'data-table__cell--align-left'
}

function buildInitialSort<T>(columns: DataTableColumn<T>[], initialSort?: DataTableProps<T>['initialSort']) {

}
