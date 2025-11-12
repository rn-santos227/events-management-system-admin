import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ChangeEvent } from 'react'

import { classNames } from '@/helpers/classNames'

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
  type?: 'text' | 'password' | 'number'
  numbersOnly?: boolean
}

const baseInputStyles =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500'

const errorInputStyles =
  'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 placeholder:text-red-400'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      helperText,
      error,
      id,
      className,
      containerClassName,
      type = 'text',
      numbersOnly = false,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const helperId = helperText ? `${inputId}-helper` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (numbersOnly) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
      }
      onChange?.(e)
    }

    return (
      <div className={classNames('flex flex-col gap-1', containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-slate-700" htmlFor={inputId}>
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          type={type}
          inputMode={numbersOnly ? 'numeric' : undefined}
          pattern={numbersOnly ? '[0-9]*' : undefined}
          className={classNames(
            baseInputStyles,
            error && errorInputStyles,
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={handleChange}
          {...props}
        />
      </div>
    )
  }
)

TextField.displayName = 'TextField'
