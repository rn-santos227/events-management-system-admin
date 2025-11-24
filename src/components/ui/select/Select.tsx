import { forwardRef, useId } from 'react'
import type { SelectHTMLAttributes } from 'react'

import './index.css'
import { classNames } from '@/utils/classNames'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
}

const baseStyles = 'select-field__control'
const errorStyles = 'select-field__control--error'

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helperText, error, id, className, containerClassName, children, ...props }, ref) => {
    const generatedId = useId()
    const selectId = id ?? generatedId
    const helperId = helperText ? `${selectId}-helper` : undefined
    const errorId = error ? `${selectId}-error` : undefined
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined

    return (
      <div className={classNames('select-field', containerClassName)}>
        {label ? (
          <label className="select-field__label" htmlFor={selectId}>
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
          <p id={errorId} className="select-field__helper select-field__helper--error">{error}</p>
        ) : helperText ? (
          <p id={helperId} className="select-field__helper">{helperText}</p>
        ) : null}
      </div>
    )
  },
)

Select.displayName = 'Select'
