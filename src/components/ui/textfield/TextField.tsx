import { forwardRef, useEffect, useId, useState } from 'react'
import type { ChangeEvent, InputHTMLAttributes } from 'react'

import './index.css'
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
  type?: 'text' | 'password' | 'number' | 'email'
  numbersOnly?: boolean,
  active?: boolean
  hidden?: boolean
}

const baseInputStyles = 'text-field__input'
const errorInputStyles = 'text-field__input--error'

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
     <p id={errorId} className="text-field__helper text-field__helper--error">
        {error}
      </p>
    ) : helperText ? (
      <p id={helperId} className="text-field__helper">
        {helperText}
      </p>
    ) : null

    return (
      <div className={classNames('text-field', active && 'text-field--active', containerClassName)}>
        {label ? (
          <label className="text-field__label" htmlFor={inputId}>
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
          <div className="text-field__helper-row">
            {helperContent ? <div className="flex-1">{helperContent}</div> : null}
            {maxLength != null ? (
              <span
                className={classNames(
                  'text-field__counter',
                  error ? 'text-field__counter--error' : undefined,
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
