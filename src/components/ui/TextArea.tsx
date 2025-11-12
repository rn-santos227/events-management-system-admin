import { forwardRef, useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'

import { classNames } from '@/helpers/classNames'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
}

