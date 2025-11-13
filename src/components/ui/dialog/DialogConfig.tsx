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
}