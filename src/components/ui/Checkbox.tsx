import { createContext, forwardRef, useContext, useId } from 'react'
import type {
  FieldsetHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react'

import { classNames } from '@/helpers/classNames'

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


