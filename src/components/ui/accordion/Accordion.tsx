import { forwardRef, useId, useLayoutEffect, useRef, useState } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import './index.css'
import { classNames } from '@/utils/classNames'

export interface AccordionProps extends ComponentPropsWithoutRef<'div'> {
  title: ReactNode
  description?: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onToggle?: (nextOpen: boolean) => void
  contentClassName?: string
}



