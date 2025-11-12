import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'

import { classNames } from '@/helpers/classNames'

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
}
