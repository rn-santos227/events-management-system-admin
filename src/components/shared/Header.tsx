import type { ReactNode } from 'react'

interface HeaderProps {
  title?: string
  actions?: ReactNode
}

export default function Header({ title = 'Events Management System', actions }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <span className="text-lg font-semibold text-brand-600">EMS Admin</span>
          <p className="text-sm text-slate-500">{title}</p>
        </div>
        {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
      </div>
    </header>
  )
}
