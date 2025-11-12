import { forwardRef, useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'

import { classNames } from '@/helpers/classNames'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
}

const baseStyles =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500'

const errorStyles =
  'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 placeholder:text-red-400'


export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, helperText, error, id, className, containerClassName, rows = 4, ...props }, ref) => {
    const generatedId = useId()
    const textAreaId = id ?? generatedId
    const helperId = helperText ? `${textAreaId}-helper` : undefined
    const errorId = error ? `${textAreaId}-error` : undefined
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined

    return (
      <div className={classNames('flex flex-col gap-1', containerClassName)}>
        {label ? (
          <label className="text-sm font-medium text-slate-700" htmlFor={textAreaId}>
            {label}
          </label>
        ) : null}
        <textarea
          id={textAreaId}
          ref={ref}
          rows={rows}
          className={classNames(baseStyles, error ? errorStyles : undefined, className)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...props}
        />
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

TextArea.displayName = 'TextArea'
