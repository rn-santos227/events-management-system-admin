import { HiMiniXMark } from 'react-icons/hi2'
import { typeStyles } from './ToastConfig'
import type { ToastItem } from './types'
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
        'pointer-events-auto flex w-full items-start gap-3 rounded-lg border bg-white p-4 shadow-lg ring-1 ring-black/5',
        typeConfig.accentClass,
      )}
      role={statusRole}
      aria-live={statusRole === 'alert' ? 'assertive' : 'polite'}
    >
      <div className="flex-shrink-0">{typeConfig.icon}</div>
      <div className="flex-1">
        {toast.title ? <p className="text-sm font-semibold text-slate-900">{toast.title}</p> : null}
        <p className="text-sm text-slate-600">{toast.message}</p>
      </div>
      <button
        type="button"
        className="flex-shrink-0 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        <HiMiniXMark className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}
