import type { ReactNode } from 'react'

import './index.css'

interface HeaderProps {
  title?: string
  actions?: ReactNode
}

export default function Header({ title = 'Events Management System', actions }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__content">
        <div className="text-left">
          <span className="header__brand">EMS Admin</span>
          <p className="header__title">{title}</p>
        </div>
        {actions ? <div className="header__actions">{actions}</div> : null}
      </div>
    </header>
  )
}
