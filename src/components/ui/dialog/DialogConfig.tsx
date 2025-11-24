import {
  HiMiniCheckCircle,
  HiMiniExclamationTriangle,
  HiMiniInformationCircle,
  HiMiniQuestionMarkCircle,
  HiMiniXCircle,
} from 'react-icons/hi2'

import type { DialogType, DialogVariantConfig } from './types'

export const variantConfig: Record<DialogType, DialogVariantConfig> = {
  success: {
    accent: 'dialog-icon--success',
    ring: 'dialog-icon-ring--success',
    confirm: 'dialog-button--confirm-success',
    cancel: 'dialog-button--cancel-success',
    icon: (
      <HiMiniCheckCircle className="size-10" aria-hidden="true" />
    ),
  },
  question: {
    accent: 'dialog-icon--question',
    ring: 'dialog-icon-ring--question',
    confirm: 'dialog-button--confirm-question',
    cancel: 'dialog-button--cancel-question',
    icon: (
      <HiMiniQuestionMarkCircle className="size-10" aria-hidden="true" />
    ),
  },
  warning: {
    accent: 'dialog-icon--warning',
    ring: 'dialog-icon-ring--warning',
    confirm: 'dialog-button--confirm-warning',
    cancel: 'dialog-button--cancel-warning',
    icon: (
      <HiMiniExclamationTriangle className="size-10" aria-hidden="true" />
    ),
  },
  information: {
    accent: 'dialog-icon--information',
    ring: 'dialog-icon-ring--information',
    confirm: 'dialog-button--confirm-information',
    cancel: 'dialog-button--cancel-information',
    icon: (
      <HiMiniInformationCircle className="size-10" aria-hidden="true" />
    ),
  },
  error: {
    accent: 'dialog-icon--error',
    ring: 'dialog-icon-ring--error',
    confirm: 'dialog-button--confirm-error',
    cancel: 'dialog-button--cancel-error',
    icon: (
      <HiMiniXCircle className="size-10" aria-hidden="true" />
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
