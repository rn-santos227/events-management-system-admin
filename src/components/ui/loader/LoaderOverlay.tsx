import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './index.css'

export type LoaderOverlayVariant = 'circular' | 'bar'

export interface LoaderOverlayProps {
  open: boolean
  message?: string
  variant?: LoaderOverlayVariant
  dismissible?: boolean
  onDismiss?: () => void
}

const circularIndicator = (
  <div className="loader-overlay__circular" aria-hidden="true" />
)

const barIndicator = (
  <div className="loader-overlay__bar-wrapper" aria-hidden="true">
    <div className="loader-overlay__bar-track">
      <div className="loader-overlay__bar-indicator" />
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
      className="loader-overlay"
      role="alert"
      aria-live="assertive"
      aria-busy="true"
      onClick={handleOverlayClick}
    >
      <div className="loader-overlay__card">
        {variant === 'circular' ? circularIndicator : barIndicator}
        <p className="loader-overlay__message">{message}</p>
      </div>
    </div>,
    document.body,
  )
}
