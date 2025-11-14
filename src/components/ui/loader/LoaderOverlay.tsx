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
