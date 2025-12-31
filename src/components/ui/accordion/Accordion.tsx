import { forwardRef, useId, useLayoutEffect, useRef, useState } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import './index.css'
import { classNames } from '@/utils/classNames'

export interface AccordionProps
  extends Omit<
    ComponentPropsWithoutRef<'div'>,
    'title' | 'onToggle'
  > {
  title: ReactNode
  description?: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  contentClassName?: string
}

