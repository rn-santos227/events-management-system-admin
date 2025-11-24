import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import './index.css'
import { classNames } from '@/utils/classNames'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isLoading?: boolean
  loadingText?: string
  block?: boolean
  active?: boolean
  hidden?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'button--primary',
  secondary: 'button--secondary',
  outline: 'button--outline',
  ghost: 'button--ghost',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'button--sm',
  md: 'button--md',
  lg: 'button--lg',
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed'

const spinner = (
  <svg
    className="button__spinner"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="button__spinner-circle"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="button__spinner-path"
      d="M4 12a8 8 0 018-8"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      leftIcon,
      rightIcon,
      children,
      isLoading = false,
      loadingText = 'Loading',
      disabled,
      block = false,
      active = false,
      hidden = false,
      ...props
    },
    ref,
  ) => {
    if (hidden) return null
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        className={classNames(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          isLoading && 'button--loading',
          block && 'button--block',
          active && 'button--active',
          className,
        )}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <span className="button__loading-content">
            <span aria-hidden="true">{spinner}</span>
            <span className="button__sr-only">{loadingText}</span>
          </span>
        ) : leftIcon ? (
          <span aria-hidden="true">{leftIcon}</span>
        ) : null}

        <span className="button__text">{children}</span>

        {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
      </button>
    )
  }
)

Button.displayName = 'Button'
