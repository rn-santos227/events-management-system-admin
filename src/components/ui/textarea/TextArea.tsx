import { forwardRef, useEffect, useId, useState } from 'react'
import type { ChangeEvent, TextareaHTMLAttributes } from 'react'

import './index.css'
import { classNames } from '@/utils/classNames'

const getCharacterLength = (input: unknown): number => {
  if (typeof input === 'string') return input.length
  if (typeof input === 'number') return String(input).length
  return 0
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
}

const baseStyles = 'text-area__input'
const errorStyles = 'text-area__input--error'

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      id,
      className,
      containerClassName,
      rows = 4,
      maxLength,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const textAreaId = id ?? generatedId
    const helperId = helperText ? `${textAreaId}-helper` : undefined
    const errorId = error ? `${textAreaId}-error` : undefined
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined

    const [internalLength, setInternalLength] = useState(
      getCharacterLength(value ?? defaultValue),
    )
    const isControlled = value !== undefined && value !== null
    const characterCount = isControlled
      ? getCharacterLength(value)
      : internalLength

    useEffect(() => {
      if (!isControlled && maxLength != null) {
        setInternalLength(getCharacterLength(defaultValue))
      }
    }, [defaultValue, isControlled, maxLength])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled && maxLength != null) {
        setInternalLength(event.target.value.length)
      }
      onChange?.(event)
    }

    const helperContent = error ? (
      <p id={errorId} className="text-area__helper text-area__helper--error">
        {error}
      </p>
    ) : helperText ? (
      <p id={helperId} className="text-area__helper">
        {helperText}
      </p>
    ) : null

    return (
      <div className={classNames('text-area', containerClassName)}>
        {label ? (
          <label className="text-area__label" htmlFor={textAreaId}>
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
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        {helperContent || maxLength != null ? (
          <div className="text-area__helper-row">
            {helperContent ? <div className="flex-1">{helperContent}</div> : null}
            {maxLength != null ? (
              <span
                className={classNames(
                  'text-area__counter',
                  error ? 'text-area__counter--error' : undefined,
                )}
              >
                {characterCount}/{maxLength}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'
