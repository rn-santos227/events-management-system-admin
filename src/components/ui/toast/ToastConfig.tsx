import type { ReactNode } from 'react'

import {
  HiMiniCheckCircle,
  HiMiniExclamationCircle,
  HiMiniExclamationTriangle,
  HiMiniInformationCircle,
} from 'react-icons/hi2'

import type { ToastItem } from './types'

export const typeStyles: Record<ToastItem['type'], { icon: ReactNode; accentClass: string }> = {
  success: {
    icon: (
      <HiMiniCheckCircle
        className="toast-message__icon toast-message__icon--success"
        aria-hidden="true"
      />
    ),
    accentClass: 'border-green-200',
  },
  info: {
    icon: (
      <HiMiniInformationCircle
        className="toast-message__icon toast-message__icon--info"
        aria-hidden="true"
      />
    ),
    accentClass: 'border-blue-200',
  },
  warning: {
    icon: (
      <HiMiniExclamationTriangle
        className="toast-message__icon toast-message__icon--warning"
        aria-hidden="true"
      />
    ),
    accentClass: 'border-amber-200',
  },
  error: {
    icon: (
      <HiMiniExclamationCircle
        className="toast-message__icon toast-message__icon--error"
        aria-hidden="true"
      />
    ),
    accentClass: 'border-red-200',
  },
}
