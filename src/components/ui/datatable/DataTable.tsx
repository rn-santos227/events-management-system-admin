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
  if (initialSort) {
    const direction = initialSort.direction ?? 'asc'
    return { key: initialSort.key, direction }
  }

  const firstSortable = columns.find((column) => column.sortable)
  if (firstSortable) {
    return { key: firstSortable.key as string, direction: 'asc' as DataTableSortDirection }
  }

  return null
}

export function DataTable<T extends object>({
  data,
  columns,
  caption,
  emptyMessage = 'No records to display',
  className,
  isLoading = false,
  initialSort,
  rowKey,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; direction: DataTableSortDirection } | null>(() =>
    buildInitialSort(columns, initialSort),
  )

  const sortedData = useMemo(() => {
    if (!sort) return data

    const column = columns.find((col) => (col.key as string) === sort.key)
    if (!column) return data

    return [...data].sort((a, b) => {
      const aValue = resolveSortValue(a, column)
      const bValue = resolveSortValue(b, column)

      if (aValue === bValue) return 0
      if (aValue === undefined || aValue === null) return 1
      if (bValue === undefined || bValue === null) return -1

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sort.direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      return sort.direction === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })
  }, [data, columns, sort])

  const handleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable) return

    setSort((current) => {
      if (!current || current.key !== (column.key as string)) {
        return { key: column.key as string, direction: 'asc' }
      }

      return { key: column.key as string, direction: current.direction === 'asc' ? 'desc' : 'asc' }
    })
  }

  const getRowKey = (row: T, index: number) => {
    if (rowKey) return rowKey(row, index)
    const candidate = (row as Record<string, unknown>).id
    return typeof candidate === 'string' || typeof candidate === 'number' ? candidate : index
  }

  return (
    <div className={classNames('data-table', className)}>
      {caption ? <div className="data-table__caption">{caption}</div> : null}
      <div className="data-table__container">
        
      </div>
    </div>
  )
}
