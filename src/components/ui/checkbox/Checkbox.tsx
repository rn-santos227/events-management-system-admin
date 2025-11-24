import { createContext, forwardRef, useContext, useId } from 'react'
import type {
  FieldsetHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react'

import './index.css'
import { classNames } from '@/utils/classNames'

type Orientation = 'vertical' | 'horizontal'

interface CheckboxGroupContextValue {
  name?: string
  helperId?: string
  errorId?: string
  orientation: Orientation
  disabled?: boolean
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null,
)

const useCheckboxGroupContext = () => useContext(CheckboxGroupContext)

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
  description?: ReactNode
  wrapperClassName?: string
}


export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
    const group = useCheckboxGroupContext()
    const generatedId = useId()
    const inputId = id ?? `${group ? `${group.name ?? 'checkbox'}-` : ''}${generatedId}`
    const descriptionId = description ? `${inputId}-description` : undefined
    const isDisabled = disabled ?? group?.disabled ?? false
    const describedBy = [descriptionId, group?.helperId, group?.errorId]
      .filter(Boolean)
      .join(' ') || undefined

    const orientationClass =
      group?.orientation === 'horizontal' ? 'checkbox--horizontal' : 'checkbox--vertical'
    const alignmentClass =
      group?.orientation === 'horizontal'
        ? 'checkbox__input--horizontal'
        : 'checkbox__input--vertical'

    return (
      <label
        className={classNames(
          'checkbox',
          orientationClass,
          isDisabled ? 'checkbox--disabled' : 'checkbox--enabled',
          wrapperClassName,
        )}
      >
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          name={name ?? group?.name}
          className={classNames(
            'checkbox__input',
            alignmentClass,
            isDisabled ? 'checkbox__input--disabled' : 'checkbox__input--enabled',
            className,
          )}
          aria-describedby={describedBy}
          aria-invalid={Boolean(group?.errorId)}
          disabled={isDisabled}
          {...props}
        />
        {(label ?? description) && (
          <span className="flex flex-col gap-0.5">
            {label ? <span className="checkbox__label">{label}</span> : null}
            {description ? (
              <span id={descriptionId} className="checkbox__description">{description}</span>
            ) : null}
          </span>
        )}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export interface CheckboxGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'className'> {
  label?: ReactNode
  helperText?: ReactNode
  error?: ReactNode
  orientation?: Orientation
  className?: string
  name?: string
}

export const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
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
    const groupId = id ?? `checkbox-group-${generatedId}`
    const helperId = helperText ? `${groupId}-helper` : undefined
    const errorId = error ? `${groupId}-error` : undefined
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <fieldset
        ref={ref}
        id={groupId}
        className={classNames('checkbox-group', className)}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        {...props}
      >
        {label ? <legend className="checkbox-group__legend">{label}</legend> : null}
        <CheckboxGroupContext.Provider
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
              'checkbox-group__options',
              orientation === 'horizontal'
                ? 'checkbox-group__options--horizontal'
                : 'checkbox-group__options--vertical',
            )}
          >
            {children}
          </div>
        </CheckboxGroupContext.Provider>
        {error ? (
          <p id={errorId} className="checkbox-group__error">{error}</p>
        ) : helperText ? (
          <p id={helperId} className="checkbox-group__helper">{helperText}</p>
        ) : null}
      </fieldset>
    )
  },
)

CheckboxGroup.displayName = 'CheckboxGroup'
