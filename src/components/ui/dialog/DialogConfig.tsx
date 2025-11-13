import type { DialogType, DialogVariantConfig } from './types'

export const variantConfig: Record<DialogType, DialogVariantConfig> = {
  success: {
    accent: 'text-emerald-600',
    ring: 'ring-emerald-200',
    confirm: 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500',
    cancel:
      'border border-emerald-200 text-emerald-700 hover:bg-emerald-50 focus-visible:ring-emerald-200',
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
    accent: 'text-sky-600',
    ring: 'ring-sky-200',
    confirm: 'bg-sky-600 text-white hover:bg-sky-700 focus-visible:ring-sky-500',
    cancel: 'border border-sky-200 text-sky-700 hover:bg-sky-50 focus-visible:ring-sky-200',
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
    accent: 'text-amber-600',
    ring: 'ring-amber-200',
    confirm: 'bg-amber-600 text-white hover:bg-amber-700 focus-visible:ring-amber-500',
    cancel:
      'border border-amber-200 text-amber-700 hover:bg-amber-50 focus-visible:ring-amber-200',
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
    accent: 'text-indigo-600',
    ring: 'ring-indigo-200',
    confirm: 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500',
    cancel:
      'border border-indigo-200 text-indigo-700 hover:bg-indigo-50 focus-visible:ring-indigo-200',
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
    accent: 'text-rose-600',
    ring: 'ring-rose-200',
    confirm: 'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500',
    cancel: 'border border-rose-200 text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-200',
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