export type DateInput = string | number | Date | null | undefined

const DEFAULT_EMPTY_FALLBACK = '—'

export const formatDateTime = (
  value: DateInput,
  options?: Intl.DateTimeFormatOptions,
  locale?: string,
  fallback: string = DEFAULT_EMPTY_FALLBACK,
): string => {
  if (value == null) return fallback

  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return typeof value === 'string' ? value : fallback

  return date.toLocaleString(locale, options)
}
