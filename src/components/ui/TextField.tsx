import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'

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

  }
)

TextField.displayName = 'TextField'
