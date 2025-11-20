import type { ReactNode } from 'react'

import {
  HiMiniXMark,
} from 'react-icons/hi2'

import { classNames } from '@/utils'
import { typeStyles } from './ToastConfig'
import type { ToastItem } from './types'

interface ToastMessageProps {
  toast: ToastItem
  onDismiss: () => void
}

export function ToastMessage({ toast, onDismiss }: ToastMessageProps) {
  const typeConfig = typeStyles[toast.type]
  const statusRole = toast.type === 'error' || toast.type === 'warning' ? 'alert' : 'status'

  return (
    <div
      className={classNames(
        'pointer-events-auto flex w-full items-start gap-3 rounded-lg border bg-white p-4 shadow-lg ring-1 ring-black/5',
        typeConfig.accentClass,
      )}
      role={statusRole}
      aria-live={statusRole === 'alert' ? 'assertive' : 'polite'}
    >
      
    </div>
  )
}
