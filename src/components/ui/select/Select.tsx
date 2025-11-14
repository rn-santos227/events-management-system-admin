import { forwardRef, useId } from 'react'
import type { SelectHTMLAttributes } from 'react'

import { classNames } from '@/utils/classNames'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
}

const baseStyles =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500'

const errorStyles =
  'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900'

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helperText, error, id, className, containerClassName, children, ...props }, ref) => {
    const generatedId = useId()
    const selectId = id ?? generatedId
    const helperId = helperText ? `${selectId}-helper` : undefined
    const errorId = error ? `${selectId}-error` : undefined
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined

    return (
      <div className={classNames('flex flex-col gap-1', containerClassName)}>
        {label ? (
          <label className="text-sm font-medium text-slate-700" htmlFor={selectId}>
            {label}
          </label>
        ) : null}
        <select
          id={selectId}
          ref={ref}
          className={classNames(baseStyles, error ? errorStyles : undefined, className)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...props}
        >
          {children}
        </select>
        {error ? (
          <p id={errorId} className="text-xs font-medium text-red-600">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-slate-500">
            {helperText}
          </p>
        ) : null}
      </div>
    )
  },
)

Select.displayName = 'Select'
