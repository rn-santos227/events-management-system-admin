import type { ToastItem } from './types'
import { ToastMessage } from './ToastMessage'

interface ToastRendererProps {
  toasts: ToastItem[]
  onDismiss: (id: number) => void
}

export function ToastRenderer({ toasts, onDismiss }: ToastRendererProps) {
  if (!toasts.length) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end px-4 py-6 sm:p-6">
      <div className="flex w-full flex-col items-end gap-3 sm:max-w-sm">
        {toasts.map((toast) => (
          <ToastMessage key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
        ))}
      </div>
    </div>
  )
}
