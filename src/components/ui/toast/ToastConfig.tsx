import type { ReactNode } from 'react'

import {
  HiMiniCheckCircle,
  HiMiniExclamationCircle,
  HiMiniExclamationTriangle,
  HiMiniInformationCircle,
  HiMiniXMark,
} from 'react-icons/hi2'

import type { ToastItem } from './types'

export const typeStyles: Record<ToastItem['type'], { icon: ReactNode; accentClass: string }> = {
  success: {
    icon: <HiMiniCheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />,
    accentClass: 'border-green-200',
  },
  info: {
    icon: <HiMiniInformationCircle className="h-5 w-5 text-blue-500" aria-hidden="true" />,
    accentClass: 'border-blue-200',
  },
  warning: {
    icon: <HiMiniExclamationTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />,
    accentClass: 'border-amber-200',
  },
}
