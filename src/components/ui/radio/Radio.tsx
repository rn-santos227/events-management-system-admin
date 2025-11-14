import { createContext, forwardRef, useContext, useId } from 'react'
import type {
  FieldsetHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react'

import { classNames } from '@/utils'

type Orientation = 'vertical' | 'horizontal'

interface RadioGroupContextValue {
  name?: string
  helperId?: string
  errorId?: string
  orientation: Orientation
  disabled?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

const useRadioGroupContext = () => useContext(RadioGroupContext)

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
  description?: ReactNode
  wrapperClassName?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      id,
      className,
      wrapperClassName,
      disabled,
      name,
      ...props
    },
    ref,
  ) => {
    const group = useRadioGroupContext()
    const generatedId = useId()
    const inputId = id ?? `${group ? `${group.name ?? 'radio'}-` : ''}${generatedId}`
    const descriptionId = description ? `${inputId}-description` : undefined
    const isDisabled = disabled ?? group?.disabled ?? false
    const describedBy = [descriptionId, group?.helperId, group?.errorId]
      .filter(Boolean)
      .join(' ') || undefined

    const alignmentClass =
      group?.orientation === 'horizontal' ? 'mt-0' : 'mt-1'

    return (
      <label
        className={classNames(
          'flex select-none gap-2 text-slate-700',
          group?.orientation === 'horizontal'
            ? 'items-center'
            : 'items-start',
          isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          wrapperClassName,
        )}
      >
        <input
          id={inputId}
          ref={ref}
          type="radio"
          name={name ?? group?.name}
          className={classNames(
            `${alignmentClass} size-4 rounded-full border border-slate-300 text-slate-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/20 accent-slate-900`,
            isDisabled
              ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
              : 'cursor-pointer hover:border-slate-400 hover:shadow-inner',
            className,
          )}
          aria-describedby={describedBy}
          aria-invalid={Boolean(group?.errorId)}
          disabled={isDisabled}
          {...props}
        />
        {(label ?? description) && (
          <span className="flex flex-col gap-0.5">
            {label ? (
              <span className="text-sm font-medium">{label}</span>
            ) : null}
            {description ? (
              <span id={descriptionId} className="text-xs text-slate-500">
                {description}
              </span>
            ) : null}
          </span>
        )}
      </label>
    )
  },
)

Radio.displayName = 'Radio'

export interface RadioGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'className'> {
  label?: ReactNode
  helperText?: ReactNode
  error?: ReactNode
  orientation?: Orientation
  className?: string
  name: string
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      label,
      helperText,
      error,
      orientation = 'vertical',
      className,
      children,
      name,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const groupId = id ?? `radio-group-${generatedId}`
    const helperId = helperText ? `${groupId}-helper` : undefined
    const errorId = error ? `${groupId}-error` : undefined
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <fieldset
        ref={ref}
        id={groupId}
        className={classNames('flex flex-col gap-2 border-0 p-0', className)}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        {...props}
      >
        {label ? (
          <legend className="text-sm font-medium text-slate-700">{label}</legend>
        ) : null}
        <RadioGroupContext.Provider
          value={{
            name,
            helperId,
            errorId,
            orientation,
            disabled,
          }}
        >
          <div
            className={classNames(
              'flex gap-3',
              orientation === 'horizontal' ? 'flex-wrap items-center' : 'flex-col',
            )}
          >
            {children}
          </div>
        </RadioGroupContext.Provider>
        {error ? (
          <p id={errorId} className="text-xs font-medium text-red-600">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-slate-500">
            {helperText}
          </p>
        ) : null}
      </fieldset>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
