import { forwardRef, useEffect, useId, useState } from 'react'
import type { ChangeEvent, InputHTMLAttributes } from 'react'

import { classNames } from '@/utils/classNames'

const getCharacterLength = (value: unknown): number => {
  if (typeof value === 'string') return value.length
  if (typeof value === 'number') return String(value).length
  return 0
}

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
}

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
  type?: 'text' | 'password' | 'number'
  numbersOnly?: boolean,
  active?: boolean
  hidden?: boolean
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
      maxLength,
      value,
      defaultValue,
      type = 'text',
      numbersOnly = false,
      active = false,
      hidden = false,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const [internalLength, setInternalLength] = useState(
      getCharacterLength(value ?? defaultValue),
    )

    const isControlled = value !== undefined && value !== null
    useEffect(() => {
      if (!isControlled && maxLength != null) {
        setInternalLength(getCharacterLength(defaultValue))
      }
    }, [defaultValue, isControlled, maxLength])
    
    if (hidden) return null
    const inputId = id ?? generatedId
    const helperId = helperText ? `${inputId}-helper` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined
    const characterCount = isControlled
      ? getCharacterLength(value)
      : internalLength

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled && maxLength != null) {
        setInternalLength(event.target.value.length)
      }
      onChange?.(event)
    }

    const helperContent = error ? (
      <p id={errorId} className="text-xs font-medium text-red-600">
        {error}
      </p>
    ) : helperText ? (
      <p id={helperId} className="text-xs text-slate-500">
        {helperText}
      </p>
    ) : null

    return (
      <div 
        className={classNames(
          'flex flex-col gap-1',
          active && 'ring-2 ring-slate-500 ring-offset-2 rounded-lg',
          containerClassName,
        )}
      >
        {label ? (
          <label className="text-sm font-medium text-slate-700" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
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
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />

        {helperContent || maxLength != null ? (
          <div className="flex items-start gap-2">
            {helperContent ? <div className="flex-1">{helperContent}</div> : null}
            {maxLength != null ? (
              <span
                className={classNames(
                  'ml-auto text-xs tabular-nums text-slate-500',
                  error ? 'text-red-600' : undefined,
                )}
              >
                {characterCount}/{maxLength}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  }
)

TextField.displayName = 'TextField'
