import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export type LoaderOverlayVariant = 'circular' | 'bar'

export interface LoaderOverlayProps {
  open: boolean
  message?: string
  variant?: LoaderOverlayVariant
  dismissible?: boolean
  onDismiss?: () => void
}

const circularIndicator = (
  <div
    className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
    aria-hidden="true"
  />
)

const barIndicator = (
  <div className="w-48" aria-hidden="true">
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-600" />
    </div>
  </div>
)


export function LoaderOverlay({
  open,
  message = 'Processing your request…',
  variant = 'circular',
  dismissible = false,
  onDismiss,
}: LoaderOverlayProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted || !open) {
    return null
  }

  const handleOverlayClick = () => {
    if (dismissible) {
      onDismiss?.()
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/70 px-4"
      role="alert"
      aria-live="assertive"
      aria-busy="true"
      onClick={handleOverlayClick}
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-white/90 px-6 py-6 text-center shadow-2xl">
        {variant === 'circular' ? circularIndicator : barIndicator}
        <p className="text-sm font-medium text-slate-700">{message}</p>
      </div>
    </div>,
    document.body,
  )
}
