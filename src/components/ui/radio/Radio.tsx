import { createContext, forwardRef, useContext, useId } from 'react'
import type {
  FieldsetHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react'

import './index.css'
import { classNames } from '@/utils/classNames'

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

    const orientationClass =
      group?.orientation === 'horizontal' ? 'radio--horizontal' : 'radio--vertical'
    const alignmentClass =
      group?.orientation === 'horizontal'
        ? 'radio__input--horizontal'
        : 'radio__input--vertical'

    return (
      <label
        className={classNames(
          'radio',
          orientationClass,
          isDisabled ? 'radio--disabled' : 'radio--enabled',
          wrapperClassName,
        )}
      >
        <input
          id={inputId}
          ref={ref}
          type="radio"
          name={name ?? group?.name}
          className={classNames(
            'radio__input',
            alignmentClass,
            isDisabled ? 'radio__input--disabled' : 'radio__input--enabled',
            className
          )}
          aria-describedby={describedBy}
          aria-invalid={Boolean(group?.errorId)}
          disabled={isDisabled}
          {...props}
        />
        {(label ?? description) && (
          <span className="flex flex-col gap-0.5">
            {label ? <span className="radio__label">{label}</span> : null}
            {description ? (
              <span id={descriptionId} className="radio__description">{description}</span>
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
