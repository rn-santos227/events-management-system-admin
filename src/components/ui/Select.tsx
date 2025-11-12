import { forwardRef, useId } from 'react'
import type { SelectHTMLAttributes } from 'react'

import { classNames } from '@/helpers/classNames'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
}

const baseStyles =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500'

  