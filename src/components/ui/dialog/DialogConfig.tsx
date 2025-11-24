import type { DialogType, DialogVariantConfig } from './types'

export const variantConfig: Record<DialogType, DialogVariantConfig> = {
  success: {
    accent: 'dialog-icon--success',
    ring: 'dialog-icon-ring--success',
    confirm: 'dialog-button--confirm-success',
    cancel: 'dialog-button--cancel-success',
    icon: (
      <svg viewBox="0 0 24 24" className="size-10" aria-hidden="true" fill="none">
        <path
          d="M9.5 12.75 11.25 14.5 15 9.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  question: {
    accent: 'dialog-icon--question',
    ring: 'dialog-icon-ring--question',
    confirm: 'dialog-button--confirm-question',
    cancel: 'dialog-button--cancel-question',
    icon: (
      <svg viewBox="0 0 24 24" className="size-10" aria-hidden="true" fill="none">
        <path
          d="M12 17.25v.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 14c0-1.649 2.25-1.5 2.25-4a2.25 2.25 0 10-4.5 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  warning: {
    accent: 'dialog-icon--warning',
    ring: 'dialog-icon-ring--warning',
    confirm: 'dialog-button--confirm-warning',
    cancel: 'dialog-button--cancel-warning',
    icon: (
      <svg viewBox="0 0 24 24" className="size-10" aria-hidden="true" fill="none">
        <path
          d="M12 8.25v4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16.5" r=".75" fill="currentColor" />
        <path
          d="M4.5 18h15L12 4.5 4.5 18z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  information: {
    accent: 'dialog-icon--information',
    ring: 'dialog-icon-ring--information',
    confirm: 'dialog-button--confirm-information',
    cancel: 'dialog-button--cancel-information',
    icon: (
      <svg viewBox="0 0 24 24" className="size-10" aria-hidden="true" fill="none">
        <path
          d="M12 11.5v5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="7.5" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  error: {
    accent: 'dialog-icon--error',
    ring: 'dialog-icon-ring--error',
    confirm: 'dialog-button--confirm-error',
    cancel: 'dialog-button--cancel-error',
    icon: (
      <svg viewBox="0 0 24 24" className="size-10" aria-hidden="true" fill="none">
        <path
          d="M14.828 9.172 9.172 14.828"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M9.172 9.172l5.656 5.656"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
}

export const defaultConfirmText: Record<DialogType, string> = {
  success: 'Okay',
  question: 'Yes',
  warning: 'Okay',
  information: 'Got it',
  error: 'Try again',
}

export const defaultCancelText: Record<DialogType, string> = {
  success: 'Cancel',
  question: 'No',
  warning: 'Dismiss',
  information: 'Close',
  error: 'Dismiss',
}

export const defaultShowCancelTypes: DialogType[] = ['question', 'warning', 'error']
export const defaultOutsideDismissTypes: DialogType[] = ['success', 'information']
