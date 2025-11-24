import { HiMiniXMark } from 'react-icons/hi2'
import { typeStyles } from './ToastConfig'
import type { ToastItem } from './types'

import './index.css'
import { classNames } from '@/utils'

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
        'toast-message',
        typeConfig.accentClass,
      )}
      role={statusRole}
      aria-live={statusRole === 'alert' ? 'assertive' : 'polite'}
    >
      <div className="flex-shrink-0">{typeConfig.icon}</div>
      <div className="flex-1">
        {toast.title ? <p className="toast-message__title">{toast.title}</p> : null}
        <p className="toast-message__body">{toast.message}</p>
      </div>
      <button
        type="button"
        className="toast-message__close"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        <HiMiniXMark className="toast-message__icon" aria-hidden="true" />
      </button>
    </div>
  )
}
