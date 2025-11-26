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

export function AlertBanner({
  title,
  description,
  variant = 'info',
  action,
  onClose,
  className,
  children,
  ...props
}: AlertBannerProps) {
  const Icon = variantIconMap[variant]
  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status'

  return (
    <div
      className={classNames('alert-banner', `alert-banner--${variant}`, className)}
      role={role}
      {...props}
    >
      
    </div>
  )
}
