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

}
