import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { classNames } from '@/helpers/classNames'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isLoading?: boolean
  loadingText?: string
}
