import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { HiCheckCircle, HiExclamationTriangle, HiInformationCircle, HiXCircle, HiXMark } from 'react-icons/hi2'
import type { IconType } from 'react-icons'

import './index.css'
import { classNames } from '@/utils/classNames'

type AlertBannerVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertBannerProps extends ComponentPropsWithoutRef<'div'> {
  title?: string
  description?: ReactNode
  variant?: AlertBannerVariant
  action?: ReactNode
  onClose?: () => void
}

const variantIconMap: Record<AlertBannerVariant, IconType> = {
  info: HiInformationCircle,
  success: HiCheckCircle,
  warning: HiExclamationTriangle,
  error: HiXCircle,
}
