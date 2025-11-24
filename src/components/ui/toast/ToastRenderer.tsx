import type { ToastItem } from './types'
import { ToastMessage } from './ToastMessage'

import './index.css'

interface ToastRendererProps {
  toasts: ToastItem[]
  onDismiss: (id: number) => void
}

export function ToastRenderer({ toasts, onDismiss }: ToastRendererProps) {
  if (!toasts.length) {
    return null
  }

  return (
    <div className="toast-layer">
      <div className="toast-stack">
        {toasts.map((toast) => (
          <ToastMessage key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
        ))}
      </div>
    </div>
  )
}
